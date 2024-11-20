# Official Todo App
![Docker](https://img.shields.io/badge/docker-27.3.1-green)
![Nginx](https://img.shields.io/badge/nginx-alpine-green)
![Typescript](https://img.shields.io/badge/typescript-5.2.2-green.svg)
![Node 18](https://img.shields.io/badge/node-18_alpine-green)
![Express 4.x.x](https://img.shields.io/badge/express-4.19.2-green.svg)
![React 18](https://img.shields.io/badge/react-18.2.0-green.svg)
![Postgresql 14](https://img.shields.io/badge/postgresql-14_alpine-green.svg)
![Prisma 5.x.x](https://img.shields.io/badge/prisma-5.20.0-green.svg)
![Tsoa 6.x.x](https://img.shields.io/badge/tsoa-6.4.0-green.svg)
![Swagger 5.x.x](https://img.shields.io/badge/swagger_api_docs-5.0.1-green.svg)

This project is a production-ready fullstack Todo web application setup. We use `pnpm workspace` to
set up mono repo.


**Tech-stack overview**
- **Infrastructure:** Nginx, Docker, TLS-SSL for local development environment
- **Architecture:** Layered architecture for backend
- **Programming paradigms:** OOP for backend, Functional Programming for frontend using React
- **Automation Test (TODO: nyi):** Unit Test, End-to-End test (E2E), Performance Test
- **Programming Language:** Typescript, Bash Script
- **Backend:** Express (server framework), Tsoa-Swagger(controller & auto API docs), Postgresql (relational database), Prisma (ORM) 
- **Frontend:** React
## Table of Contents
- [Project structure](#project-structure)
- [How to run](#how-to-run)
- [Architecture](#architecture-)
- [TODO](#todo)


## Project structure
This boilerplate use **pnpm**, a package manager to set up a workspace 
multi-package.
- **packages/**  
  Sub-packages for different project aspects (backend, frontend, etc.).

- **infrastructure/**  
  Contain entrypoint for running application and the files for infrastructure set up: Container (Docker), 
Reverse Proxy (Nginx), local TLS-SSL certificates.

- **static/**  
  Images for Docs.

- **.dockerignore**  
  Specifies files ignored by Docker; handles HTTPS via Nginx.

- **.gitignore**  
  Lists files not tracked by Git.

- **README.md**  
  Project overview, setup instructions, and docs.

- **package.json**  
  Defines global project dependencies and scripts (using `pnpm`). Each package inside
the folder `packages/` has also its own package.json

- **pnpm-lock.yaml**  
  Lock file ensuring consistent dependency versions.

- **pnpm-workspace.yaml**  
  Workspace settings for managing monorepo with `pnpm`.
In addition

## How to run
From root project, `./infrastructure/run.sh` is the entry point 
command to run different environments: development, production, test, 
reset environment, etc.
#### Manual
To see all options of the command `./infrastructure/run.sh` run:
``` bash
./infrastructure/run.sh --help
```
#### Check prerequisite installed
To list all prerequisite. Run:
``` bash
./infrastructure/run.sh list-prerequisite
```
To check prerequisite on your environment. Run:
``` bash
./infrastructure/run.sh prerequisite
```
#### Development
In development mode: 
- Frontend is served by Vite server with hot module reload
- Typescript files will not be pre-transpiled to javascript but be transpiled
in run-time by ts-node
- Mock data seed for development
- Fake email smtp server

To run development mode
``` bash
./infrastructure/run.sh dev
```
#### Production
In production mode:
- Frontend is built to single javascript file and served by Nginx
- Backend is transpiled from Typescript to Javascript to be run
- The mock data will not be seed

To run application in production mode
``` bash
./infrastructure/run.sh prod
```
#### Clean
To clean application environment.
``` bash
./infrastructure/run.sh clean
```
Best practice: Always run ```./infrastructure/run.sh clean``` before running 
```./infrastructure/run.sh dev``` and ```./infrastructure/run.sh prod```

#### Install package
Best practice: Run `./infrastructure/run.sh clean` before running any below commands


To install every dependencies listed in packages/*/package.json
``` bash
pnpm install
```  
To install dev-dependency for specific package
``` bash
pnpm --filter <backend | frontend | shared-utils | shared-models> add --save-dev <package>
```  

To install dependency for specific package
``` bash
pnpm --filter <backend | frontend | shared-utils | shared-models> add <package>
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

