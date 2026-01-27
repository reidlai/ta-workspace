#!/bin/bash
# Shared script for Moon Global Docker Build Task
# Usage: ./scripts/docker-build-verify.sh <app-name> <dockerfile-path>

set -e

APP_NAME=$1
DOCKERFILE_PATH=$2
CONTEXT_PATH=${3:-.}

if [ -z "$APP_NAME" ] || [ -z "$DOCKERFILE_PATH" ]; then
  echo "Usage: $0 <app-name> <dockerfile-path> [context-path]"
  exit 1
fi

echo "=== Docker Build & Verify: $APP_NAME ==="

# 1. Determine Image Name
# Try to get owner from git remote origin or default to 'reidlai'
# Handles both ssh (git@github.com:owner/repo.git) and https (https://github.com/owner/repo.git)
OWNER=$(git config --get remote.origin.url | sed -E 's/.*github.com[:\/]([^\/]+).*/\1/' || echo "reidlai")
if [ -z "$OWNER" ]; then OWNER="reidlai"; fi
# Clean up potential .git suffix if regex failed strangely or other URLs
OWNER=$(echo "$OWNER" | sed 's/\.git$//')

IMAGE_NAME="ghcr.io/$OWNER/$APP_NAME"
GIT_SHA=$(git rev-parse --short HEAD)

echo "Owner: $OWNER"
echo "Image: $IMAGE_NAME"
echo "SHA:   $GIT_SHA"

# 2. Build Docker Image
echo "--- Building Image ---"
# Check if Dockerfile exists
if [ ! -f "$DOCKERFILE_PATH" ]; then
    echo "Error: Dockerfile not found at $DOCKERFILE_PATH"
    exit 1
fi

docker build -f "$DOCKERFILE_PATH" \
  -t "$IMAGE_NAME:latest" \
  -t "$IMAGE_NAME:sha-$GIT_SHA" \
  "$CONTEXT_PATH"

# 3. Scan with Trivy
echo "--- Scanning with Trivy ---"
# Fail on HIGH or CRITICAL vulnerabilities
trivy image \
  --exit-code 1 \
  --severity HIGH,CRITICAL \
  --no-progress \
  --scanners vuln \
  "$IMAGE_NAME:latest"

echo "SUCCESS: Image built and verified."
echo "Tags:"
echo "  - $IMAGE_NAME:latest"
echo "  - $IMAGE_NAME:sha-$GIT_SHA"
