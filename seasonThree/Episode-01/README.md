# Episode-01 | Launching a AWS Instance and deploying frontend

- In this episode, you'll discover how to launch an AWS EC2 instance and deploy a frontend application on it.
- We guide you through setting up a virtual machine, configuring the environment, and hosting your application for public access.
- By the end, you'll have your first live deployment experience, making your project accessible online.

- created AWS free tier account

## Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance

---

## My Notes

## Season 3 - Episode 01: Launching an AWS Instance & Deploying Frontend

## 🎯 Goal

- Discover how to launch an AWS EC2 instance and deploy a frontend application on it.
- Guide through setting up a Virtual Machine, configuring the environment, and hosting your application for public access.
- By the end, you'll have your first live deployment experience — making your project accessible online.

## 🏗️ Project Overview

We have built two microservices:

- **Frontend Microservice** → `devtinder-web`
- **Backend Microservice** → `devtinder`

We will create a server on AWS and deploy our app on it.

---

## Step 1: AWS Account Setup

- Created an AWS Free Tier account
- Logged into Console → selected region: `ap-south-1`
- Navigated to **EC2** (Elastic Compute) → Virtual Servers in the Cloud
  - EC2 → Instances (running) = 0 → need to launch a new instance
  - Instance = Virtual Machine
  - Named instance: `DevTinder`

---

## Step 2: Configuring the EC2 Instance

### What is an AMI?

- **AMI (Amazon Machine Image)** = Application & OS Images
- Contains the OS, application servers, and applications for your instance
- We selected → **Ubuntu** (a very good Linux system, works well — most companies deploy on it)

### Instance Type

- Selected: **t2.micro** → 1 vCPU, 1 GiB Memory

### Key Pair (for SSH access)

- Create a **Key Pair** to securely connect to your instance
- Ensures you have access to the selected key pair before launching
- Settings used:
  - **Name** → `devtinder-secret`
  - **Key Pair Type** → RSA
  - **Private Key File Format** → `.pem`
- Click **Create** → downloads `devtinder-secret.pem` file
- This `.pem` file is now your **key to access your server**

### Launch Instance

- Click **Launch Instance** → New server instance is created
- You can see → Public & Private IP addresses
- Click on instance → shows all details → click **Connect**
- We will use **SSH Client** to login via terminal

---

## Step 3: SSH into the Instance (Using Git Bash on Windows)

```bash
# Step 1: Set correct permissions on the key file
chmod 400 "devtinder-secret.pem"

# Step 2: Run the SSH command (be in the Downloads folder)
ssh -i "devtinder-secret.pem" ubuntu@
```

- Now you're **logged into the machine** 🎉
- You can now see the terminal of the machine

---

## Step 4: Setup Node.js on the Instance

Before getting the project onto the machine, we need to set up Node.

### Install NVM (Node Version Manager)

```bash
# Go to nodejs.org → Downloads → get the curl command
# Run the curl install script on machine → installs nvm (node version manager)

# Exit the machine after nvm installs
exit

# Re-run SSH command to reconnect
# Then install the correct Node version (match local machine version)

node -v   # check local machine version → e.g. v22.18.0

nvm install 22.18.0
```

- Now the system is ready to get our project files.

### Clone the Project

```bash
git clone
```

---

## Step 5: Deploy the Frontend

### Install pnpm & Build the Project

```bash
# Install pnpm globally
npm install -g pnpm

# Navigate to the frontend folder
cd namaste-nodejs/devtinder-web

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### What `pnpm run build` does:

- Builds the **client environment for production**
- Builds in ~4-5 seconds
- Creates a **`dist` folder** → contains all the necessary files of the frontend
- `dist` = the **code folder we will deploy** (contains all the code you have to run on servers)

---

## Step 6: Install & Configure Nginx

### What is Nginx?

**Nginx** is an HTTP web server. We will use it to host our frontend project.

Nginx capabilities:

- HTTP web server
- Reverse proxy
- Content cache
- Load balancer
- TCP/UDP proxy server
- Mail proxy server

### Install & Start Nginx

```bash
# Update system packages
sudo apt update

