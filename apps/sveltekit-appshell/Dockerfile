# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy workspace config
COPY package.json package-lock.json ./
COPY .moon/ .moon/

# Install dependencies (including workspace packages)
COPY packages/ packages/
COPY apps/sveltekit-appshell/ apps/sveltekit-appshell/

RUN npm install

# Build application
WORKDIR /app/apps/sveltekit-appshell
RUN npm run build
RUN npm prune --production

# Runtime Stage
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/apps/sveltekit-appshell/build build/
COPY --from=builder /app/apps/sveltekit-appshell/node_modules node_modules/
COPY --from=builder /app/apps/sveltekit-appshell/package.json .

ENV NODE_ENV=production
# Expose port (default 3000)
EXPOSE 3000

CMD ["build/index.js"]
