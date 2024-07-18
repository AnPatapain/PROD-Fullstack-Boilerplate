# MERN-Typescript with Docker and Nginx

This project is a full-stack MERN-Typescript application boilerplate, using Docker for containerization and Nginx as a reverse proxy with TLS for secure communication. This setup allows for both local development and production deployment. By using this boilerplate, you can focus on your business concerns without worrying about the configuration.

Stacks: Typescript, Node, React, BashScript, Docker, Nginx
  
We use Docker to avoid the problem "But it works on my computer".  
  
Given that this is a monolithic project, with both frontend and backend code located in the same src folder, we have two processes running in development: one for the backend and one for the frontend. Nginx is used as a reverse proxy to handle these requests efficiently. In production, Nginx serves the frontend static files and forwards backend requests, providing a seamless integration of services.
## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
    - [Reset](#reset)
    - [Development](#development)
    - [Production](#production)
- [Configuration](#configuration)
- [TLS Setup](#tls-setup)  

## Overview  
#### Development  
![Docker Compose for Development](static/architecture-dev.png)

#### Production    
![Docker Compose for Production](static/architecture-prod.png)

## Project Structure
``` 
.  
├── scripts/                                    // Scripts for Docker and Nginx  
│   ├── nginx/  
│   │   ├── nginx-dev.template.conf             // Nginx configuration template for development  
│   │   ├── nginx-prod.template.conf            // Nginx configuration template for production  
│   └── tls-dev/                                // TLS certificates for development  
│   │   ├── certificate.crt  
│   │   └── private.key  
│   ├── docker-compose.local.yml                // Docker Compose configuration for local development  
│   ├── docker-compose.prod.yml                 // Docker Compose configuration for production  
│   ├── Dockerfile.server.prod                  // Dockerfile for production backend  
│   ├── run.sh                                  // Main control script  
│   └── tls-cert-key-creation.sh                // Script to create TLS certificates  
│  
├── src/                                        // Source code directory  
│   ├── api/                                    // Backend code (Node.js/Express)  
│   │   └── ...  
│   ├── frontend/                               // Frontend code (React)  
│   │   └── ...  
│   ├── shared/                                 // Shared code between backend and frontend  
│   │   ├── models/                             // Shared models between backend and frontend  
│   └── utils.ts                                // Shared utils between backend and frontend
│  
├── .dockerignore                               // Docker ignore file  
├── .eslintrc.cjs                               // ESLint configuration  
├── .gitignore                                  // Git ignore file  
├── index.html                                  // HTML entry point  
├── package-lock.json                           // NPM lock file  
├── package.json                                // NPM package configuration  
├── README.md                                   // Project documentation  
├── tsconfig.json                               // TypeScript configuration  
├── tsconfig.node.json                          // TypeScript node configuration  
├── tsconfig.server.dev.json                    // TypeScript server development configuration  
├── tsconfig.server.prod.json                   // TypeScript server production configuration  
└── vite.config.ts                              // Vite configuration for frontend  
```  

## Prerequisites  
- Linux  
- Docker  
- Docker can be run as non-root user  
Follows this article to allow to run Docker as non-root user https://docs.docker.com/engine/install/linux-postinstall/  


## Installation  
```
git clone <repository-url>  
cd project-root  
```  
You don't need to ```npm install``` the packages will be installed whenever you run ```./scripts/run.sh dev``` or ```./scripts/run.sh prod```. See [Usage](#usage) for details  


## Usage  
#### Reset  
To reset application environment.  
``` bash
./scripts/run.sh reset
```  
Best practice: Always run ```./scripts/run.sh reset``` before running ```./scripts/run.sh dev``` and ```./scripts/run.sh prod``` to avoid weird errors.  
#### Development  
To run application in development mode  
``` bash
./scripts/run.sh dev
```  
This will:  
- Build and start Docker container for backend, frontend (both in one container)
- Build and start Docker container for Nginx as Reverse Proxy to handle backend and frontend request.  
#### Production  
To run application in production mode  
``` bash
./scripts/run.sh prod
```  
This will:  
- Build frontend static files, transpile backend from typescript to javascript
- Build and start Docker container for backend
- Build and start Docker container for Nginx as Reverse Proxy to handle backend and frontend request. The frontend now is served as static file by nginx


## Configuration  
To change the name of docker containers, go to scripts/run.sh and changes the values of these variables:  
``` bash
#!/bin/bash

# Define the container name for dev local
export APP_DEV_CONTAINER="app-dev"
export NGINX_REVERSE_PROXY_DEV_CONTAINER="nginx-reverse-proxy-dev"

# Define the container name for production
export BACKEND_PROD_CONTAINER="backend-prod" 
export NGINX_REVERSE_PROXY_PROD_CONTAINER="nginx-reverse-proxy-prod" # The frontend is served as static files direcly on nginx container
...
```


## TLS Setup
Place your TLS certificates and private key to folder scripts/tls-dev or run ```./scripts/tls-cert-key-creation.sh``` to create them.  
```
./scripts/tls-cert-key-creation.sh
```
