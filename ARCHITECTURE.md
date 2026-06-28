# Architecture

## Overview

The project is a three-tier todo application with a React frontend, an Express API, and a MongoDB database.

## High-Level Diagram

```mermaid
flowchart LR
  User[User] --> Frontend[React Frontend]
  Frontend --> API[Express API]
  API --> DB[(MongoDB)]
```

## Low-Level Diagram

```mermaid
flowchart TD
  Browser[Browser] --> App[React App Component]
  App --> TaskService[Task Service]
  TaskService --> API[Express Router /api/tasks]
  API --> Model[Task Mongoose Model]
  Model --> MongoDB[(MongoDB)]
```

## Request Lifecycle

1. User interacts with the frontend.
2. The React UI calls the backend API through Axios.
3. Express validates and processes the request.
4. Mongoose persists or retrieves data from MongoDB.
5. A JSON response is returned to the client.

## Deployment Architecture

- Docker Compose for local orchestration
- Kubernetes manifests for cluster deployment
- Nginx for frontend static hosting
- MongoDB as the data store
