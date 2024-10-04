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
export DATABASE_CONTAINER="postgres-db"

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
export DOCKER_GID="$GID"
cd "${ROOT_PROJECT}"

# Prevent running the script as root or with sudo
if [ "$EUID" -eq 0 ]; then
  echo "Error: Do not run this script as root or with sudo."
  echo "Please run the script as a normal user with the necessary permissions."
  exit 1
fi

display_help() {
  echo "Usage: ./run.sh [COMMAND]"
  echo ""
  echo "This script manages the environment for development, production, and testing of the application."
  echo "It provides options to set up the prerequisites, clean the project, and run in various modes."
  echo "IMPORTANT: Don't run it with 'sudo'"
  echo ""
  echo "Commands:"
  echo "  help                 Display this help message and exit"
  echo "  prerequisite         Check for required dependencies like Docker, pnpm and .env file"
  echo "  dev                  Run the application in the local development environment"
  echo "  prod                 Build and run the application in production mode with Nginx serving the frontend"
  echo "  reset                Remove build artifacts, node_modules, docker-volume and reset the environment for a clean setup"
  echo ""
  echo "Options:"
  echo "  -h, --help           Display this help message"
  echo ""
  echo "Examples:"
  echo "  ./run.sh dev         Start the app in development mode with hot-reloading enabled"
  echo "  ./run.sh prod        Build and deploy the app in production mode"
  echo "  ./run.sh reset       Remove all build artifacts and node_modules to reset the environment"
  echo ""
  echo "Notes:"
  echo "  - The 'prerequisite' command checks whether .env exist and has required variable, whether Docker and pnpm are installed and whether the user has Docker permissions."
  echo "  - In 'prod' mode, the frontend is built as static files and served by Nginx."
  echo "  - Ensure to run 'reset' before switching between development and production modes for a clean setup."
  echo ""
  echo "For more details, see the project documentation."
}


# Function that checks the must-have prerequisite for running boilerplate
check_prerequisite() {
  echo "Start check prerequisite needed for running application"
  echo ""
  # Check docker is installed and can be run as non-root user
  command -v docker >/dev/null 2>&1 || { echo >&2 "Docker is required. Please install"; exit 1; }
  if ! groups "$USER" | grep &>/dev/null '\bdocker\b'; then
    echo "User $USER is not in the docker group. Docker must be able to run as a non-root user."
    echo "Please run 'sudo usermod -aG docker $USER' and then log out and back in."
    exit 1
  fi

  # Check pnpm is installed
  command -v pnpm >/dev/null 2>&1  || { echo >&2 "pnpm is required. Please install"; exit 1; }

  # Check .env exist and has required environment variable
  if [[ ! -f "${ROOT_PROJECT}/.env" ]]; then
    echo ".env file is required in the root of the project."
    echo "Follow the steps below to create a .env file and set the required environment variables:"
    echo ""
    echo "1. Navigate to the root of your project:"
    echo "   cd ${ROOT_PROJECT}"
    echo ""
    echo "2. Create a new .env file:"
    echo "   touch .env"
    echo ""
    echo "3. Open the .env file in your preferred text editor and add the following lines:"
    echo "   POSTGRES_USER=<username>"
    echo "   POSTGRES_PASSWORD=<password>"
    echo "   POSTGRES_DB=<database>"
    echo "   DATABASE_URL=\"postgresql://<username>:<password>@postgres-db:5432/<database>?schema=public\""
    echo ""
    echo "   Note: postgres-db is the service name of postgres defined in docker-compose.local and docker-compose.prod"
    echo ""
    echo "4. Save the file and ensure it’s in the root of your project."
    echo ""
    echo "Once the .env file is created, re-run the script to continue."
    exit 1
  else
    # Load the .env file temporarily
      source "${ROOT_PROJECT}/.env"
      # Check if the required environment variables are defined
      if [[ -z "$POSTGRES_USER" || -z "$POSTGRES_PASSWORD" || -z "$POSTGRES_DB" || -z "$DATABASE_URL" ]]; then
          echo "The .env file is missing one or more required environment variables."
          echo "Make sure the following variables are set in the .env file:"
          echo "   POSTGRES_USER=<username>"
          echo "   POSTGRES_PASSWORD=<password>"
          echo "   POSTGRES_DB=<database>"
          echo "   DATABASE_URL=\"postgresql://<username>:<password>@postgres-db:5432/<database>?schema=public\""
          exit 1
      fi
  fi
  echo "Prerequisite test passed!"
}

# Function to reset node_modules and dist
reset_app() {
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1 --volumes
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" down -t 1 --volumes
  sudo rm -rf node_modules packages/*/node_modules packages/*/dist
  sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
  sudo rm -f "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
  sudo docker volume remove postgres_data
  echo "node_modules, dist, nginx config files, postgres_data volume removed successfully !"
}

# Function to synchronize the env file in ROOT_PROJECT and packages/backend
sync_env_files() {
  ln -sf "${ROOT_PROJECT}"/.env "${ROOT_PROJECT}"/packages/backend/.env
}

# Function to run the application in production mode
run_prod() {
  sync_env_files
  export DOCKER_PROD_ENTRY_CMD="pnpm i && pnpm run build:backend && pnpm run prod"
  envsubst '${BACKEND_PROD_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-prod.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-prod.conf"
  pnpm run build:frontend # build the frontend and mount to docker that runs nginx so that nginx can serve static fe file.
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" build --no-cache
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" up --remove-orphans -d
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" logs -f app-backend-prod -f nginx-reverse-proxy-prod
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.prod.yml" down -t 1 --volumes
}

# Function to start Docker Compose in development mode
run_dev() {
  sync_env_files
  export DOCKER_DEV_ENTRY_CMD="pnpm i && pnpm run dev"
  envsubst '${APP_DEV_CONTAINER}' < "${ROOT_PROJECT}/scripts/nginx/nginx-dev.template.conf" > "${ROOT_PROJECT}/scripts/nginx/nginx-dev.conf"
  mkdir -p node_modules
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" build --no-cache
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" up --remove-orphans -d
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" logs -f app-dev -f postgres-db -f nginx-reverse-proxy-dev # Service name not container name
  docker compose -f "${ROOT_PROJECT}/scripts/docker-compose.local.yml" down -t 1 --volumes
}

if [[ "$1" = "help" || "$1" = "--help" || "$1" = "-h" ]]; then
  display_help
  exit 0

elif [[ "$1" = "prerequisite" ]]; then
  check_prerequisite
  exit 0

elif [[ "$1" = "reset" ]]; then
  reset_app
  exit 0

elif [[ "$1" = "dev" ]]; then
  check_prerequisite
  # Check if check_prerequisite exited successfully (exit code 0)
  if [[ $? -eq 0 ]]; then
    run_dev
  else
    echo "Prerequisites not met. Exiting."
    exit 1
  fi
  exit 0

elif [[ "$1" = "prod" ]]; then
  reset_app
  check_prerequisite

  # Check if check_prerequisite exited successfully (exit code 0)
  if [[ $? -eq 0 ]]; then
    run_prod
  else
    echo "Prerequisites not met. Exiting."
    exit 1
  fi

  exit 0
    
else
    echo 'Use --help to see available options'
fi