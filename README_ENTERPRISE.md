# README_ENTERPRISE.md

Production-grade enterprise runbook (overview)

This repository is a **three-tier todo application**:
- Frontend (React, Nginx)
- Backend (Node.js + Express REST API)
- Database (MongoDB)

Primary documents:
- `RUN_GUIDE.md`: local run instructions
- `AWS_DEPLOYMENT_GUIDE.md`: EC2 Docker deployment
- `DOCKER_GUIDE.md` and `DOCKER_COMMANDS.md`
- `KUBERNETES_GUIDE.md`
- `JENKINS_GUIDE.md`
- `CI_CD_GUIDE.md`
- `API_DOCUMENTATION.md`
- `SECURITY.md`
- `PERFORMANCE.md`
- `TROUBLESHOOTING.md`

---

## Quick start (Docker Compose)

```bash
docker compose up --build -d
```

Then open:
- http://localhost:3000

API:
- http://localhost:3500/api/tasks

