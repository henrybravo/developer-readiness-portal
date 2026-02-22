# Nefira - Developer Readiness Portal

[![Playwright Tests](https://github.com/henrybravo/developer-readiness-portal/actions/workflows/playwright.yml/badge.svg)](https://github.com/henrybravo/developer-readiness-portal/actions/workflows/playwright.yml)
[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vite.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-2EAD33?logo=playwright)](https://playwright.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)

```
███╗   ██╗███████╗███████╗██╗██████╗  █████╗
████╗  ██║██╔════╝██╔════╝██║██╔══██╗██╔══██╗
██╔██╗ ██║█████╗  █████╗  ██║██████╔╝███████║
██║╚██╗██║██╔══╝  ██╔══╝  ██║██╔══██╗██╔══██║
██║ ╚████║███████╗██║     ██║██║  ██║██║  ██║
╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

Developer Readiness in Clear Skies
```

A lightweight internal-facing web portal that helps software development teams assess, track, and improve their engineering readiness through simple dashboards, checklists, and automated insights.

## Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/) installed

### Start the Application

```bash
# Clone the repository
git clone <repository-url>
cd developer-readiness-portal

# Start all services
docker compose up -d

# Wait for containers to be healthy (~60 seconds)
# Application will be available at:
# - Frontend: http://localhost:4173/
# - Backend API: http://localhost:5000/swagger
# - (Optional) Redis: localhost:6379
```

## Features

- **Teams Overview Dashboard** - View all development teams and their readiness status
- **Readiness Checklists** - Track progress across six dimensions
- **Version Upgrade Planner** - Framework upgrade guidance
- **Automated Test Runner** - Execute Playwright UI tests
- **Demo-Ready Seed Data** - Pre-populated sample teams

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    docker-compose                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Frontend   │  │   Backend    │  │     Data     │   │
│  │    React     │→ │  .NET API    │→ │ JSON / Redis │   │
│  │  Port: 4173  │  │  Port: 5000  │  │  Port: 6379  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Technology Stack**: React 19 + .NET 9 + Docker

See [docs/technical-stack.md](docs/technical-stack.md) for details.

## 📖 Documentation

- [Product Requirements](specs/prd.md)
- [Technical Standards](docs/technical-stack.md)
- [Architecture Decisions](specs/adr/)
- [Implementation Plan](specs/IMPLEMENTATION_PLAN.md)

**Nefira** — *Clarity emerging from uncertainty* ☁️
