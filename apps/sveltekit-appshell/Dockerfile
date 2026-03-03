# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .moon/ .moon/

# Install pnpm
RUN npm install -g pnpm typescript
ENV CI=true

# Install dependencies (including workspace packages)
COPY modules/ modules/
COPY scripts/ scripts/
COPY apps/sveltekit-appshell/ apps/sveltekit-appshell/

RUN pnpm install --frozen-lockfile

# Build application
WORKDIR /app/apps/sveltekit-appshell
RUN pnpm run build

# Navigate to the build output and synthesize a package.json
WORKDIR /app/apps/sveltekit-appshell/build
RUN node -e "const fs = require('fs'); const pkg = require('../package.json'); fs.writeFileSync('package.json', JSON.stringify({ type: 'module', dependencies: pkg.dependencies }));"
RUN npm install --omit=dev --legacy-peer-deps --ignore-scripts

# Runtime Stage
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

# Copy the completely self-contained build folder
COPY --from=builder /app/apps/sveltekit-appshell/build /app

ENV NODE_ENV=production
# Expose port (default 3000)
EXPOSE 3000

CMD ["index.js"]
