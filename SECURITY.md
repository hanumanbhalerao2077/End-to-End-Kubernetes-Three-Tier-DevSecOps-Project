# SECURITY.md

Security considerations for this project.

---

## 1) Application security

### Helmet
Backend uses `helmet()` for common security headers.

### CORS
Backend config:
- `cors({ origin: process.env.FRONTEND_URL || true, ... })`

Production recommendation:
- Set `FRONTEND_URL` to an explicit allowed origin.
- Avoid `origin: true` in production.

---

## 2) Input validation

- Task endpoints validate required fields (`task` non-empty, valid ObjectId).
- Mongoose schema uses `required`, `trim`, and `minlength` validators.

Recommendation:
- Add centralized validation middleware for consistent error responses.

---

## 3) Secrets handling

- Kubernetes uses `Secret` objects and injects env vars.
- Docker Compose uses `.env.example` pattern.

Recommendation:
- Never commit real credentials to git.
- Use AWS Secrets Manager / Parameter Store for EC2 production.

---

## 4) Transport security

- Use HTTPS in front of the application.
- In Kubernetes, terminate TLS at Ingress.
- In EC2, terminate TLS at Nginx reverse proxy.

---

## 5) Least privilege

- Backend runs as container default user unless Dockerfiles define a non-root user.
- Create restrictive IAM roles if using AWS integrations (ECR, S3, Secrets Manager).

---

## 6) Logging and monitoring

- Backend uses `morgan("combined")`.

Recommendation:
- Centralize logs (CloudWatch on EC2/K8s) and monitor:
  - 4xx/5xx rate
  - DB readiness failures
  - container restarts

---

## 7) Vulnerability management

- Pin and scan dependencies.
- Scan Docker images with a security scanner (e.g., Trivy) as part of CI.

