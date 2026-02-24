# Episode-18 | DevTinder UI - Part 4

- In the fourth part of the DevTinder UI series, we connect the frontend to the backend, enabling the display of live data.
- You'll learn how to make API calls using Axios or Fetch, handle responses, and update the UI dynamically based on user interactions.
- This episode bridges the gap between the frontend and backend, providing the skills needed to build data-driven applications that offer a seamless user experience.

## MyNotes

- Build a feature to see all my connections (`/user/connections`)
  - store the connections

## Reference notes from akshadjaiswal

### 📌 Code Demonstration Links

🔗 **Backend Repository:** [DevTinder Backend](https://github.com/akshadjaiswal/devTinder-backend)  
🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/akshadjaiswal/devTinder-frontend)

---

## 📌 Overview

DevTinder is a **MERN stack** web application designed to help developers **connect and collaborate**. The latest update focuses on the **Connections Page** and **Request Review Functionality**, allowing users to view, accept, and reject connection requests.

This update includes:

- Fetching and displaying **accepted connections**.
- Fetching and managing **pending connection requests**.
- Implementing **Redux state management** for connections.
- Handling **accept/reject actions dynamically**.

---

## ✅ Steps Completed

### **1️⃣ Implemented Feature to See All Connections**

- Designed a **Connections Page** to display all accepted connections.
- Created a structured layout for showing **profile pictures, names, and interaction buttons**.

### **2️⃣ API to Get Connections**

- Integrated an **API call to fetch all accepted connections** from the backend.
- Ensured only authenticated users can access this data.

### **3️⃣ Created Redux Store for Connections (`connectionSlice`)**

- Defined a **Redux slice (`connectionSlice`)** to store and manage the user’s connections.
- Updated Redux state when new connections are fetched.
- Ensured state updates dynamically across components.

### **4️⃣ Displaying Connections List in UI**

- Retrieved connection data from **Redux store** and displayed it in a structured format.
- Used **Tailwind CSS & Daisy UI** to style the connection cards.

### **5️⃣ Implemented Feature to Show All Connection Requests**

- Added a **Request Page** where users can view pending connection requests.
- Displayed sender details (name, profile picture) along with action buttons.

### **6️⃣ Fetching & Storing Connection Requests**

- Called **API to fetch pending connection requests**.
- Stored request data in **Redux store** for efficient state management.
- Ensured UI updates dynamically as requests are received or processed.

### **7️⃣ Accept & Reject Connection Requests**

- Implemented functionality to **accept or reject** incoming connection requests.
- Upon user action:
  - **Accepted requests** move to the **Connections Page**.
  - **Rejected requests** are removed from the UI.
- Updated **Redux store** after each action to ensure UI reflects changes immediately.

---

## 🎯 Next Steps

- **Enhance Connection Request UI**: Improve animations and interaction buttons.
- **Optimize API Calls**: Implement caching strategies to reduce unnecessary API requests.

---

## 🔥 Conclusion

The **Connections Page and Request Review functionality** are now fully implemented in DevTinder. Users can now view, accept, and manage their connections efficiently.

With **Redux for state management, API integration for request handling, and UI improvements**, DevTinder is evolving into a more **interactive and user-friendly** platform. 🚀
