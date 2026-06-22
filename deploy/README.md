# deploy/ — EAden self-host deploy kit

Files that turn our WorkAdventure fork into a push-to-deploy, self-updating install.
Full walkthrough: [`../EADEN_DEPLOY.md`](../EADEN_DEPLOY.md) (Parts A–G).

| File | What it is |
|---|---|
| `deploy.sh` | Runs **on the server**. Syncs the repo, pulls your ghcr images, `up -d`, regenerates the status page. Called by CI on every push (or by hand). |
| `docker-compose.eaden.yaml` | Override for the upstream prod compose: swaps play/back/map-storage to `ghcr.io/ssolal/eaden-*` + adds the `/status` page container. |
| `docker-compose.coturn.yaml` | coturn (TURN/NAT relay), host networking. |
| `coturn/turnserver.conf.template` | coturn config template (`__PLACEHOLDERS__`). The rendered `turnserver.conf` holds the TURN secret → **gitignored**, lives only on the box. |
| `status/www/index.html` | The public status page (auto-refreshes; reads `status.json`). |
| `bootstrap.sh` | Original fresh-install helper (generates secrets + renders `.env`/coturn). Superseded by the git-based flow for updates, but handy for a brand-new box. |

## CI/CD at a glance
```
git push ─► GitHub Actions (.github/workflows/eaden-deploy.yml)
            builds play/back/map-storage ─► ghcr.io/ssolal/eaden-*
            then SSHes to the box ─► ~/eaden/deploy/deploy.sh
```
- **Version** (auto, no manual bumps): `build N · <sha>`, N = `git rev-list --count HEAD`.
- **Status**: `https://play.pacts.world/status/` and the repo's **Actions** tab.
- **Secrets** stay on the box: `.env`, `deploy/coturn/turnserver.conf` (both gitignored).
  Deploy SSH key lives in GitHub Actions secrets (`DEPLOY_HOST/USER/SSH_KEY/PORT`).

See `EADEN_DEPLOY.md` Part G for repo creation, GHCR visibility, the SSH key, and the
one-time `~/wa → ~/eaden` server migration (which preserves your data volumes).
