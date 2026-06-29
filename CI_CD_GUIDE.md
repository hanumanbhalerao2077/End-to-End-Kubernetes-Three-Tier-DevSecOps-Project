# CI_CD_GUIDE.md

This repository includes GitHub Actions CI/CD configuration under `.github/workflows/ci-cd.yml`.

## 1) What CI/CD does

Typical pipeline stages (based on repository intent):
- Checkout code
- Install backend/frontend dependencies
- Run tests
- Build Docker images
- Push Docker images (optional if configured)
- Deploy to Kubernetes (optional if cluster configured)

---

## 2) Running CI/CD locally (concept)

Because CI/CD is executed in GitHub Actions, local execution depends on your runner environment.

---

## 3) GitHub Actions workflow file

The workflow is located at:
- `.github/workflows/ci-cd.yml`

You can open it in your editor to see:
- Node version
- test commands
- docker build/push steps
- deployment steps

---

## 4) Required secrets (if you enable push/deploy)

If the workflow pushes to DockerHub or AWS/ECR, configure GitHub Secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

If deploying to Kubernetes:
- `KUBE_CONFIG` or token-based auth

> If the workflow already contains specific secret names, follow those exact names.

---

## 5) Example developer checklist

Before pushing to GitHub:
- Ensure backend tests pass: `cd Application-Code/backend && npm test`
- Ensure frontend tests pass: `cd Application-Code/frontend && npm test -- --watchAll=false`
- Ensure docker builds succeed:
  - `docker build ... backend`
  - `docker build ... frontend`

---

## 6) Common CI/CD issues

### Tests failing
- Fix unit/integration tests in:
  - `Application-Code/backend/tests/`

### Docker build failing
- Check Dockerfiles:
  - `Application-Code/backend/Dockerfile`
  - `Application-Code/frontend/Dockerfile`

### Push permissions
- Ensure your GitHub Actions runner has access to DockerHub/ECR.

### Kubernetes deploy failing
- Ensure manifests reference correct images/tags.
- Validate with `kubectl apply --dry-run=client -f ...`.

