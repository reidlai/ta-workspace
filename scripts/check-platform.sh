#!/bin/bash
# Platform check script - ensures project runs on native Unix/WSL filesystem
# This project does NOT support Windows or Windows-mounted paths (/mnt/c/...)

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

check_platform() {
    # Check if running on Windows (Git Bash, MSYS, etc.)
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        echo -e "${RED}ERROR: This project does not support Windows.${NC}"
        echo -e "${YELLOW}Please use WSL (Windows Subsystem for Linux) with a native Linux filesystem.${NC}"
        exit 1
    fi

    # Check if running from Windows-mounted path in WSL
    if [[ "$PROJECT_ROOT" == /mnt/[a-zA-Z]/* ]]; then
        echo -e "${RED}ERROR: Project is located on a Windows-mounted path: $PROJECT_ROOT${NC}"
        echo ""
        echo -e "${YELLOW}This causes path resolution issues with moonrepo and other tools.${NC}"
        echo ""
        echo -e "Please clone this repository to a native WSL filesystem path:"
        echo -e "  ${GREEN}cd ~${NC}"
        echo -e "  ${GREEN}git clone <repo-url> ta-workspace${NC}"
        echo -e "  ${GREEN}cd ~/ta-workspace${NC}"
        echo ""
        echo -e "Or move the existing project:"
        echo -e "  ${GREEN}cp -r $PROJECT_ROOT ~/ta-workspace${NC}"
        echo -e "  ${GREEN}cd ~/ta-workspace${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ Platform check passed - running on Unix/native WSL filesystem${NC}"
}

check_platform
