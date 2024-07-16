# Build stage
FROM node:18.18-alpine as builder
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build:backend

# Production stage
FROM node:18.18-alpine
WORKDIR /app
COPY --from=builder /app/dist/api /app
COPY --from=builder /app/node_modules /app/node_modules
CMD ["node", "backend/src/server.js"]
