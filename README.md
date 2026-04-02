# DevOps Demo Pipeline

A DevOps pipeline demo using a Node.js app with **Git, Jenkins, Docker, Docker Compose, Ansible, and Prometheus**.

## What We Are Doing

We built a simple web app and wrapped it with a full DevOps pipeline to show how modern software gets from code to production automatically:

**Code** (Git) -> **Test & Build** (Jenkins) -> **Package** (Docker) -> **Run** (Docker Compose) -> **Deploy** (Ansible) -> **Monitor** (Prometheus)

## How We Are Doing It

### Step 1 - Git: Store the code
All project files live in a Git repo. Every push triggers the pipeline.

### Step 2 - Jenkins: Automate testing and building
A `Jenkinsfile` defines 5 stages that run automatically on every push:
Checkout code -> Install dependencies -> Run tests -> Build Docker image -> Deploy

### Step 3 - Docker: Package the app
A `Dockerfile` turns the app into a portable container that runs the same on any machine.

### Step 4 - Docker Compose: Run everything together
One command (`docker compose up`) starts the app and Prometheus monitoring side by side on a shared network.

### Step 5 - Ansible: Deploy to any server
An Ansible playbook automates the full deployment: install Docker, clone repo, start containers, verify health.

### Step 6 - Prometheus: Monitor the app
Prometheus scrapes the app's `/metrics` endpoint every 5 seconds, collecting request counts and response times.

## How to Run

```bash
cd devops-demo
docker compose up --build
```

- App: http://localhost:3000
- Metrics: http://localhost:3000/metrics
- Prometheus: http://localhost:9090

Stop with:
```bash
docker compose down
```
