#!/usr/bin/env bash
#
# EAden deploy script — runs ON THE SERVER, from inside the repo checkout (~/eaden).
# Invoked either by the GitHub Actions deploy job (push-to-deploy) or by hand.
#
#   ./deploy/deploy.sh [<git-sha>]
#
# With a SHA (passed by CI) it deploys exactly that commit + its matching images.
# Without one it deploys the current origin/main HEAD.
#
# Requires (already on the box, NOT in git): .env  and  deploy/coturn/turnserver.conf
#
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

TARGET="${1:-}"

# --- sync the repo to the target commit -------------------------------------------------------
git fetch --quiet origin
git reset --hard --quiet "${TARGET:-origin/main}"

# Reuse the EXISTING docker volumes (project name must stay "wa" — that's what created
# wa_redisdata / wa_map-storage-data on the first install). Do NOT change this.
export COMPOSE_PROJECT_NAME=wa
export EADEN_VERSION="$(git rev-parse HEAD)"

BASE="contrib/docker/docker-compose.prod.yaml"
OVERRIDE="deploy/docker-compose.eaden.yaml"
COMPOSE=(docker compose -f "$BASE" -f "$OVERRIDE" --project-directory "$REPO_DIR" --env-file .env)

echo ">> Pulling images for ${EADEN_VERSION:0:12} …"
"${COMPOSE[@]}" pull

echo ">> Bringing up the stack …"
"${COMPOSE[@]}" up -d --remove-orphans

# coturn (host networking, separate compose; idempotent — no-op if unchanged)
docker compose -f deploy/docker-compose.coturn.yaml --project-directory "$REPO_DIR" up -d

# --- regenerate the public /status page -------------------------------------------------------
NUM="$(git rev-list --count HEAD)"
SHORT="$(git rev-parse --short HEAD)"
MSG="$(git log -1 --pretty=%s | tr -d '"\\' | cut -c1-200)"
WA="$(grep -E '^VERSION=' .env | head -1 | cut -d= -f2)"
NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

mkdir -p deploy/status/www
cat > deploy/status/www/status.json <<JSON
{
  "service": "EAden",
  "version": "build ${NUM}",
  "commit": "${SHORT}",
  "commit_message": "${MSG}",
  "deployed_at": "${NOW}",
  "wa_base_version": "${WA}",
  "source": "https://github.com/sSolal/eaden"
}
JSON

echo ">> Deployed build ${NUM} (${SHORT}) at ${NOW}."
