# Episode-15 | DevTinder UI - Part 1

- In the first part of the DevTinder UI series, we begin by setting up the project structure and creating the initial React components.
- You'll learn how to configure your development environment, establish a component hierarchy, and implement the basic layout for the DevTinder application.
- This episode sets the foundation for building an engaging user interface, perfect for developers looking to learn React and UI design fundamentals.

- we will use [React+Vite(Build Tool)](https://vite.dev/guide/)
- creating the frontend in same repo

```bash
abhis@Tinku MINGW64 ~/Desktop/backend/namaste-node-js (main)
$ npm create vite@latest devTinder-web -- --template react
Need to install the following packages:
create-vite@8.3.0
Ok to proceed? (y)


> npx
> create-vite devTinder-web --template react
Package name:
│  devtinder-web
│
◇  Use Vite 8 beta (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  No
│
◇  Scaffolding project in C:\Users\abhis\Desktop\backend\namaste-node-js\devTinder-web...
│
└  Done. Now run:

  cd devTinder-web
  npm install
  npm run dev
```

- default Code cleanup (Remove unnecessary code)
- Install - `tailwindcss` - `pnpm install tailwindcss @tailwindcss/vite` - Follow the [docs](https://tailwindcss.com/docs/installation/using-vite)
- In chrome devTools - in Elements tab - in `<head>` section - we can see ->

```bash
<style type="text/css" data-vite-dev-id="C:/Users/abhis/Desktop/backend/namaste-node-js/devTinder-web/src/index.css">
    <!-- All the code related to tailwindcss is included automatically when we are done with configuring tailwindcss and we can get started using it -->
  </style>
```

- we will use component library - [daisyUI](https://daisyui.com/?lang=en) - compatible with Tailwindcss & use [components](https://daisyui.com/components/) from it directly like NavBar, [Accordion](https://daisyui.com/components/accordion/) etc
- How to install: Refer [docs](https://daisyui.com/docs/install/)
  - `pnpm add -D daisyui@latest`
- Automatically the theme changes to dark.
- we can update theme as we wish as there are many [available](https://daisyui.com/docs/themes/):

```css
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}
```

- we will use this [Navbar component](https://daisyui.com/components/navbar/#navbar-with-search-input-and-dropdown)
- Refer the [color guide](https://daisyui.com/docs/colors/) to have colors as we need in our components

- Always try to create smaller components.
- Create a NavBar.jsx seperate component file.
- Setup Routing in our application(app).
  - we will use [react-router](https://reactrouter.com/) for this.
  - `pnpm add react-router-dom`
  - [Read this](https://dev.to/pramod_boda/what-is-the-difference-between-react-router-and-react-router-dom-2da6#:~:text=Using%20useParams%20to%20Access%20Route,on%20top%20of%20react%2Drouter%20.) for why react-router-dom and not react-router
  - Routing can be created on the root level of the application in `App.jsx`

```txt
Should You Use react-router or react-router-dom?
Use react-router-dom for web development

- react-router: This is the core package that provides the basic, platform-agnostic routing logic and components like Routes, Route, and Outlet. You generally do not install or use this package directly in application code.

- react-router-dom: This package extends react-router with web-specific features and DOM bindings, such as BrowserRouter, Link, NavLink, and navigation hooks like useNavigate
```

- Creating child routes for Body and render those sub-routes using Outlet in Body Component
- Added [Footer component](https://daisyui.com/components/footer/#centered-footer-with-logo-and-social-icons) from daisyUI

<!-- Notes from akshadjaiswal -->

# DevTinder Frontend - UI Development 🚀

## 📌 Code Demonstration Links

🔗 **Backend Repository:** [DevTinder Backend](https://github.com/akshadjaiswal/devTinder-backend)  
🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/akshadjaiswal/devTinder-frontend)

---

## 📌 Overview

DevTinder is a **MERN stack** web application designed to help developers **connect and collaborate**, similar to Tinder but for the tech community.

This repository contains the **frontend** of DevTinder, built using **React + Vite** for fast development, optimized performance, and modular UI components. The project is styled with **Tailwind CSS & Daisy UI**, and **React Router DOM** is used for seamless navigation between pages.

Currently, the frontend is in the **development phase**, with foundational setup and UI components being implemented.

---

## ✅ Steps Completed

### **1️⃣ Configuring Vite + React**

- Initialized the **React project using Vite**, which provides faster builds and optimized performance compared to Create React App.
- Verified that the project setup is correct for smooth development.

### **2️⃣ Code Cleanup & Initial Testing**

- Removed unnecessary boilerplate code generated by Vite.
- Conducted a **test run** to confirm that the development server is working correctly.

### **3️⃣ Installing & Configuring Tailwind CSS (v3)**

- Installed **Tailwind CSS v3**, a utility-first CSS framework for fast styling.
- Configured Tailwind by modifying the **`tailwind.config.js`** and linked it with the project's styles.
- Successfully tested Tailwind classes to ensure proper integration.

### **4️⃣ Installing & Configuring Daisy UI**

- Installed **Daisy UI**, a Tailwind-based component library, for pre-designed UI components.
- Configured Daisy UI within Tailwind settings to make components available globally.
- Tested Daisy UI components to verify proper rendering and styling.

### **5️⃣ Creating `Navbar.jsx`**

- Designed a **responsive navigation bar** using Daisy UI components.
- Ensured the Navbar includes essential elements like **logo, navigation links, and a mobile-friendly menu**.
- Used React state where necessary for **handling dropdowns or responsive behavior**.

### **6️⃣ Installing & Testing React Router DOM**

- Installed **React Router DOM** to manage client-side navigation.
- Created a **basic routing structure**, including routes for Home, Profile, and Feed.
- Tested navigation between pages to ensure seamless user experience.

### **7️⃣ Setting Up Browser Router & Nested Routes**

- Implemented **BrowserRouter** for handling client-side routing.
- Structured **Routes & Nested Routes** inside a `Body.jsx` component.
- Ensured proper parent-child route handling for pages within the application.

### **8️⃣ Implementing `Outlet` in `Body.jsx`**

- Used **`Outlet` from React Router** to dynamically render child components inside the `Body` component.
- This ensures that different pages load properly within the layout while keeping the Navbar and Footer consistent.

### **9️⃣ Creating the Footer Component**

- Added a **Footer component** to balance the layout at the bottom of the page.
- Styled the footer using Tailwind and Daisy UI for a **consistent design**.

---

## 🎯 Next Steps

- **Authentication Pages**: Develop **Login & Signup** pages for user authentication.
- **Homepage & Feed UI**: Start building the main **Feed Page**, where users can explore developer profiles.
- **Improving UI & Responsiveness**: Enhance **layout, spacing, and responsiveness** for mobile and desktop views.
- **API Integration**: Connect the frontend with the **DevTinder Backend** for authentication and user interactions.

---

## 🔥 Conclusion

The **DevTinder Frontend** setup is progressing well, with the foundational UI components and routing in place. The next phase will focus on **user authentication, profile management, and interactive UI elements**.

With **Vite for speed, Tailwind for styling, Daisy UI for components, and React Router for navigation**, the frontend is well-structured for scalability and performance. 🚀
