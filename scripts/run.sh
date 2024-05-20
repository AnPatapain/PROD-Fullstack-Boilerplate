#!/bin/bash

# Define the container name for dev local
export APP_DEV_CONTAINER="app-dev"
export NGINX_REVERSE_PROXY_DEV_CONTAINER="nginx-reverse-proxy-dev"

# Define the container name for production
export BACKEND_PROD_CONTAINER="backend-prod" 
export NGINX_REVERSE_PROXY_PROD_CONTAINER="nginx-reverse-proxy-prod" # The frontend is served as static files direcly on nginx container

display_help() {
    echo "App script"
    echo ""
    echo "Available commands: ./run.sh [help] [reset] [test] [prod]"
    echo ""
    echo "Examples"
    echo "./run.sh dev              run app in dev local"
    echo "./run.sh prod             run as production"
    echo "./run.sh reset            remove node_modules, dist"
}

# Function to reset node_modules and dist
reset_node_modules() {
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
    sudo rm -rf node_modules dist
    sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
    sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
    echo "node_modules, dist, nginx config files removed successfully !"
}

# Function to run the application in production mode
run_prod() {
    envsubst '${BACKEND_PROD_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-prod.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
    npm run build # build the frontend and mount to docker that runs nginx so that nginx can serve static fe file. 
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" logs -f app-backend-prod -f nginx-reverse-proxy-prod
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" down -t 1
}

# Function to start Docker Compose in development mode
run_dev() {
    export DOCKER_APP_CMD="npm i && npm run dev"
    envsubst '${APP_DEV_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-dev.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
    mkdir -p node_modules
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" logs -f app-dev -f nginx-reverse-proxy-dev # Service name not container name
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
}


SCRIPT_DIR="$(dirname $0)"
cd "${SCRIPT_DIR}/.."

# Root project path. To be used in docker-compose.local.yml
export ROOT_PROJECT="$(pwd)"

# Ensure the permission inside docker container matches outside. To be used in docker-compose.local.yml
export DOCKER_UID="$UID"

cd "${ROOT_PROJECT}"

if [[ "$1" = "--help" ]]; then
    display_help
    exit 0

elif [[ "$1" = "reset" ]]; then
    reset_node_modules
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