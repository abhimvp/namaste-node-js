# Introduction to Node.js

- Offline notes first, then using LLM i will update notes in here later after completion of episode.

Namaste Node.js - Notes - A collection of my personal notes from the "Namaste Node.js" series by Akshay Saini.

## 📜 Episode 01: Introduction to Node.js

### What is Node.js?

- **Official Definition:** A JavaScript runtime built on Chrome's V8 JavaScript Engine.
- **Core Purpose:** It allows you to run JavaScript code **outside of a web browser**. It's not limited to just building web servers.
- **Key Features:**
  - **Cross-Platform:** Runs on Windows, macOS, and Linux.
  - **Open-Source:** Maintained by the OpenJS Foundation.
  - **Architecture:** It has an **event-driven architecture** and is capable of **asynchronous I/O** (also known as **non-blocking I/O**).

> "Any application that can be written in JavaScript, will eventually be written in JavaScript."
>
> — Jeff Atwood, Founder of StackOverflow (2007)

---

## ⏳ History & Evolution of Node.js

To run JavaScript, you need a **JavaScript Engine**. Wherever JavaScript runs, there will always be a JS engine behind the scenes.

- **2009:** Node.js was created by **Ryan Dahl**.
  - It was initially built using Firefox's **SpiderMonkey** engine but quickly switched to Chrome's more powerful **V8 Engine**, which powers it to this day.
  - The project was funded and supported by the company **Joyent**.
  - The earliest name for the project was **web.js**.

### Why Was Node.js Created?

- **The Problem:** Traditional web servers like **Apache** were **blocking servers**. This meant they struggled to handle many concurrent requests efficiently, as they would need to create a new thread for each request.
- **The Solution:** Ryan Dahl wanted to create a **non-blocking server**. The primary advantage is its ability to handle multiple requests simultaneously with a lesser number of threads, making it highly efficient and scalable.

### Major Milestones

- **2010:** **NPM (Node Package Manager)** was created.

  - NPM is a central registry where developers can find and share reusable packages of code.
  - Node.js would not have been as successful without the rich ecosystem provided by NPM.

- **2011:** Official **Windows support** was added.

  - Initially, Node.js was built only for macOS and Linux. The Windows version was a joint effort by Joyent and Microsoft.

- **2012:** Ryan Dahl stepped away from the project.

  - Responsibility was given to **Isaac Z. Schlueter**, the creator of NPM.

- **2014:** A fork of Node.js called **io.js** was created by developer Fedor Indutny due to disagreements over Joyent's governance of the project.

- **2015:** The **Node.js Foundation** was formed.

  - The `Node.js` and `io.js` projects merged back together under this new, open foundation.

- **2019:** The JS Foundation and the Node.js Foundation merged to form the **OpenJS Foundation**.
  - This foundation now takes control over Node.js and is responsible for its active development.
