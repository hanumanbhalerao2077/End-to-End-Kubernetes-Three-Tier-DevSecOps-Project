# TROUBLESHOOTING.md

Common problems and fixes.

---

## 1) Backend cannot connect to MongoDB

### Symptom
- `/ready` returns `not-ready`
- Backend logs show connection errors

### Fix
- Verify `MONGO_CONN_STR` points to the Mongo service name when using Docker/Kubernetes.
  - Docker Compose: `mongodb://mongo:27017/todo`
  - Kubernetes: service name e.g. `mongodb` or `mongodb-svc` (depends on manifests)

Restart stack:
```bash
docker compose down
docker compose up -d
```

---

## 2) Frontend cannot reach backend

### Symptom
- UI loads but API calls fail

### Fix
- Ensure `REACT_APP_BACKEND_URL` is correct.
  - Docker Compose container build arg: should be `http://localhost:3500/api/tasks` inside your build/run.
  - In Kubernetes, use the internal service URL.

---

## 3) Kubernetes pods crashloop

Check logs:
```bash
kubectl logs <pod-name> -n <namespace>
```

Describe:
```bash
kubectl describe pod <pod-name> -n <namespace>
```

---

## 4) Port already in use

Fix:
```bash
sudo lsof -i :3000
sudo lsof -i :3500
```

Stop conflicting process or change port mapping.

