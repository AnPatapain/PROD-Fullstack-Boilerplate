# Dockerfile
# This Dockerfile for building backend running on production.
# To be used in scripts/docker-compose.prod.yml
# Author: Ke An Nguyen

FROM node:18.18-alpine as builder
WORKDIR /app

# Copy project metata data to container
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY packages/backend/package.json packages/backend/package.json
COPY packages/models/package.json packages/models/package.json
COPY packages/shared/package.json packages/shared/package.json

# Install pnpm using npm
RUN npm install -g pnpm
# Install packages used by backend, models, shared using pnpm. Command fails if the existing package versions in lockfile is not matched with the ones list in package.json
RUN pnpm install --frozen-lockfile
# Copy project to container
COPY . .
# Build the backend only (frontend is built in run_prod function in scripts/run.sh and will be served by nginx directly)
RUN pnpm run build:backend

# Entry point to run backend
CMD ["/bin/sh", "-c", "cd /app && pnpm run prod"]
