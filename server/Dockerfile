# --- Builder Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install native build tools for Argon2 compilation
RUN apk add --no-cache python3 make g++

COPY package*.json ./
# Install ALL dependencies (including dev) and compile native modules
RUN npm ci

COPY . .
RUN npm run build

# --- Production Runner Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy compiled native node_modules directly from builder to avoid re-compiling/network calls
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]