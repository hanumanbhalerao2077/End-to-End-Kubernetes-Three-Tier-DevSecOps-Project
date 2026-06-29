# JENKINS_GUIDE.md

Jenkins guide for this repository.

This repository includes:
- `Jenkins-Pipeline-Code/Jenkinsfile-Backend`
- `Jenkins-Pipeline-Code/Jenkinsfile-Frontend`

---

## 1) Install Jenkins (Ubuntu)

```bash
sudo apt-get update -y
sudo apt-get install -y openjdk-17-jre
```

Recommended: install Jenkins via official package repository (commands vary by OS/version). After install:
```bash
sudo systemctl enable --now jenkins
sudo systemctl status jenkins --no-pager
```

---

## 2) Initial unlock

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Then open in browser:
- http://YOUR_EC2_PUBLIC_IP:8080

---

## 3) Required plugins

Install via Jenkins UI / Manage Plugins:
- Pipeline
- Git
- Docker (if used)
- Credentials Binding

---

## 4) Create credentials

In **Manage Jenkins → Credentials** create:
- GitHub credentials (username/token or SSH)
- Docker registry credentials (DockerHub or ECR)

---

## 5) Create a pipeline job

1. New Item → Pipeline
2. Source code management: Git
3. Repository URL: repo URL
4. Script Path: point to Jenkinsfile(s)

---

## 6) Jenkinsfile behavior (expected stages)

The Jenkins pipelines should include stages similar to:
- Clone Project
- Install Dependencies
- Run Tests
- Lint (if configured)
- Build
- Docker Build
- Docker Push
- Deploy

This guide references existing Jenkinsfile examples under:
- `Jenkins-Pipeline-Code/`

---

## 7) Troubleshooting

Check Jenkins logs:
```bash
sudo journalctl -u jenkins -f
```

If Docker builds fail, verify Docker daemon permissions and Jenkins user membership in docker group:
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

