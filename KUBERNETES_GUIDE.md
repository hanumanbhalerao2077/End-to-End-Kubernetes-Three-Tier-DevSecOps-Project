# KUBERNETES_GUIDE.md

Kubernetes deployment guide for this repository.

> Note: The repository contains multiple manifest sets under `Kubernetes-Manifests-file/`.
> This guide uses the top-level manifests:
> - `namespace.yaml`
> - `configmap.yaml`
> - `secret.yaml`
> - `mongodb.yaml`
> - `backend.yaml`
> - `frontend.yaml`
> - `ingress.yaml`
> - `hpa.yaml`

---

## 1) Prerequisites

- A Kubernetes cluster (local kind/minikube or cloud EKS)
- `kubectl` configured
- An Ingress controller (nginx ingress recommended)

Verify:
```bash
kubectl version --client
kubectl get nodes
```

---

## 2) Deploy to Kubernetes

From repo root:
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

---

## 3) Validate resources

```bash
kubectl get all -n todo-app
kubectl get pods -n todo-app
kubectl get svc -n todo-app
kubectl get ingress -n todo-app
```

---

## 4) Health checks

Check backend readiness from within the cluster:
```bash
kubectl exec -it deploy/todo-backend -n todo-app -- sh -c "curl -s http://localhost:3500/ready"
kubectl exec -it deploy/todo-backend -n todo-app -- sh -c "curl -s http://localhost:3500/healthz"
```

---

## 5) Logs

Backend logs:
```bash
kubectl logs -l app=todo-backend -n todo-app
```

Frontend logs:
```bash
kubectl logs -l app=todo-frontend -n todo-app
```

Mongo logs:
```bash
kubectl logs -l app=mongo -n todo-app
```

---

## 6) Describe and rollout

Describe backend deployment:
```bash
kubectl describe deploy/todo-backend -n todo-app
```

Rollout:
```bash
kubectl rollout status deploy/todo-backend -n todo-app
```

---

## 7) Ingress access

The manifest uses `host: todo.local` and Ingress rule paths:
- `/api/*` → backend
- `/` → frontend

To test locally, you typically add an entry to `/etc/hosts` pointing to your ingress controller IP:
```bash
# On your laptop (example)
# <INGRESS_CONTROLLER_IP> todo.local
```

Then open:
- `http://todo.local/`

---

## 8) Cleanup

```bash
kubectl delete -f Kubernetes-Manifests-file/ingress.yaml
kubectl delete -f Kubernetes-Manifests-file/hpa.yaml
kubectl delete -f Kubernetes-Manifests-file/frontend.yaml
kubectl delete -f Kubernetes-Manifests-file/backend.yaml
kubectl delete -f Kubernetes-Manifests-file/mongodb.yaml
kubectl delete -f Kubernetes-Manifests-file/secret.yaml
kubectl delete -f Kubernetes-Manifests-file/configmap.yaml
kubectl delete -f Kubernetes-Manifests-file/namespace.yaml
```