# Install nginx
sudo apt install nginx

# Start nginx
sudo systemctl start nginx

# Enable nginx (auto-start on reboot)
sudo systemctl enable nginx

# nginx is now up & running ✅
```

---

## Step 7: Copy dist to Nginx HTML Directory

```bash
# All build code is in dist → copy from dist to nginx HTTP server

# Navigate to /var/www/html (nginx serves from here)
cd /var/www/html
# You'll see: index.nginx-default.html

# Check current directory
pwd
# → /home/ubuntu

# Copy dist files to nginx html directory
cd namaste-nodejs/devtinder-web
sudo scp -r dist/* /var/www/html/

# Verify the files were copied
cd /var/www/html
ls
# You can see all dist folder files are copy-pasted ✅
```

- Now we're ready to see our app **live**! 🚀
- Visit our public IP address → shows our frontend

---

## Step 8: Expose Port 80 (Security Groups)

AWS blocks all ports by default. Nginx runs on **port 80** → we need to expose it.

### Steps to open Port 80:

1. Go to **EC2 → Instance → Security**
2. Click on **Security Groups**
3. Click **Inbound Rules**
4. Click **Add Rule** → allow access on port 80

```
Type: HTTP
Port: 80
Source: 0.0.0.0/0 (anywhere)
```

- Now visit public IP address → **Frontend is live!** ✅

### To Stop Nginx:

```bash
sudo systemctl stop nginx
```

---

## 💡 Key Takeaways

| Concept          | Summary                                               |
| ---------------- | ----------------------------------------------------- |
| AMI              | OS + App image for your EC2 instance                  |
| t2.micro         | 1 vCPU, 1 GiB RAM — Free tier eligible                |
| Key Pair (.pem)  | Your private key to SSH into the server               |
| NVM              | Node Version Manager — install specific Node versions |
| `pnpm run build` | Creates production-ready `dist` folder                |
| Nginx            | HTTP web server used to serve static frontend files   |
| `/var/www/html`  | Nginx's default directory to serve files from         |
| Security Groups  | AWS firewall — must open port 80 for HTTP traffic     |
| `sudo systemctl` | Command to start/stop/enable Linux services           |

---

## ⏭️ Next Up

**Episode 02** — Nginx | Backend Node App Deployment

---

### akshadjaiswal - Notes

---

## DevTinder - AWS EC2 Frontend Deployment 🚀

## 📌 Code Demonstration Links

🔗 **Backend Repository:** [DevTinder Backend](https://github.com/akshadjaiswal/devTinder-backend)  
🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/akshadjaiswal/devTinder-frontend)

---

## 📌 Overview

The goal is to **deploy the DevTinder frontend on an AWS EC2 instance**, making it publicly accessible. This deployment involves setting up a cloud server, installing necessary dependencies, building the frontend, and configuring Nginx as a web server.

This ensures the **DevTinder frontend is hosted on a secure, scalable cloud infrastructure**, optimizing performance and availability.

---

## ✅ Steps Completed

### **1️⃣ Setting Up AWS Console Account & EC2 Instance**

- Created an **AWS account** and completed the **sign-up process**.
- Logged into the **AWS Management Console** and navigated to the **EC2 service**.
- Selected **Launch Instance** and configured the **new instance**.
- Named the instance **DevTinder** and selected **Ubuntu** as the OS.

### **2️⃣ Configuring Key Pair for Secure Login**

- Created a **Key Pair** for secure authentication.
- Downloaded the **private key file** and stored it securely.
- Configured permissions to allow SSH login using the key pair.

### **3️⃣ Launching the EC2 Instance**

- Clicked **Launch Instance** to start the new server.
- Waited for the **instance state to change to "Running"**.
- Verified the instance health with **2/2 status checks passed**.

### **4️⃣ Connecting to the EC2 Instance via SSH**

- Opened a terminal and logged into the instance using the **private key**.
- Verified the connection and accessed the server successfully.

### **5️⃣ Installing Node.js on the Server**

- Checked the local development machine’s **Node.js version**.
- Installed the same version on the EC2 instance using **package manager**.
- Verified the installation to ensure Node.js and npm are working correctly.

### **6️⃣ Cloning DevTinder Repositories on the Server**

- Installed **Git** and cloned the **DevTinder Frontend & Backend** repositories.
- Navigated into the frontend project directory for further setup.

### **7️⃣ Installing Dependencies & Building the Frontend**

- Installed all required **npm packages** for the frontend project.
- Built the frontend project for **production use**.
- Verified that the **dist folder was generated** after the build process.

### **8️⃣ Installing & Configuring Nginx**

- Installed **Nginx**, a web server to serve the frontend files.
- Started the Nginx service and ensured it runs automatically on system reboot.
- Checked the **default Nginx page** to verify the server is active.

### **9️⃣ Deploying the Frontend on Nginx**

- Removed the default Nginx files and replaced them with the **built frontend files**.
- Copied the **dist folder contents** into the Nginx web directory.
- Restarted Nginx to apply the changes and ensure the frontend is being served correctly.

### **🔟 Enabling Port 80 for Public Access**

- Navigated to **AWS Security Groups** to configure inbound rules.
- Allowed **HTTP traffic on port 80** to make the frontend publicly accessible.
- Verified deployment by accessing the **public IP address of the instance**.

---

## 🖥️ Required Commands

### **1️⃣ Connect to AWS EC2 via SSH**

Ensure you have your AWS key pair (`your-key.pem`) and connect to your EC2 instance using the following command:

```
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

---

### **2️⃣ Install Node.js (Matching Local Version)**

To install Node.js (matching the version on your local development machine), run:

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify installation:

```
node -v
npm -v
```

---

### **3️⃣ Clone DevTinder Frontend & Backend Repositories**

Navigate to your home directory and clone both repositories:

```
git clone https://github.com/akshadjaiswal/devTinder-frontend.git
git clone https://github.com/akshadjaiswal/devTinder-backend.git
cd devTinder-frontend
```

---

### **4️⃣ Install Dependencies & Build the Frontend**

Once inside the frontend directory, install dependencies and build the project:

```
npm install
npm run build
```

This will generate the production build inside the `dist` folder.

---

### **5️⃣ Install & Start Nginx**

Install and start the Nginx web server:

```
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### **6️⃣ Deploy Frontend to Nginx Web Directory**

Replace the default Nginx web directory with your built frontend:

```
sudo scp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---

### **7️⃣ Enable Port 80 in AWS Security Group**

To allow HTTP traffic, update your security group settings:

1.  Navigate to **AWS Console > EC2 > Security Groups**.
2.  Edit inbound rules and add a rule:
    - **Type**: HTTP
    - **Port**: 80
    - **Source**: Anywhere (0.0.0.0/0)
3.  Save changes and refresh your EC2 instance.

Your frontend should now be accessible via your EC2 public IP.

## 🎯 **Next Steps**

- **Deploy the Backend on AWS**: Set up the backend and database.
- **Enable HTTPS with SSL**: Install and configure an SSL certificate for secure connections.
- **Optimize Nginx for Performance**: Improve caching, compression, and response times.
- **Set Up a Custom Domain**: Use AWS Route 53 to assign a custom domain.
- **Monitor & Scale**: Configure AWS monitoring tools and auto-scaling for handling high traffic.

---

## 🔥 **Conclusion**

The DevTinder frontend is now successfully deployed on AWS EC2 using Nginx. The application is publicly accessible via the EC2 instance’s public IP. Further improvements such as backend deployment, SSL, and custom domain setup will follow to enhance performance and security. 🚀

---
