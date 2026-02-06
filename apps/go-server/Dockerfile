FROM golang:1.24-bookworm AS build
WORKDIR /workspace

# Copy modules (workspace dependencies)
COPY modules/ modules/

# Copy app config
COPY apps/go-server/go.mod apps/go-server/go.sum ./apps/go-server/

# Download dependencies
WORKDIR /workspace/apps/go-server
RUN go mod download

# Copy app source
COPY apps/go-server/ .

# Build
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /go/bin/server .

FROM gcr.io/distroless/static-debian12
COPY --from=build /go/bin/server /server

# Health check - checks /health endpoint every 30s
# Note: distroless doesn't have curl, so we use wget from busybox
# Alternative: use gcr.io/distroless/base-debian12 which includes wget
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/server", "health-check"] || exit 1

# Set entrypoint to the binary
ENTRYPOINT ["/server"]

# Set default subcommand and arguments
# To override this in docker-compose.yml, use:
#   command: api-server start
# To override this on the command line, append arguments to the docker run command:
#   docker run <image> api-server start
