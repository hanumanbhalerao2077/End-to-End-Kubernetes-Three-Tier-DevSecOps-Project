# API_DOCUMENTATION.md

REST API documentation for the backend.

Base URL:
- Local: `http://localhost:3500`

---

## Health

### GET `/healthz`
Returns service health status.

Response:
```json
{ "status": "ok" }
```

### GET `/ready`
Returns readiness (DB connection state).

Response codes:
- `200` when DB is connected
- `503` when DB is not ready

Example response:
```json
{ "status": "ready" }
```

---

## Tasks

All endpoints are under `/api/tasks`.

### GET `/api/tasks/`
Returns all tasks.

### POST `/api/tasks/`
Create a task.

Request body:
```json
{ "task": "Write documentation" }
```

### PUT `/api/tasks/:id`
Update task fields.

Request body examples:
```json
{ "completed": true }
```

Or update text:
```json
{ "task": "New text" }
```

### DELETE `/api/tasks/:id`
Delete a task.

Response:
```json
{ "success": true, "deletedTask": { /* ... */ } }
```

