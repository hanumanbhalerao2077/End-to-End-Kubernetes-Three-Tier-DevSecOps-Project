# Run Guide

## 1. Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (optional)
- MongoDB 7+ or Docker Compose

## 2. Install dependencies

Backend:

```bash
cd Application-Code/backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

## 3. Configure .env

Copy the example files and adjust them as needed:

```bash
cd Application-Code/backend
cp .env.example .env

cd ../frontend
cp .env.example .env
```

## 4. Database setup

### Local MongoDB

Start MongoDB locally and use the default connection string:

```bash
mongodb://127.0.0.1:27017/todo
```

### Docker Compose

```bash
docker compose up -d mongo
```

## 5. Run backend

```bash
cd Application-Code/backend
npm start
```

The API will be available at http://localhost:3500.

## 6. Run frontend

```bash
cd Application-Code/frontend
npm start
```

The UI will be available at http://localhost:3000.

## 7. Run full stack

Open two terminals and run both commands above.

## 8. Build project

Backend:

```bash
cd Application-Code/backend
npm test
```

Frontend:

```bash
cd Application-Code/frontend
npm run build
```

## 9. Docker setup

Build images:

```bash
docker build -t todo-backend:latest Application-Code/backend
docker build -t todo-frontend:latest Application-Code/frontend
```

## 10. Docker Compose

```bash
docker compose up --build
```

## 11. Kubernetes deployment

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

## 12. CI/CD

Push changes to the main branch to trigger the GitHub Actions workflow in .github/workflows/ci-cd.yml.

## 13. Production deployment

Use a managed Kubernetes cluster, ingress controller, TLS, and external MongoDB or a managed database service for production deployments.

## 14. Common errors

- Backend cannot connect to MongoDB: verify the connection string and container networking
- Frontend cannot reach the backend: verify REACT_APP_BACKEND_URL
- Port already in use: stop the conflicting process or change the port

## 15. Fixes

- Check logs with docker compose logs or kubectl logs
- Verify environment variables
- Restart containers or pods after configuration changes

## 16. Debugging guide

```bash
docker compose logs -f backend frontend mongo
kubectl get pods -n todo-app
kubectl logs deployment/todo-backend -n todo-app
kubectl logs deployment/todo-frontend -n todo-app
```
