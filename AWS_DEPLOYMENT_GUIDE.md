# AWS_DEPLOYMENT_GUIDE.md

Production deployment guide for this repository on **AWS EC2 (fresh Ubuntu instance)**.

> Assumptions (based on repo):
> - Frontend is a React app served via Nginx (production Docker image).
> - Backend is an Express + MongoDB API (production Docker image).
> - Local MongoDB is supported via Docker Compose.
> - This guide deploys **with Docker Compose on a single EC2**. (Kubernetes/EKS guide is included separately.)

---

## 0) What you will deploy

- **todo-frontend**: React UI + Nginx
- **todo-backend**: Express API
- **mongo**: MongoDB (persistent volume)
- **docker-compose.yml** orchestrates the stack

---

## 1) EC2 instance selection (and why)

### Recommended minimum (for small demos)
- **t3.small** (2 vCPU, 2 GiB RAM) 
  - Pros: cost-effective
  - Cons: may be tight under load

### Recommended for better performance
- **t3.medium** (2 vCPU, 4 GiB RAM)

### Storage
- **gp3 20–30 GB** (SSD)
  - Enough for Docker images, logs, and MongoDB data.

### Operating system
- Ubuntu Server 22.04 LTS (recommended)

---

## 2) Networking basics

### Security Groups
Inbound rules:
- **22 (SSH)** from your IP only
- **80 (HTTP)** from 0.0.0.0/0
- **443 (HTTPS)** from 0.0.0.0/0 (if using TLS via Nginx/Let’s Encrypt)
- **3500** (optional, for backend debugging) from 0.0.0.0/0 (not required if Nginx reverse proxy routes internally)

Outbound rules:
- Allow all outbound

---

## 3) Elastic IP

Optional for stability:
- If you want a stable public IP even after instance stop/start, allocate and associate an **Elastic IP**.

---

## 4) SSH key & access

1. Create/download your key pair from AWS console.
2. Ensure file permissions are restrictive.

### From Windows PowerShell
```powershell
# Example: adjust path and key name
icacls "C:\path\to\key.pem" /inheritance:r
icacls "C:\path\to\key.pem" /grant:r "$env:USERNAME":R
```

Then connect:
```powershell
ssh -i "C:\path\to\key.pem" ubuntu@YOUR_PUBLIC_IP
```

---

## 5) Prepare the Ubuntu server (commands)

Connect via SSH first.

### 5.1 Update system
```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

### 5.2 Install essentials
```bash
sudo apt-get install -y git curl wget unzip zip build-essential ca-certificates gnupg
```

### 5.3 Install Docker + Docker Compose plugin
```bash
sudo apt-get install -y docker.io
sudo systemctl enable --now docker

# Docker Compose v2 (plugin)
if ! docker compose version >/dev/null 2>&1; then
  sudo curl -L "https://github.com/docker/compose/releases/download/2.27.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi
```

Verify:
```bash
docker --version
docker compose version || docker-compose --version
```

---

## 6) Install Node.js (if you build images locally)

If you will **build Docker images on EC2**, Node.js is useful.

Option A: NodeSource (Node 20.x)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## 7) Clone repository

```bash
git clone https://github.com/hanumanbhalerao2077/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project.git
cd End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
```

---

## 8) Configure environment

This project uses `.env.example` files. Create them as needed.

### 8.1 Backend env
```bash
cp Application-Code/backend/.env.example Application-Code/backend/.env 2>/dev/null || true
```

> If your backend container uses `MONGO_CONN_STR`, `USE_DB_AUTH`, `MONGO_USERNAME`, `MONGO_PASSWORD`, configure those.

### 8.2 Frontend env
```bash
cp Application-Code/frontend/.env.example Application-Code/frontend/.env 2>/dev/null || true
```

---

## 9) Build and run with Docker Compose

From repo root:

### 9.1 Start stack
```bash
docker compose up --build -d
```

### 9.2 View logs
```bash
docker compose logs -f backend frontend mongo
```

### 9.3 Health checks
- Backend health:
```bash
curl -s http://localhost:3500/healthz
curl -s http://localhost:3500/ready
```

- Frontend:
```bash
# should return HTML
curl -I http://localhost:3000
```

---

## 10) Open the application

- Frontend on: `http://YOUR_PUBLIC_IP:3000`
- Backend on: `http://YOUR_PUBLIC_IP:3500`

> For production, you typically put **Nginx reverse proxy** on ports 80/443.

---

## 11) Nginx reverse proxy (recommended)

If you want clean URLs (e.g., `http://YOUR_DOMAIN/`), install Nginx and proxy:

### 11.1 Install nginx
```bash
sudo apt-get install -y nginx
sudo systemctl enable --now nginx
```

### 11.2 Configure `/etc/nginx/sites-available/default`
Replace with:
```nginx
server {
  listen 80;
  server_name _;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3500/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Reload:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

Now:
- UI: `http://YOUR_PUBLIC_IP/`
- API: `http://YOUR_PUBLIC_IP/api/`

---

## 12) TLS/SSL (optional)

You can configure Let’s Encrypt (Certbot). Steps can vary by domain configuration.

---

## 13) Production hardening checklist

- Use HTTPS (TLS)
- Restrict SSH to your IP only
- Enable Docker log rotation
- Consider running containers with non-root users (Dockerfile hardening)
- Use least-privilege AWS IAM for any automation (Jenkins/GitHub Actions)

---

## 14) Upgrade procedure

```bash
cd End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
git pull
docker compose up --build -d
```

---

## 15) Troubleshooting

- Backend not ready:
  - check `docker compose logs backend`
  - verify Mongo connection string
- Frontend cannot reach API:
  - verify `REACT_APP_BACKEND_URL` inside frontend image build args
- Port conflicts:
  - check `sudo lsof -i :3000` / `:3500`

