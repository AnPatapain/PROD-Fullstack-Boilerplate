# Fullstack boilerplate - Production ready
![](./static/Heros-Vasnetsov.jpg)  
Bonjour 👋, to save time for you, stop reading here if you don't use Linux.
This repo is for Linux only because we use Docker, Bash script, which can not run natively on Windows.
## Who & Why
For who ?  
Got a brilliant project idea and can't wait to build the MVP ? Tired of spending weeks on the boring stuffs kind of project setup, configuration, 
user authentication, API docs, etc. ?  
This repo is your production-ready start point. It handles the mundane
so that you can focus on what really matters: your project's unique feature and
the business logic. So in short: **Want to turn out the idea into product quickly ? This repo is for you**.

Why to use ?  
This boilerplate all-in-one solution, single code base for both frontend 
and backend. No need to juggle multiple repos or deal with complex setups 
(Two codebases organize teams, not code). In short: **You dev, the boilerplate handle the rest**.

## What
This boilerplate leverages a workspace multi-package style to hold both backend and
frontend in the single code base (**Mono repo**). Using Docker, we ensure **it works on my machine and yours**. Nginx serves 
as a robust reverse proxy, managing frontend and backend requests 
seamlessly. In short:  
**All-in-one codebase. Streamlined setup. Focused development.**
## Table of Contents
- [Project structure & Tech stack](#project-structure--tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to run](#how-to-run)
- [Configuration](#configuration)
- [TLS setup](#tls-setup)
- [Architecture](#architecture-)
- [TODO](#todo)

## Project structure & Tech stack
![Packages](static/packages.png)
This boilerplate use **pnpm**, a package manager to set up a workspace 
multi-package which contains these packages:
- **Backend (packages/backend)**: Powered by Node.js and Express, written in TypeScript.
- **Frontend (packages/frontend)**: Built with React, Vite, and TypeScript.
- **Shared (packages/shared)**: Common utilities and types shared between frontend and backend.
- **Models (packages/models)**: Data models shared between Backend and Frontend.

In addition
- **Scripts (scripts/run.sh)**: Controls the execution of the application, 
managing development and production workflows.

## Prerequisites
- **Docker**: Must be installed and runnable as a non-root user.
  - [Install Docker on Linux](https://docs.docker.com/engine/install/ubuntu/)
  - [Run Docker as non-root user](https://docs.docker.com/engine/install/linux-postinstall/)

- **pnpm**:
  - [Install pnpm on Linux](https://pnpm.io/installation)
## Installation
```
git clone https://github.com/AnPatapain/production-fullstack-boilerplate.git  
cd production-fullstack-boilerplate
```

## How to run
From root project, `./scripts/run.sh` is the entry point 
command to run different environments: development, production, test, 
reset environment, etc.
#### Manual
To see all options of the command `./scripts/run.sh` run:
``` bash
./scripts/run.sh --help
```
#### Check prerequisite installed
To check whether your environment has the prerequisite to run the boilerplate. Run
``` bash
./scripts/run.sh prerequisite
```  
This will:
- Check whether Docker installed, if so, check whether Docker can be run as non-root user
- Check whether pnpm installed.
#### Development
In development mode: 
- Frontend is served by Vite server with hot module reload
- Typescript files will not be pre-transpiled to javascript but be transpiled
in run-time by ts-node
- [Not yet implemented] Mock data seed for development
- [Not yet implemented] Fake email smtp server

To run development mode
``` bash
./scripts/run.sh dev
```  
This will:
- Build and start Docker container for backend, frontend (both in one container)
- Build and start Docker container for Nginx as Reverse Proxy to handle backend and frontend request.
#### Production
In production mode:
- Frontend is built to single javascript file and served by Nginx
- Backend is transpiled from Typescript to Javascript to be run
- The mock data will not be seed

To run application in production mode
``` bash
./scripts/run.sh prod
```  
This will:
- Build frontend static files, transpile backend from typescript to javascript
- Build and start Docker container to run backend process
- Build and start Docker container for Nginx as Reverse Proxy to handle 
backend and frontend request. The frontend now is served as static file by Nginx inside this container
#### Reset
To reset application environment.
``` bash
./scripts/run.sh reset
```  
Best practice: Always run ```./scripts/run.sh reset``` before running ```./scripts/run.sh dev``` and ```./scripts/run.sh prod``` to avoid weird errors.

#### Install package
Best practice: Run `./scripts/run.sh reset` before running any commands
bellow


To install every dependencies listed in packages/*/package.json
``` bash
pnpm install
```  
To install dev-dependency for specific package
``` bash
pnpm --filter <backend | frontend | shared | models> add --save-dev <package>
```  

To install dependency for specific package
``` bash
pnpm --filter <backend | frontend | shared | models> add <package>
```  

## Configuration
To change the name of docker containers, go to scripts/run.sh and changes the values of these variables:
``` bash
#!/bin/bash

# Define the container name for dev local
export APP_DEV_CONTAINER="app-dev"
export NGINX_REVERSE_PROXY_DEV_CONTAINER="nginx-reverse-proxy-dev"

# Define the container name for production
export BACKEND_PROD_CONTAINER="backend-prod" 
export NGINX_REVERSE_PROXY_PROD_CONTAINER="nginx-reverse-proxy-prod"
...
```
## TLS Setup
Place your TLS certificates and private key to folder scripts/tls-dev or run ```./scripts/tls-cert-key-creation.sh``` to create them.
```
./scripts/tls-cert-key-creation.sh --help
```

## Architecture  
#### Development  
![Docker Compose for Development](static/architecture-dev.png)

#### Production    
![Docker Compose for Production](static/architecture-prod.png)

## TODO
- [ ] Section explaining diff from Dev, Prod, Test environment. How they are set up.
- [ ] Restrict import from some package  
- [ ] Script to check the prerequisite or install them maybe ?
- [ ] Synchronize router, controller, API docs
- [ ] User authentication, MFA
- [ ] End-to-End test, Security test, Performance test.

