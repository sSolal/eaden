#!/usr/bin/env bash
#
# EAden / WorkAdventure one-shot deploy bootstrap.
# Assembles ~/wa with a filled-in .env, the prod compose, and coturn — secrets generated
# and the shared TURN secret auto-matched across .env and coturn/turnserver.conf.
#
# Run it ON THE SERVER (as the non-root `eatown` user):
#
#   ./bootstrap.sh \
#       --domain play.example.com \
#       --email  you@example.com \
#       [--version v1.27.0] \
#       [--ip <public IPv4, autodetected if omitted>] \
#       [--dir ~/wa]
#
# It does NOT start anything. After it runs, review ~/wa/.env, then:
#   cd ~/wa && docker compose up -d
#   docker compose -f docker-compose.coturn.yaml up -d
#
set -euo pipefail

# Resolve this script's own directory FIRST, before any cd, so we can find the sibling files.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

VERSION="v1.27.0"          # CHECK https://github.com/workadventure/workadventure/releases and pin the latest stable
DIR="$HOME/wa"
DOMAIN="" ; EMAIL="" ; PUBLIC_IP=""
REPO_RAW="https://raw.githubusercontent.com/workadventure/workadventure"

while [ $# -gt 0 ]; do
  case "$1" in
    --domain)  DOMAIN="$2"; shift 2;;
    --email)   EMAIL="$2"; shift 2;;
    --version) VERSION="$2"; shift 2;;
    --ip)      PUBLIC_IP="$2"; shift 2;;
    --dir)     DIR="$2"; shift 2;;
    *) echo "Unknown arg: $1" >&2; exit 1;;
  esac
done

[ -n "$DOMAIN" ] || { echo "ERROR: --domain is required (e.g. play.example.com)"; exit 1; }
[ -n "$EMAIL" ]  || { echo "ERROR: --email is required (Let's Encrypt notices)"; exit 1; }
case "$DOMAIN" in https://*|http://*) echo "ERROR: --domain must NOT include http(s)://"; exit 1;; esac

# Base domain (strip the leftmost label, e.g. play.example.com -> example.com) for turn.<base>
DOMAIN_BASE="${DOMAIN#*.}"

if [ -z "$PUBLIC_IP" ]; then
  PUBLIC_IP="$(curl -4 -fsS https://ifconfig.me 2>/dev/null || curl -4 -fsS https://api.ipify.org 2>/dev/null || true)"
  if [ -z "$PUBLIC_IP" ]; then
    echo "ERROR: could not autodetect an IPv4 address. Pass it explicitly with --ip <your IPv4>." >&2
    echo "       If your server is IPv6-only, add a primary IPv4 in the Hetzner console first" >&2
    echo "       (Server -> Networking -> enable Primary IPv4), then set the DNS A-records." >&2
    exit 1
  fi
  echo "Autodetected public IPv4: $PUBLIC_IP"
fi

echo ">> Target dir: $DIR    domain: $DOMAIN    turn: turn.$DOMAIN_BASE    version: $VERSION"
mkdir -p "$DIR/coturn"
cd "$DIR"

# --- 1. fetch the two prod files (prefer local clone if this script sits inside it) -----------
LOCAL_COMPOSE="$SCRIPT_DIR/../contrib/docker/docker-compose.prod.yaml"
LOCAL_ENV="$SCRIPT_DIR/../contrib/docker/.env.prod.template"
if [ -f "$LOCAL_COMPOSE" ] && [ -f "$LOCAL_ENV" ]; then
  echo ">> Using prod files from local clone"
  cp "$LOCAL_COMPOSE" docker-compose.yaml
  cp "$LOCAL_ENV" .env
else
  echo ">> Downloading prod files for $VERSION from GitHub"
  curl -fsS "$REPO_RAW/$VERSION/contrib/docker/docker-compose.prod.yaml" -o docker-compose.yaml
  curl -fsS "$REPO_RAW/$VERSION/contrib/docker/.env.prod.template"        -o .env
fi
cp "$SCRIPT_DIR/docker-compose.coturn.yaml" docker-compose.coturn.yaml

# --- 2. secrets --------------------------------------------------------------------------------
SECRET_KEY="$(openssl rand -hex 32)"
TURN_SECRET="$(openssl rand -hex 32)"
MAP_PW="$(openssl rand -hex 24)"

# --- 3. write .env (set-or-append each key) ----------------------------------------------------
set_env() {  # set_env KEY VALUE
  local k="$1" v="$2"
  if grep -q "^${k}=" .env; then
    # use a non-/ delimiter; values here are alnum/dots/colons only
    sed -i "s|^${k}=.*|${k}=${v}|" .env
  else
    printf '%s=%s\n' "$k" "$v" >> .env
  fi
}
set_env SECRET_KEY                        "$SECRET_KEY"
set_env DOMAIN                            "$DOMAIN"
set_env ACME_EMAIL                        "$EMAIL"
set_env VERSION                           "$VERSION"
set_env MAP_STORAGE_AUTHENTICATION_USER   "admin"
set_env MAP_STORAGE_AUTHENTICATION_PASSWORD "$MAP_PW"
set_env MAX_PER_GROUP                     "30"
set_env MAX_USERS_FOR_WEBRTC              "4"
set_env TURN_SERVER                       "turn:turn.${DOMAIN_BASE}:3478"
set_env TURN_STATIC_AUTH_SECRET           "$TURN_SECRET"
set_env STUN_SERVER                       "stun:turn.${DOMAIN_BASE}:3478"
# LiveKit left blank on purpose — fill from Part C of EADEN_DEPLOY.md when ready.

# --- 4. coturn config (same TURN secret, real public IP) ---------------------------------------
sed -e "s|__TURN_STATIC_AUTH_SECRET__|${TURN_SECRET}|" \
    -e "s|__DOMAIN_BASE__|${DOMAIN_BASE}|" \
    -e "s|__SERVER_PUBLIC_IPV4__|${PUBLIC_IP}|" \
    "$SCRIPT_DIR/coturn/turnserver.conf.template" > coturn/turnserver.conf

# --- 5. done -----------------------------------------------------------------------------------
cat <<EOF

================================================================================
 Done. Files written to $DIR :
   docker-compose.yaml          (WorkAdventure prod stack, VERSION=$VERSION)
   docker-compose.coturn.yaml   (coturn)
   coturn/turnserver.conf       (TURN secret matched to .env, external-ip=$PUBLIC_IP)
   .env                         (secrets generated; LiveKit left blank)

 Map-storage login:  admin / $MAP_PW
 (also saved in .env as MAP_STORAGE_AUTHENTICATION_PASSWORD)

 NEXT:
   1) Confirm DNS: play -> $PUBLIC_IP  and  turn.$DOMAIN_BASE -> $PUBLIC_IP
   2) cd $DIR && docker compose up -d
      docker compose logs -f reverse-proxy      # watch the Let's Encrypt cert issue
   3) docker compose -f docker-compose.coturn.yaml up -d
   4) Visit https://$DOMAIN  and test A/V with two devices.
   5) For >4-person event bubbles, add LiveKit (Part C of EADEN_DEPLOY.md).

 Review $DIR/.env before going live.
================================================================================
EOF
