# EAden — WorkAdventure self-host deploy runbook

Deploying our self-hosted WorkAdventure on a single Hetzner CAX box for ~20 people
(1–2 events/week + light coworking). Cheapest viable setup, scalable later.

**Prerequisites already done** (see chat / `STRUCTURE.md`):
- Domain bought, `play.<domain>` and `turn.<domain>` A-records point at the server IP.
- Hetzner CAX11 (Ubuntu 24.04), Docker + Docker Compose installed, firewall open on
  22 / 80 / 443 / 3478(tcp+udp) / 49160–49200(udp).
- You are logged in as the non-root `eatown` user.

> **Why a domain + TLS is non-negotiable:** browsers only allow camera/mic over HTTPS
> with a *valid* cert. You cannot run WorkAdventure on a bare IP. Traefik (bundled)
> fetches Let's Encrypt certs automatically once DNS resolves to the box.

---

## Architecture for our scale (one box)

```
                         play.<domain>  (HTTPS, Traefik → Let's Encrypt)
Browser ──────────────►  WorkAdventure stack  (7 light containers, ~2 GB RAM)
   │                     traefik · play · back · map-storage · redis · uploader · icon
   │
   ├──(P2P ≤4 people)──  direct browser-to-browser WebRTC
   │                     └─ coturn relays the ~15% behind strict NAT   turn.<domain>:3478
   │
   └──(bubble >4)──────  LiveKit SFU  ← needed for the 20-person events
```

Three media decisions, cheapest-first:

| Component | What it's for | Our choice to START | Self-hosted later |
|---|---|---|---|
| **coturn** | NAT traversal for the small P2P calls (coworking) | **Self-host on the box** (cheap, easy — below) | — |
| **LiveKit** | A/V when a bubble exceeds 4 people (events) | **LiveKit Cloud free tier** (zero server load, free for our volume) | Move on-box later (Part C) |
| Recording/egress | recording meetings | **skip** | optional |

Rationale: coworking is small groups → pure P2P + coturn, no LiveKit load. LiveKit only
matters during events; starting on their free tier keeps the 4 GB box breathing and is the
fastest path to "it works". Swap to on-box LiveKit anytime (Part C) for zero external deps.

---

## Part A — WorkAdventure core stack

### A1. Put the deploy files on the server
```bash
mkdir -p ~/wa && cd ~/wa
# Copy the two prod files out of the cloned repo (or scp them up, or curl from the
# release tag you pin in A3). Renamed as the README expects:
#   contrib/docker/docker-compose.prod.yaml  ->  ~/wa/docker-compose.yaml
#   contrib/docker/.env.prod.template        ->  ~/wa/.env
```

### A2. Generate secrets
```bash
# run each, paste results into .env (A3)
openssl rand -hex 32   # SECRET_KEY
openssl rand -hex 32   # TURN_STATIC_AUTH_SECRET   (reuse the SAME value in coturn, Part B)
openssl rand -hex 24   # MAP_STORAGE_AUTHENTICATION_PASSWORD
```

### A3. Edit `.env` — the values that actually matter
Everything else in the template can stay default. Set:

```ini
# --- identity / security ---
SECRET_KEY=<openssl #1>
DOMAIN=play.yourdomain.com          # NO https:// prefix
ACME_EMAIL=you@yourdomain.com       # Let's Encrypt renewal notices
VERSION=v1.27.0                     # PIN a real release tag — never leave "master"
TZ=Europe/Paris

# --- map-storage admin login (you'll use this to upload your map) ---
MAP_STORAGE_AUTHENTICATION_USER=admin
MAP_STORAGE_AUTHENTICATION_PASSWORD=<openssl #3>
# template already sets MAP_STORAGE_ENABLE_BASIC_AUTHENTICATION=true — good.

# --- bubbles: allow big event groups (requires LiveKit, configured in Part C/Cloud) ---
MAX_PER_GROUP=30                    # default 4; raise so >4 can share a bubble
MAX_USERS_FOR_WEBRTC=4              # switch P2P -> LiveKit SFU at the 5th person (keep 4)

# --- TURN / STUN (coturn from Part B) ---
TURN_SERVER=turn:turn.yourdomain.com:3478
TURN_STATIC_AUTH_SECRET=<openssl #2>
STUN_SERVER=stun:turn.yourdomain.com:3478

# --- LiveKit (fill from Part C; leave blank for a first P2P-only smoke test) ---
LIVEKIT_HOST=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
```

