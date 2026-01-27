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
CMD ["/server", "api-server", "start"]
