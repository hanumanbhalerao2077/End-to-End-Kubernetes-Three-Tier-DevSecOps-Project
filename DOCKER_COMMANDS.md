# DOCKER_COMMANDS.md

Quick reference for Docker commands used in this project.

---

## Build / Images

```bash
docker build -t todo-backend:latest ./Application-Code/backend

docker build -t todo-frontend:latest ./Application-Code/frontend

docker images
```

---

## Run / Logs

```bash
docker run --name todo-backend -p 3500:3500 todo-backend:latest

docker logs -f todo-backend
```

List running containers:
```bash
docker ps
```

Stop / remove:
```bash
docker stop todo-backend
docker rm todo-backend
```

---

## Exec

```bash
docker exec -it todo-backend sh
```

---

## Docker Compose

```bash
docker compose up --build -d

docker compose ps

docker compose logs -f

docker compose down

docker compose restart
```