> **VERSION pinning:** check https://github.com/workadventure/workadventure/releases for the
> latest stable tag and use it. The `VERSION` in `.env` must match the version of
> `docker-compose.prod.yaml` you deployed. Don't leave `master` — it drifts and will break.

### A4. First boot (P2P only, proves TLS + the app work)
```bash
cd ~/wa
docker compose up -d
docker compose logs -f reverse-proxy   # watch for the Let's Encrypt cert being issued
```
- Visit `https://play.yourdomain.com` → you should walk around the default starter map.
- Cert trouble? Confirm DNS resolves (`dig play.yourdomain.com`) and port 80 is open
  (HTTP-01 challenge needs it). To avoid Let's Encrypt rate limits while debugging,
  uncomment the staging `caserver` line in the Traefik command block, test, then re-comment
  and `docker compose up -d --force-recreate`.
- Test A/V with two browsers/devices: two people near each other should see/hear each other.

---

## Part B — coturn (self-hosted, on the same box)

Handles the strict-NAT minority for small P2P calls. Standard, light, set-and-forget.

### B1. `~/wa/coturn/turnserver.conf`
```conf
listening-port=3478
fingerprint
use-auth-secret
static-auth-secret=<openssl #2 — SAME as TURN_STATIC_AUTH_SECRET in .env>
realm=turn.yourdomain.com
# tell coturn its public address (required on cloud VMs behind NAT mapping)
external-ip=<SERVER_PUBLIC_IPV4>
min-port=49160
max-port=49200
no-cli
no-tlsv1
no-tlsv1_1
# Optional hardening once it works:
# no-multicast-peers
# denied-peer-ip=10.0.0.0-10.255.255.255
```

### B2. `~/wa/docker-compose.coturn.yaml`
```yaml
services:
  coturn:
    image: coturn/coturn:4.6
    network_mode: host          # required so the UDP relay range works correctly
    restart: unless-stopped
    volumes:
      - ./coturn/turnserver.conf:/etc/coturn/turnserver.conf:ro
    command: ["-c", "/etc/coturn/turnserver.conf"]
```

### B3. Start it
```bash
cd ~/wa
docker compose -f docker-compose.coturn.yaml up -d
docker compose -f docker-compose.coturn.yaml logs -f
```
Verify with the Trickle ICE tester (https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/):
enter `turn:turn.yourdomain.com:3478`, and for credentials any username + you'll need a
temp credential — easiest is to just confirm in a real 2-person call from different networks
(e.g. one on mobile data) that A/V connects.

> The WorkAdventure containers already received `TURN_SERVER` / `TURN_STATIC_AUTH_SECRET`
> via `.env`, so no further wiring is needed — the browser gets time-limited TURN creds
> automatically.

---

## Part C — LiveKit (the SFU for >4-person event bubbles)

### Option C1 — LiveKit Cloud free tier (recommended to start)
1. Sign up at https://cloud.livekit.io, create a project.
2. Copy the **WS URL**, **API key**, **API secret** into `~/wa/.env`:
   ```ini
   LIVEKIT_HOST=wss://<your-project>.livekit.cloud
   LIVEKIT_API_KEY=<key>
   LIVEKIT_API_SECRET=<secret>
   ```
3. Apply: `cd ~/wa && docker compose up -d --force-recreate`
4. Test: get 5+ people into one bubble; the 5th joining flips the call to LiveKit (brief
   ~200ms video blip, audio continues).

> Check their current free-tier monthly bandwidth allowance on the LiveKit pricing page —
> for 1–2 events/week it's comfortably within free territory, but verify before a big event.
> This is the one external dependency in the "start" setup; Option C2 removes it.

### Option C2 — Self-host LiveKit on the box (zero external deps, do later)
Don't copy the repo's `docker-compose.livekit.yaml` verbatim — it's a *dev* file
(`*.workadventure.localhost` hostnames, bundled egress/rustfs recording). For production:
1. Add a `livekit.yourdomain.com` A-record → server IP.
2. Open firewall: TCP `7880` (or serve it via 443 subdomain through Traefik), TCP `7881`,
   and a UDP media range (e.g. `50000–60000`, or the single `udp_port` in the config).
