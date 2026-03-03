# Episode-02 | Nginx & Backend Node App Deployment

- Learn how to deploy a Node.js backend application using Nginx as a reverse proxy.
- This episode covers configuring Nginx, managing server requests, and hosting your backend on an AWS EC2 instance.
- By the end of this video, you'll understand how to serve a full-stack application efficiently using Nginx and AWS.

```txt
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"
```

## akshadjaiswal Notes

# DevTinder - AWS EC2 Backend Deployment 🚀

## 📌 Code Demonstration Links

🔗 **Backend Repository:** [DevTinder Backend](https://github.com/akshadjaiswal/devTinder-backend)  
🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/akshadjaiswal/devTinder-frontend)

---

## 📌 Overview

The goal is to **deploy the DevTinder backend on an AWS EC2 instance** and configure **Nginx as a reverse proxy**. This ensures that API requests from the frontend reach the backend seamlessly.

This deployment involves:

- Setting up the **Node.js backend on AWS**.
- Running the backend **continuously using PM2**.
- **Configuring MongoDB Atlas** to allow external connections.
- Using **Nginx as a reverse proxy** to forward `/api` requests to the backend.

---

## ✅ Steps Completed

### **1️⃣ Installing Backend Dependencies on EC2 Instance**

- Logged into the EC2 instance via SSH.
- Navigated to the **DevTinder Backend** directory.
- Installed all required **Node.js dependencies** for the backend.

### **2️⃣ Configuring the Backend Start Script**

- Added a **start script** to run `node app.js` for backend deployment.
- Ensured the script runs properly on the instance.

### **3️⃣ Enabling MongoDB Atlas Access for EC2 Instance**

- Opened **MongoDB Atlas** and navigated to **Network Access Settings**.
- Added the **EC2 instance IP address** to the whitelist.
- Verified that the database connection was successful.

### **4️⃣ Allowing Backend Port 3000 on AWS Security Groups**

- Logged into **AWS Console** and opened **Security Groups** for the EC2 instance.
- Added an **inbound rule** to allow traffic on **port 3000**.
- Ensured external requests can reach the backend.

### **5️⃣ Installing & Configuring PM2**

- Installed **PM2**, a process manager for running Node.js applications continuously.
- Used PM2 to **start the backend server** and keep it running.
- Verified logs using PM2 commands for monitoring and debugging.

### **6️⃣ Running the Backend Using PM2**

- Started the backend server with PM2.
- Used various PM2 commands to:
  - Check running processes.
  - View logs for debugging.
  - Restart or delete PM2 processes when needed.

### **7️⃣ Configuring Nginx as a Reverse Proxy for Backend**

- Opened the **Nginx configuration file** to edit the default settings.
- Added a **proxy_pass configuration** to route `/api` requests to the Node.js backend on port 3000.
- Ensured that Nginx correctly forwards requests from the frontend to the backend.

### **8️⃣ Restarting Nginx to Apply Changes**

- Restarted the **Nginx service** to apply the new configuration.
- Verified that API requests were now being properly forwarded.

### **9️⃣ Updating API Calls in Frontend**

- Changed the `BASE_URL` in the frontend from `http://localhost:3000` to `/api`.
- Ensured that API calls from the frontend now correctly route to the backend through Nginx.

### **🔟 Successfully Deployed & Live on AWS**

- Tested the deployment by making requests to the live backend.
- Verified that both **frontend and backend** work seamlessly together.
- **DevTinder Backend is now fully live on AWS!** 🎉

---

## 🎯 Next Steps

- Enable **HTTPS with SSL** for secure API communication.
- Optimize **PM2 process management** for better performance.
- Implement **logging and monitoring tools** for backend stability.
- Set up **automatic deployments** for future updates.

---

## 🔥 Conclusion

The **DevTinder Backend** is now successfully **deployed on AWS EC2**, with **Nginx handling API requests** and **PM2 keeping the backend live 24/7**. With further optimizations like **SSL and automated deployments**, the backend is ready to scale efficiently. 🚀

# DevTinder - AWS Backend Deployment Commands 💻

## 📌 Connect to EC2 Instance via SSH

ssh -i your-key.pem ubuntu@your-ec2-public-ip

## 📌 Install Backend Dependencies

cd devTinder-backend  
npm install

## 📌 Add & Run Start Script

nano package.json  
 Add: "start": "node app.js"  
npm start

## 📌 Allow MongoDB Access from EC2

- Open MongoDB Atlas
- Navigate to "Network Access"
- Add EC2 instance IP

## 📌 Allow Port 3000 on AWS

- Open AWS Console > EC2
- Navigate to "Security Groups"
- Add inbound rule for Port 3000

## 📌 Install & Start PM2

npm install -g pm2  
pm2 start npm -- start  
pm2 logs  
pm2 list  
pm2 delete npm

## 📌 Configure Nginx Reverse Proxy

sudo nano /etc/nginx/sites-available/default

# Add proxy_pass configuration for /api to port 3000

## 📌 Restart Nginx

sudo systemctl restart nginx

## 📌 Update API Calls in Frontend

- Open frontend constants.js
- Change BASE_URL from "http://localhost:3000" to "/api"

## 📌 Verify Deployment

- Access backend via public IP
- Check logs for errors
- Test API calls
