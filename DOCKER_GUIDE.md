# DOCKER_GUIDE.md

How to use Docker for this repository.

This repo contains two Dockerfiles:
- `Application-Code/backend/Dockerfile`
- `Application-Code/frontend/Dockerfile`

---

## 1) Prerequisites

- Docker installed
- Docker Compose available (`docker compose`)

Verify:
```bash
docker --version
docker compose version
```

---

## 2) Build images

From repo root:

### Backend
```bash
docker build -t todo-backend:latest ./Application-Code/backend
```

### Frontend
```bash
docker build -t todo-frontend:latest ./Application-Code/frontend
```

---

## 3) Run locally (with Docker Compose)

From repo root:
```bash
docker compose up --build -d
```

Check:
```bash
docker compose ps
docker compose logs -f
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:3500`

---

## 4) Run individual containers (optional)

### Mongo
```bash
docker run -d --name todo-mongo -p 27017:27017 mongo:7
```

### Backend
```bash
docker run --rm --name todo-backend -p 3500:3500 \
  -e PORT=3500 \
  -e MONGO_CONN_STR="mongodb://host.docker.internal:27017/todo" \
  -e USE_DB_AUTH=false \
  todo-backend:latest
```

### Frontend
```bash
docker run --rm --name todo-frontend -p 3000:80 \
  -e REACT_APP_BACKEND_URL="http://localhost:3500/api/tasks" \
  todo-frontend:latest
```

---

## 5) Notes about environment variables

- Backend reads `MONGO_CONN_STR`, `USE_DB_AUTH`, `MONGO_USERNAME`, `MONGO_PASSWORD`.
- Frontend is compiled during build; in this repo it is injected via Docker build args (see frontend Dockerfile).