3. Use LiveKit's official self-host generator (`livekit-generate`) or a minimal service with
   a real `keys:` secret (NOT the `devkey` in the repo's `livekit-config.yaml`), `redis`
   pointed at the stack's redis, and `use_external_ip: true`.
4. Set `.env` `LIVEKIT_HOST=wss://livekit.yourdomain.com`, `LIVEKIT_API_KEY` / `_SECRET` to
   your generated key pair, then `docker compose up -d --force-recreate`.
   (Full reference: https://docs.livekit.io/home/self-hosting/deployment/ — and the
   in-repo `docs/others/self-hosting/install.md`.)

---

## Part D — Your first real map
1. Build a map from the starter kit: https://github.com/workadventure/map-starter-kit
2. Upload to `https://play.yourdomain.com/map-storage/` (log in with the
   `MAP_STORAGE_AUTHENTICATION_USER` / `_PASSWORD` from `.env`).
3. Point `START_ROOM_URL` in `.env` at your map's `.wam`, then
   `docker compose up -d --force-recreate`.

---

## Part E — Operations

**Logs / status**
```bash
cd ~/wa
docker compose ps
docker compose logs -f play          # or back / map-storage / reverse-proxy
docker stats                          # watch RAM/CPU during a test event
```

**Upgrades** (pin a new tag)
```bash
# 1. download the new release's contrib/docker/docker-compose.prod.yaml -> docker-compose.yaml
# 2. read that release's upgrade notes (sometimes a new .env var)
# 3. set VERSION=<new tag> in .env
docker compose up -d --force-recreate
```

**Backups** — only two things hold state (Docker named volumes):
`redisdata` (scripting-API variables) and `map-storage-data` (your maps + the
Let's Encrypt cert dir under `${DATA_DIR}`). Snapshot the Hetzner volume, or:
```bash
docker run --rm -v wa_map-storage-data:/d -v $PWD:/b alpine \
  tar czf /b/map-storage-$(date +%F).tgz -C /d .
```
Cheapest belt-and-braces: enable Hetzner's automated server backups (+20% of server price).

**Scaling up for an event** (resize is a ~2-min reboot, no migration):
Hetzner console → server → Rescale → **"CPU & RAM only"** (reversible!) → CAX21
(4 vCPU / 8 GB). Drop back to CAX11 afterwards. *Never* tick the disk-grow option —
that's the one irreversible choice, and you don't need the extra disk.

---

---

## Part F — Migrating to a cheaper / different box

Use this if you started on an AMD box (CCX/CPX) to go live fast and later want to move to a
cheap CX22/CAX11 once Hetzner unlocks the shared plans — or to move provider entirely.
**This is NOT an in-place rescale** (Hetzner won't rescale across the shared↔dedicated or
x86↔Arm boundary), but with our Docker setup it's a clean ~20–30 min copy. Only two volumes
hold state; the TLS cert re-issues itself on the new box.

Expect a short downtime (a few minutes) during the data snapshot + DNS cutover. Fine for our
group — do it outside an event.

### F0. The day before
Lower DNS TTL on `play.<domain>` and `turn.<domain>` to **300s** so the cutover propagates fast.

### F1. Prepare the new box (don't touch DNS yet)
On the new server, do **Part 1** of the setup (create box, Docker, firewall:
22 / 80 / 443 / 3478 tcp+udp / 49160–49200 udp). Leave DNS pointing at the OLD box for now so
users stay served.

### F2. Snapshot data on the OLD box
```bash
cd ~/wa
docker compose stop                      # brief downtime, ensures a consistent snapshot
docker volume ls | grep -E 'map-storage-data|redisdata'   # confirm the exact names (usually wa_*)
docker run --rm -v wa_map-storage-data:/d -v "$PWD":/b alpine tar czf /b/maps.tgz  -C /d .
docker run --rm -v wa_redisdata:/d        -v "$PWD":/b alpine tar czf /b/redis.tgz -C /d .
```

### F3. Copy everything to the NEW box
Copy the config (keeps all your secrets identical — important, so sessions/JWTs stay valid)
plus the two data archives:
```bash
# from the OLD box (or via your laptop):
scp ~/wa/.env ~/wa/docker-compose.yaml ~/wa/docker-compose.coturn.yaml \
    ~/wa/maps.tgz ~/wa/redis.tgz \
    eatown@<NEW_IP>:~/
scp -r ~/wa/coturn eatown@<NEW_IP>:~/coturn
```

### F4. Reassemble on the NEW box
```bash
mkdir -p ~/wa && cd ~/wa
mv ~/.env ~/docker-compose.yaml ~/docker-compose.coturn.yaml ~/maps.tgz ~/redis.tgz .
mv ~/coturn ./coturn

# coturn must advertise the NEW public IP:
sed -i "s|^external-ip=.*|external-ip=<NEW_PUBLIC_IPV4>|" coturn/turnserver.conf

# recreate the named volumes and restore into them BEFORE first start:
docker volume create wa_map-storage-data
docker volume create wa_redisdata
docker run --rm -v wa_map-storage-data:/d -v "$PWD":/b alpine sh -c "cd /d && tar xzf /b/maps.tgz"
docker run --rm -v wa_redisdata:/d        -v "$PWD":/b alpine sh -c "cd /d && tar xzf /b/redis.tgz"
```
> If `docker volume ls` on the old box showed a prefix other than `wa_` (e.g. you used a
> different directory name), create the volumes with that same prefix here so Compose reuses them.

### F5. Cut over DNS, then start
1. Point `play.<domain>` **and** `turn.<domain>` A-records at `<NEW_IP>`.
2. Wait for propagation (`dig play.<domain>` shows the new IP — ~5 min with the lowered TTL).
3. Start the stack (Traefik fetches a fresh Let's Encrypt cert automatically):
   ```bash
   cd ~/wa
   docker compose up -d
   docker compose -f docker-compose.coturn.yaml up -d
   docker compose logs -f reverse-proxy     # confirm the new cert issues
   ```
4. Visit `https://play.<domain>`, walk around, test A/V with two devices.

### F6. Decommission
Once verified, delete the OLD Hetzner server so you stop paying for it. Bump the DNS TTL back
up (e.g. 3600s) when you're settled.

> Cert note: the new box re-issues via Let's Encrypt HTTP-01 — no need to copy the old certs.
> Let's Encrypt allows 5 identical certs/week, so don't repeat the cutover many times in a day.

---

---

## Part G — Public repo + CI/CD + versioning + status page

You're forking WorkAdventure heavily, so you **build your own images** (you can't use the
upstream `thecodingmachine/*` images once you've changed the code, and you must NOT build on
the 4–8 GB box). The build runs in GitHub Actions and pushes images to GHCR; the server only
pulls. For a **public** repo, Actions minutes and GHCR storage are **free**.

```
git push (main) ─► GitHub Actions: build play/back/map-storage  ─► ghcr.io/ssolal/eaden-*
                                                                       │
                          deploy job SSHes to box ───────────────────►│
                                                                       ▼
                              ~/eaden/deploy/deploy.sh: git pull · compose pull · up -d
                                                                       │
                                            writes /status page  ◄─────┘
```

License note (AGPL-3.0 + Commons Clause): forking/modifying is fine, **no reselling**, and you
must offer your source to users — the public repo + the source link on `/status` cover that.
Keep the per-component `LICENSE.txt` files; drop the "WorkAdventure" name/logo (rebrand to EAden).

### G1. Create the public repo and push (no `gh` CLI needed)
1. On github.com create a new **public** repo named `eaden` under your account `sSolal`
   (empty — no README/license, since the code already has them).
2. From the local clone on your laptop:
   ```bash
   cd ~/Projects/EAden
   git remote rename origin upstream         # keep WorkAdventure as 'upstream' for future merges
   git remote add origin git@github.com:sSolal/eaden.git
   git add -A && git commit -m "EAden: deploy pipeline, status page, CI"
   git push -u origin master                 # or: git branch -M main && git push -u origin main
   ```
   > The image namespace in the workflow + compose is hard-coded to `ghcr.io/ssolal/...`
   > (GHCR requires lowercase). If you use a different repo owner, search-replace `ssolal`.

### G2. First build + make the images public (one-time)
- The push triggers the **Build & Deploy EAden** workflow → watch it in the repo's **Actions**
  tab (this is your per-push build status). The deploy step will fail until G3/G4 are done —
  that's expected on the first run; the **build** half is what matters here.
- After the first successful build, GHCR creates 3 packages, **private by default**. Make each
  public so the server can pull without credentials:
  github.com/sSolal?tab=packages → `eaden-play` / `eaden-back` / `eaden-map-storage` →
  Package settings → Change visibility → **Public**.
  (Alternatively keep them private and `docker login ghcr.io` on the box with a read-only PAT.)

### G3. Create the deploy SSH key (lets Actions reach the box)
On your laptop:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/eaden_deploy -N '' -C 'github-actions-deploy'
ssh-copy-id -i ~/.ssh/eaden_deploy.pub eatown@play.pacts.world   # add pubkey to the box
```
In the GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
| Secret | Value |
|---|---|
| `DEPLOY_HOST` | `play.pacts.world` (or the server IP) |
| `DEPLOY_USER` | `eatown` |
| `DEPLOY_SSH_KEY` | contents of `~/.ssh/eaden_deploy` (the **private** key) |
| `DEPLOY_PORT` | `22` (optional) |

### G4. One-time server migration: `~/wa` → `~/eaden` (keeps your data)
Move from the hand-rolled `~/wa` to deploying from the git checkout. Your existing Docker
volumes are reused because `deploy.sh` pins `COMPOSE_PROJECT_NAME=wa`.
```bash
ssh eatown@play.pacts.world
cd ~
git clone https://github.com/sSolal/eaden.git        # public repo, no auth needed
# carry over the secrets that live ONLY on the box (never in git):
cp ~/wa/.env ~/eaden/.env
mkdir -p ~/eaden/deploy/coturn
cp ~/wa/coturn/turnserver.conf ~/eaden/deploy/coturn/turnserver.conf

cd ~/wa && docker compose down          # stop old stack; volumes are preserved
cd ~/eaden && ./deploy/deploy.sh       # pulls your images, starts stack + coturn + status
```
> The TLS cert re-issues once on the new path (Let's Encrypt allows 5/week — fine).
> Once verified, you can delete `~/wa`.

### G5. Done — the everyday loop
- Edit code locally → `git push` → watch **Actions** → ~a few min later it's live.
- **Version** auto-increments (no manual bumps): `build N · <sha>` where N = commit count.
- **Status page:** `https://play.pacts.world/status/` shows the live version, commit message,
  deploy time, and the WorkAdventure base version — no SSH needed.

### G6. Bumping the WorkAdventure base version
Your images are built from your fork, so "upgrading WorkAdventure" = merging upstream:
```bash
git fetch upstream && git merge upstream/master   # resolve conflicts in your modified files
# bump VERSION in .env on the SERVER too if upgrade notes require new env vars
git push                                          # CI rebuilds & redeploys
```

> **First build expectations:** building the `play` frontend is heavy (~several min, lots of
> RAM) — that's why it's in CI, not on the box. Subsequent builds are faster thanks to the
> `type=gha` layer cache. Currently building **linux/amd64 only** (your x86 box); add
> `linux/arm64` to the workflow's `platforms:` if you ever move to an ARM server.

---

## Gotchas checklist
- [ ] `DOMAIN` has **no** `https://` prefix.
- [ ] `VERSION` is a real release tag, not `master`.
- [ ] Same `TURN_STATIC_AUTH_SECRET` in `.env` **and** `coturn/turnserver.conf`.
- [ ] coturn `external-ip` = the server's real public IPv4.
- [ ] `MAX_PER_GROUP` raised above 4 **only** once LiveKit is configured (else >4 in a
      bubble with no SFU = broken A/V).
- [ ] Port 80 reachable for the Let's Encrypt HTTP-01 challenge.
- [ ] Don't reuse the repo's dev `livekit-config.yaml` `devkey` / `localhost` hostnames in prod.
- [ ] License: self-hosting for our group is fine; **no reselling** (AGPL-3.0 + Commons
      Clause), and the "WorkAdventure" name/logo aren't licensed — rebrand if public.
- [ ] CI: don't name the override `docker-compose.override.yaml` — upstream `.gitignore`
      ignores it (we use `deploy/docker-compose.eaden.yaml`).
- [ ] `.env` and `deploy/coturn/turnserver.conf` are gitignored — never commit secrets.
- [ ] GHCR packages set to **public** (or the box has a read-only pull token).
- [ ] `deploy.sh` keeps `COMPOSE_PROJECT_NAME=wa` so existing data volumes are reused.
```
