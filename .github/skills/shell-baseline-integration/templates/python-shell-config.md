# Python Shell Configuration Guide

Configuration guide for EmeaAppGbb Python shell baselines.

---

## Quick Start

### 1. Clone and Initialize

```bash
# Clone the shell
git clone https://github.com/EmeaAppGbb/agentic-shell-python.git my-project
cd my-project

# Reset git history
rm -rf .git
git init
git add .
git commit -m "Initial commit from agentic-shell-python"
```

### 2. Set Up Environment

```bash
# Install Poetry if not available
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Activate virtual environment
poetry shell
```

### 3. Update Project Name

Update `pyproject.toml`:
```toml
[tool.poetry]
name = "my-project"
version = "0.1.0"
description = "Your project description"
authors = ["Your Name <your@email.com>"]
```

## Environment Variables

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint | https://xxx.openai.azure.com/ |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI key | abc123... |
| `AZURE_OPENAI_DEPLOYMENT` | Model deployment name | gpt-4 |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | sqlite:///./app.db |
| `LOG_LEVEL` | Logging level | INFO |
| `CORS_ORIGINS` | Allowed origins | * |

### Create .env File

```bash
# .env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4
DATABASE_URL=postgresql://user:pass@localhost/dbname
LOG_LEVEL=DEBUG
```

## Database Configuration

### Local Development (PostgreSQL)

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myproject
    ports:
      - "5432:5432"
```

### SQLite (Simple Development)

```python
# No configuration needed, uses local file
DATABASE_URL=sqlite:///./app.db
```

### Azure PostgreSQL

```bash
DATABASE_URL=postgresql://user@server:password@server.postgres.database.azure.com/dbname?sslmode=require
```

## AI/Agent Configuration

### Azure OpenAI

```python
# config.py
from langchain_openai import AzureChatOpenAI

llm = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    deployment_name=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    api_version="2024-02-01"
)
```

### LangChain Agent Setup

```python
# agents/base_agent.py
from langchain.agents import AgentExecutor, create_openai_functions_agent

agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

## FastAPI Configuration

### Main Application

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="My Project API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Router Configuration

```python
# api/routes.py
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")

@router.get("/health")
async def health_check():
    return {"status": "healthy"}
```

## Docker Configuration

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN pip install poetry && poetry install --no-dev

COPY . .

EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres/db
    depends_on:
      - postgres
```

## Testing

```bash
# Run all tests
poetry run pytest

# With coverage
poetry run pytest --cov=src --cov-report=html

# Specific test
poetry run pytest tests/test_agents.py -v
```

## CI/CD Configuration

### GitHub Actions

```yaml
name: Python CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install poetry
      - run: poetry install
      - run: poetry run pytest
```

## Running the Application

### Development

```bash
# Start with hot reload
poetry run uvicorn main:app --reload

# Or with Docker
docker-compose up -d
```

### Production

```bash
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Next Steps

1. Install spec2cloud: `curl -sSL .../install.sh | sh`
2. Create PRD: Use `/prd` command
3. Configure Azure OpenAI credentials
4. Start building agents

---

*Last Updated: December 2024*
