# DEPLOYMENT_RUNBOOK.md

Beginner-friendly step-by-step execution order for **Docker on AWS EC2**.

---

## STEP 1: Create AWS Account
- Create/choose an AWS account.

---

## STEP 2: Launch EC2
- Launch **Ubuntu Server 22.04 LTS**.
- Instance type: **t3.medium** (recommended).
- Storage: **gp3 20–30 GB**.

---

## STEP 3: Download Key Pair
- Download your `.pem` key.

---

## STEP 4: Connect SSH
### Windows PowerShell
```powershell
ssh -i "C:\path\to\key.pem" ubuntu@YOUR_PUBLIC_IP
```

---

## STEP 5: Install Git
```bash
sudo apt-get update -y
sudo apt-get install -y git
```

---

## STEP 6: Clone Repository
```bash
git clone https://github.com/hanumanbhalerao2077/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project.git
cd End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
```

---

## STEP 7: Install Docker
```bash
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
```

---

## STEP 8: Install Docker Compose plugin
```bash
sudo apt-get install -y docker-compose-plugin || true
```

Verify:
```bash
docker compose version || docker-compose --version
```

---

## STEP 9: Build Docker images
```bash
docker compose build
```

---

## STEP 10: Run containers
```bash
docker compose up -d
```

Verify:
```bash
docker compose ps
docker compose logs -f backend
```

---

## STEP 11: Install Jenkins (optional)
See `JENKINS_GUIDE.md`.

---

## STEP 12: Configure Jenkins (optional)
See `JENKINS_GUIDE.md`.

---

## STEP 13: Install kubectl (optional; only if deploying to Kubernetes)
See `KUBERNETES_GUIDE.md`.

---

## STEP 14: Deploy Kubernetes (optional)
See `KUBERNETES_GUIDE.md`.

---

## STEP 15: Verify application
- Frontend: http://YOUR_PUBLIC_IP:3000
- Backend API: http://YOUR_PUBLIC_IP:3500/healthz

---

## STEP 16: Open browser
Open:
- http://YOUR_PUBLIC_IP:3000

---

## STEP 17: Test APIs
```bash
curl -s http://localhost:3500/healthz
curl -s http://localhost:3500/ready
curl -s http://localhost:3500/api/tasks
```

---

## STEP 18: Production deployment
For production best practices:
- Use Nginx reverse proxy (80/443) and TLS.
- Use Kubernetes for orchestration, or scale Docker on multiple hosts.
- Use managed MongoDB (DocumentDB/Mongo Atlas) for reliability.
- Add CI/CD for automated build/test/deploy.

