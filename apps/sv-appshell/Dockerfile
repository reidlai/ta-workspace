# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy workspace config
COPY package.json package-lock.json ./
COPY .moon/ .moon/

# Install dependencies (including workspace packages)
COPY packages/ packages/
COPY apps/sv-appshell/ apps/sv-appshell/

RUN npm install

# Build application
WORKDIR /app/apps/sv-appshell
RUN npm run build
RUN npm prune --production

# Runtime Stage
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/apps/sv-appshell/build build/
COPY --from=builder /app/apps/sv-appshell/node_modules node_modules/
COPY --from=builder /app/apps/sv-appshell/package.json .

ENV NODE_ENV=production
# Expose port (default 3000)
EXPOSE 3000

CMD ["build/index.js"]
