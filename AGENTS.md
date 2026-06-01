# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository status

This repository is currently a **placeholder**. It contains only `README.md` and has no application source code, dependency manifests, tests, or service definitions.

When application code is added, update this file with service startup commands, environment variables, and non-obvious development caveats.

## Cursor Cloud specific instructions

### Services

| Service | Status | Notes |
|---------|--------|-------|
| *(none)* | N/A | No runnable application exists yet |

### Development commands

There are no lint, test, build, or dev-server scripts until a stack is chosen and manifests are added (for example `package.json`, `Makefile`, or `docker-compose.yml`).

### Environment

- **Git** is the only project tooling present today.
- No `.env.example`, Docker setup, or external service dependencies are configured.
- The VM update script is a no-op because there are no dependencies to refresh on startup.

### When code lands

After the first real application is committed, re-scan for:

- `README.md` run instructions
- `package.json` / `pyproject.toml` / `go.mod` scripts
- `docker-compose.yml` or `.devcontainer/`
- `.env.example` for required secrets

Then replace the no-op update script with the appropriate dependency refresh command (for example `npm install` or `uv sync`).
