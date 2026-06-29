# EC2_SETUP.md

Step-by-step **EC2 (Ubuntu) setup** to deploy and run this repository.

---

## 1) Launch an EC2 instance

- AMI: **Ubuntu Server 22.04 LTS**
- Instance type: **t3.medium** (2 vCPU, 4 GiB) recommended
- Storage: gp3 SSD **20–30 GiB**

Security group inbound (minimum):
- 22 (SSH) — from **your IP only**
- 80 (HTTP) — if you will serve frontend directly / via Nginx

---

## 2) SSH into the instance

### Windows PowerShell
```powershell
ssh -i "C:\path\to\key.pem" ubuntu@YOUR_PUBLIC_IP
```

### Common permission fix
If you see `UNPROTECTED PRIVATE KEY FILE`:
```powershell
icacls "C:\path\to\key.pem" /inheritance:r
icacls "C:\path\to\key.pem" /grant:r "$env:USERNAME":R
```

---

## 3) Update and install base packages

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y git curl wget unzip zip ca-certificates gnupg build-essential
```

---

## 4) Install Docker & Docker Compose

```bash
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
```

Add your user to docker group (optional but recommended):
```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify:
```bash
docker --version
docker ps
```

Compose (v2 plugin):
```bash
docker compose version || docker-compose --version
```

---

## 5) (Optional) Install Node.js 20

Only needed if you run builds on the instance rather than inside Docker.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## 6) Clone the repo

```bash
git clone https://github.com/hanumanbhalerao2077/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project.git
cd End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
```

---

## 7) Start with Docker Compose

```bash
docker compose up --build -d
```

Check logs:
```bash
docker compose logs -f
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3500

