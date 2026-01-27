# Quickstart: Docker Build Task

This guide explains how to use and verify the global `docker-build` task.

## Prerequisites

- **Docker Daemon**: Must be running locally.
- **Trivy**: Must be installed (`sudo apt-get install trivy` or equivalent).
- **Moon**: Installed in the repository.

## Usage

### Build All Images

To build and verify Docker images for all applications (go-server and sveltekit-appshell):

```bash
moon run :docker-build
```

### Build Single Application

To build only the Node.js frontend:

```bash
moon run sveltekit-appshell:docker-build
```

To build only the Go backend:

```bash
moon run go-server:docker-build
```

## Expected Behavior

1.  **Dependencies**: Moon runs `lint` and `test` tasks first.
2.  **Build**: Docker builds the image using the application's Dockerfile (Distroless runtime).
3.  **Tagging**: Images are tagged as `ghcr.io/[owner]/[app]:latest` and `...:sha-[hash]`.
4.  **Scan**: Trivy scans the `latest` tag.
5.  **Success**: Task completes only if no HIGH/CRITICAL vulnerabilities are found.
6.  **Failure**: Task fails if vulnerabilities are found or build errors occur.

## Troubleshooting

### Vulnerability Failure

If the build fails due to vulnerabilities:

1.  Read the Trivy report in the console output.
2.  Identify the package/dependency causing the issue.
3.  Update the dependency in `package.json` or `go.mod`.
4.  Re-run the task.

### Build Failure

If the Docker build fails:

1.  Check that the application builds locally (`moon run [app]:build`).
2.  Verify Dockerfile syntax.
