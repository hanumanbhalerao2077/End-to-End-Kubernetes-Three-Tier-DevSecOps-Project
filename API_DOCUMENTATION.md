# API Documentation

## Base URL

- Local: http://localhost:3500
- Docker Compose: http://localhost:3500

## Endpoints

### GET /healthz

Returns service health status.

Response:

```json
{ "status": "ok" }
```

### GET /ready

Returns whether the backend is ready to serve traffic.

### GET /started

Returns startup confirmation.

### GET /api/tasks

Returns all tasks.

### POST /api/tasks

Creates a new task.

Request body:

```json
{ "task": "Write documentation" }
```

### PUT /api/tasks/:id

Updates a task.

Request body:

```json
{ "completed": true }
```

### DELETE /api/tasks/:id

Deletes a task.
