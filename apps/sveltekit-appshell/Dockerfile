# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .moon/ .moon/

# Install pnpm
RUN npm install -g pnpm
ENV CI=true

# Install dependencies (including workspace packages)
COPY modules/ modules/
COPY scripts/ scripts/
COPY apps/sveltekit-appshell/ apps/sveltekit-appshell/

RUN pnpm install --frozen-lockfile

# Build application
WORKDIR /app/apps/sveltekit-appshell
RUN pnpm run build
RUN pnpm prune --prod

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
