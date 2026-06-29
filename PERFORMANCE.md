# PERFORMANCE.md

Performance guide for this repository.

---

## 1) Where performance matters

- Backend API throughput and response time
- MongoDB query performance
- Frontend bundle size and API call patterns

---

## 2) Backend optimizations

- Keep request payloads small.
- Use pagination for large task lists (currently `GET /api/tasks` fetches all tasks).

Recommendation (future): add `limit` and `offset` query parameters.

---

## 3) MongoDB considerations

- Ensure indexes exist (schema uses `timestamps` but no explicit indexes on `task` or `completed`).
- For production workloads, add indexes if filtering/search is introduced.

---

## 4) Caching

- For this app, caching may be limited, but you can add caching headers for the frontend.

---

## 5) Kubernetes scaling

- Repo includes an HPA manifest: `Kubernetes-Manifests-file/hpa.yaml`.
- Ensure HPA metrics align with load patterns.

---

## 6) Observability

Add monitoring:
- Container CPU/memory
- Request latency (p95)
- MongoDB CPU, connections, slow queries

---

## 7) Production tuning checklist

- Set appropriate Kubernetes resource requests/limits.
- Use rolling updates with readiness probes (already present).
- Enable gzip/brotli at the ingress/Nginx layer if desired.

