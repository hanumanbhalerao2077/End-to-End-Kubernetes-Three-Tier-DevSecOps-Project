# Production-Ready Three-Tier Todo Application

This repository contains a production-ready three-tier web application built with React, Express, and MongoDB. The project demonstrates a complete end-to-end path from local development to containerization, CI/CD, and Kubernetes deployment.

## Overview

The application is a simple todo board that allows users to create, complete, update, and delete tasks. The project is organized into three layers:

- Frontend: React single-page application
- Backend: Express REST API
- Database: MongoDB

## Features

- Create and manage todo tasks
- Mark tasks as completed
- Delete tasks
- Health and readiness endpoints for orchestration
- Docker-based local development
- Kubernetes deployment manifests
- GitHub Actions CI/CD pipeline
- Production-friendly configuration and documentation

## Tech Stack

- Frontend: React, Material UI, Axios
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Containerization: Docker, Docker Compose
- Orchestration: Kubernetes
- CI/CD: GitHub Actions

## Architecture

The application follows a standard three-tier architecture:

1. Presentation tier: React frontend served by Nginx in production
2. Application tier: Express API running on Node.js
3. Data tier: MongoDB for persistence

## Folder Structure

- Application-Code/backend: backend API and data model
- Application-Code/frontend: React UI
- Jenkins-Pipeline-Code: Jenkins pipeline examples
- Jenkins-Server-TF: Terraform files for Jenkins server provisioning
- Kubernetes-Manifests-file: Kubernetes deployment manifests

## Local Installation

### Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (optional for container runs)
- MongoDB 7+ (or Docker)

### Backend

```bash
cd Application-Code/backend
cp .env.example .env
npm install
npm start
```

### Frontend

```bash
cd Application-Code/frontend
cp .env.example .env
npm install
npm start
```

## Environment Variables

### Backend

- PORT: HTTP port for the backend (default: 3500)
- MONGO_CONN_STR: MongoDB connection string
- USE_DB_AUTH: Enables MongoDB authentication
- MONGO_USERNAME: MongoDB username
- MONGO_PASSWORD: MongoDB password
- FRONTEND_URL: Allowed frontend origin for CORS

### Frontend

- REACT_APP_BACKEND_URL: Backend API URL

## Running with Docker Compose

```bash
docker compose up --build
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3500.

## Kubernetes

```bash
kubectl apply -f Kubernetes-Manifests-file/namespace.yaml
kubectl apply -f Kubernetes-Manifests-file/configmap.yaml
kubectl apply -f Kubernetes-Manifests-file/secret.yaml
kubectl apply -f Kubernetes-Manifests-file/mongodb.yaml
kubectl apply -f Kubernetes-Manifests-file/backend.yaml
kubectl apply -f Kubernetes-Manifests-file/frontend.yaml
kubectl apply -f Kubernetes-Manifests-file/ingress.yaml
kubectl apply -f Kubernetes-Manifests-file/hpa.yaml
```

## Testing

```bash
cd Application-Code/backend
npm test

cd ../frontend
npm test -- --watchAll=false
```

## Documentation

- RUN_GUIDE.md: Step-by-step operations guide
- ARCHITECTURE.md: Architecture and design details
- API_DOCUMENTATION.md: Endpoint reference
- PROJECT_AUDIT.md: Audit summary and fixes
- CHANGELOG.md: Change history

## License

This project is licensed under the MIT License.
