#!/bin/bash
############################################################################
# run.sh
# Entry point for running development, production, test environment
# Workflows:
# - ./scripts/run.sh dev: Running app in development
# - ./scripts/run.sh prod: Go to your VPS server, run this command to run as prod environment
# - ./scripts/run.sh reset: Remove the node_modules and the built files (for prod).
#
# Author: Ke An Nguyen
##############################################

# Define the container name for dev local
export APP_DEV_CONTAINER="app-dev"
export NGINX_REVERSE_PROXY_DEV_CONTAINER="nginx-reverse-proxy-dev"

# Define the container name for production
export BACKEND_PROD_CONTAINER="backend-prod" 
export NGINX_REVERSE_PROXY_PROD_CONTAINER="nginx-reverse-proxy-prod" # The frontend is served as static files direcly on nginx container

# Dir containing this script
SCRIPT_DIR="$(dirname $0)"
cd "${SCRIPT_DIR}/.."
# Root project path. To be used in docker-compose.local.yml
export ROOT_PROJECT="$(pwd)"
# To ensure the permission inside docker container matches outside. To be used in docker-compose.local.yml
export DOCKER_UID="$UID"
cd "${ROOT_PROJECT}"

display_help() {
    echo "Entry point command to run: development, production, test and reset your environment."
    echo "Reset means removing node_modules, build files"
    echo "Available commands: ./run.sh [help] [prerequisite] [reset] [test] [prod]"
    echo "./run.sh prerequisite   check prerequisite"
    echo "./run.sh dev            run app in development local environment"
    echo "./run.sh prod           run app as production, frontend will be built into static file and served by Nginx"
    echo "./run.sh reset          remove node_modules, build files (dist), nginx config files. These stuffs will be reinstalled if you run dev or prod"
}

# Function that checks the must-have prerequisite for running boilerplate
check_prerequisite() {
  command -v docker >/dev/null 2>&1 || { echo >&2 "Docker is required. Please install"; exit 1; }
  command -v pnpm >/dev/null 2>&1  || { echo >&2 "pnpm is required. Please install"; exit 1; }
  if ! groups "$USER" | grep &>/dev/null '\bdocker\b'; then
    echo "User $USER is not in the docker group. Docker must be able to run as a non-root user."
    echo "Please run 'sudo usermod -aG docker $USER' and then log out and back in."
    exit 1
  fi
  echo "Everything installed, let's goo!"
}

# Function to reset node_modules and dist
reset_app() {
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
    sudo rm -rf node_modules packages/*/node_modules packages/*/dist
    sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
    sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
    echo "node_modules, dist, nginx config files removed successfully !"
}

# Function to run the application in production mode
run_prod() {
    envsubst '${BACKEND_PROD_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-prod.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
    npm run build # build the frontend and mount to docker that runs nginx so that nginx can serve static fe file.
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" build --no-cache
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" logs -f app-backend-prod -f nginx-reverse-proxy-prod
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" down -t 1
}

# Function to start Docker Compose in development mode
run_dev() {
    export DOCKER_APP_CMD="pnpm i && pnpm run dev"
    envsubst '${APP_DEV_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-dev.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
    mkdir -p node_modules
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" build --no-cache
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" logs -f app-dev -f nginx-reverse-proxy-dev # Service name not container name
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
}

if [[ "$1" = "--help" ]]; then
    display_help
    exit 0

elif [[ "$1" = "prerequisite" ]]; then
    check_prerequisite
    exit 0

elif [[ "$1" = "reset" ]]; then
    reset_app
    exit 0

elif [[ "$1" = "dev" ]]; then
    run_dev
    exit 0

elif [[ "$1" = "prod" ]]; then
    run_prod
    exit 0
    
else
    echo 'Use --help to see available options'
fi