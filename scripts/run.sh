#!/bin/bash

if [[ "$1" =~ "help" ]]; then
    echo "App script"
    echo ""
    echo "Available commands: ./run.sh [help] [reset] [test]"
    echo ""
    echo "Examples"
    echo "./run.sh          run app in dev local"
    echo "./run.sh reset    remove node_modules"
    echo "./run.sh test     run test"
fi


SCRIPT_DIR="$(dirname $0)"
cd "${SCRIPT_DIR}/.."

# Root project path. To be used in docker-compose.local.yml
export ROOT_PROJECT="$(pwd)"
# The command to be run in Docker container
export DOCKER_APP_CMD="npm i && npm run dev"
# Ensure the permission inside docker container matches outside. To be used in docker-compose.local.yml
export DOCKER_UID="$UID"

cd "${ROOT_PROJECT}"

if [[ "$1" =~ "reset" ]]; then
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
    sudo rm -rf node_modules
    echo "Node_modules have been reset"
    exit 0
else
    if [[ "$1" =~ "test" ]]; then
        export DOCKER_APP_CMD="npm install && npm run dev"
    fi
    mkdir -p node_modules
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" up --remove-orphans -d
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" logs -f nontion-app-dev -f nginx-reverse-proxy-dev
    docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1
fi