# Season 3 | Episode 01 — Launching a AWS Instance & Deploying Frontend

## Overview

- Discover how to launch an AWS EC2 instance & deploy a frontend application on it.
- We guide you through setting up a Virtual Machine, configuring the environment, & hosting your application for public access.
- By the end, you'll have first live deployment experience, making your project accessible online.

## Microservices Built

- **Frontend Microservice** — devTinder-web
- **Backend Microservice** — devTinder

Now we will see — how to deploy them on servers & make our application live for everyone to access on the internet.

- Now we have our frontend & backend code on GitHub.
- We will create a Server & deploy our App on to that — on **AWS**
  - Free tier — grindmvp@gmail.com → 6 months free (Nov)

---

## Step 1: AWS Setup

- Created AWS free tier account
- Log into Console → **ap-south-1** (region)
- **EC2** → Go to Elastic Compute
  - Virtual Servers in the cloud
  - Instances (running) — 0 → Over here we have to launch new instance
    - Virtual Machine
    - **Name: DevTinder**

---

## Step 2: AWS EC2 Configuration

- AWS EC2 asks you — which **Operating System** you want to run

### AMI (Amazon Machine Image)

- An AMI contains the OS, application server & application for your instance
- Application & OS Images → Amazon Machine Image (AMI)
- We will select → **Ubuntu** → A very good Linux system. Works well — most companies deploy on it.

### Instance Type

- **t2.micro** → 1 vCPU, 1 GiB Memory

### Create Key Pair

- To securely connect to your instance. Ensure that you have access to the selected key pair before you launch the instance.
- **New**:
  - Name → `devTinder-secret`
  - Key pair type → RSA
  - Private key file format → **.pem**
- **Create** → downloads → `devTinder-secret.pem` file
  - This is now a **key** to access your server.

### Launch Instance

- New **server/instance** is created
- See → public & private IP
- Click on instance → show all details of it → click on **Connect**
  - Gives you ways to connect
  - We will use **SSH Client** to login via terminal

---

## Step 3: SSH Into the Machine

- Using **Git Bash** as a SSH client
- Run command to → `chmod 400 "devTinder-secret.pem"`
- It gives you a SSH command → Be in Downloads folder, do run the SSH command
- Now you're logged into the **Machine**
- Now we see the terminal of the Machine

---

## Step 4: Setup the Machine

- Now we're into the Machine → Before we get project into this, we need to make a setup
- We need **Node** here as well
  - Go to Node.js Downloads
  - We install Node in this instance
  - Get the `curl` & run it on Machine → installs → **nvm** (node version manager)
- Then do `nvm install 22`
  - But we install version of local machine
  - Currently mine is `node -v` → v22.18.0
- `exit` → logout from machine
  - Before this → close & open the terminal to use nvm
- Run SSH command again
- Then run: `nvm install 22.18.0`
- → **Now our system is ready to get our project files.**
- `git clone namaste-node.js`

---

## Step 5: Deploy Frontend

- `cd namaste-node-js/devTinder-web` (n/dT-web)
- `npm install` (first do `npm install -g pnpm`)
- Then do → `pnpm run build`
  - Bundles our project
  - Creates a **dist** folder
  - Contains all the necessary files of frontend
  - Which is the code folder we will deploy
  - Builds client environment for production
  - Builds in 4.51 seconds
- If do `ls` → we find **dist** folder
  - Contains all the code — you have to run on server

---

## Step 6: Install & Start Nginx

To deploy our frontend project — we will need **nginx**:

- A HTTP web server
- Reverse proxy
- Content cache
- Load balancer
- TCP/UDP proxy server
- Mail proxy server

### Commands

```bash
# Update system
sudo apt update

# Install nginx
sudo apt install nginx

# Start nginx
sudo systemctl start nginx

# Enable nginx (auto-start on boot)
sudo systemctl enable nginx
```

→ nginx is up & running

---

## Step 7: Copy Build to Nginx

- Now all build code in **dist** → Copy from dist to **nginx HTTP server**
- dist to `/var/www/html/`
- If we `cd /var/html/` → we see `index.nginx-debian.html`
- `pwd` → `/home/ubuntu`
- From `n/devTinder-web` → run:

```bash
sudo scp -r dist/* /var/www/html/
```

- If we do `cd /var/www/html/` → then do `ls`
  - We can see all our **dist folder files** are copy pasted

→ **Now we're ready to see our app live**

- Our public IP address of instance → shows our frontend
- Currently AWS blocks all our ports
- When we have HTTP web server of nginx → it's on **port 80** → we need to expose it

---

## Step 8: Open Port 80

- Enable port 80 → Go to instance → Security → **Security Groups**
  - Inbound Rules
  - Add a Rule — to allow access **port 80**
- To stop nginx: `sudo systemctl stop nginx`

### Result

- Now try public IP address → **65.sss.1sssss0.184** → we see our frontend! 🎉

---

_Episode 02 — Nginx | Backend Node App Deployment_
