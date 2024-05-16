#!/bin/bash

display_help() {
    echo "App script"
    echo ""
    echo "Available commands: ./run.sh [help] [reset] [test] [prod]"
    echo ""
    echo "Examples"
    echo "./run.sh                  run app in dev local"
    echo "./run.sh prod      run as production"
    echo "./run.sh reset            remove node_modules, dist"
}

# Function to reset node_modules and dist
reset_node_modules() {
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
    sudo rm -rf node_modules dist
    echo "node_modules and dist have been removed successfully !"
}

# Function to run the application in production mode
run_prod() {
    npm run build # build the frontend and mount to docker that runs nginx so that nginx can serve static fe file. 
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" logs -f app-backend-prod -f nginx-reverse-proxy-prod
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" down -t 1
}

# Function to start Docker Compose in development mode
run_dev() {
    export DOCKER_APP_CMD="npm i && npm run dev"
    mkdir -p node_modules
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" logs -f app-dev -f nginx-reverse-proxy-dev
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