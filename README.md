# Namaste-Node-Js

[Reference Code Repo](https://github.com/akshadjaiswal/Namaste-Nodejs)

[expressjs](https://expressjs.com/) - Node.js web application framework

[devTinder-web](https://github.com/akshaymarch7/devTinder-web) - AkshaySaini

[devTinder](https://github.com/akshaymarch7/devTinder) - AkshaySaini

- chrome-devtools mcp server using gemini cli - `gemini mcp add chrome-devtools npx chrome-devtools-mcp@latest --scope project`

The [Chrome DevTools MCP](https://developer.chrome.com/docs/devtools#mcp) (Model Context Protocol) server is a game-changer for AI-assisted development. It essentially gives your AI agents (like Claude, Gemini, or VS Code agents) "eyes" and "hands" within the Chrome browser.

-----

## 🛠️ Chrome DevTools MCP: Capabilities & Usage

The **Chrome DevTools MCP server** allows AI coding agents to interact directly with the browser's developer tools. This enables the agent to investigate bugs, test UI, and validate its own code in real-time.

### ✨ Key Capabilities

- **Navigation & Interaction:** The agent can navigate to URLs, click elements, and fill out forms to test complex user flows.
- **Visual Validation:** It can take screenshots of the page to verify styling and layout.
- **Performance Analysis:** Run **Lighthouse audits** or use the Performance panel to identify bottlenecks.
- **Emulation:** Test your site across different screen sizes, locations, and network speeds (e.g., simulating 3G).
- **Network Monitoring:** Analyze network requests and responses on the fly.
- **Console & Sources:** Inspect console errors and suggest code fixes directly within the DevTools environment.

### 🚀 Setup & Installation

1. **Requirements:** Ensure you have **Node.js v20.19** or newer.
2. **Project-Specific Install (Recommended):** Instead of a global install, add it to your project to keep configuration portable and manage token costs.
3. **Config Files:** The server generates/uses standard JSON config files based on your tool:
      - **Gemini CLI:** `.gemini/settings.json`
      - **Cloud Code:** `mcp.json`
      - **VS Code / Cursor:** `.vscode/mcp.json` or `.cursor/mcp.json`.

### ⚙️ Useful Configuration Flags

You can tailor the MCP server by adding flags to the `args` array in your config file:

- `--slim`: Minimizes token consumption by enabling only essential tools like navigation and screenshots.
- `--category [name]=false`: Disable specific tool categories (like `emulation` or `performance`) to save costs.
- `--autoconnect`: Connects the agent to an already running instance of Chrome (requires "Remote Debugging" to be enabled in `chrome://inspect`).

### 💡 Example Prompts for your Agent

- *"Run a Lighthouse audit on localhost:3000 and tell me why the LCP is high."*
- *"Go to the login page, sign in with 'test\_user', and verify that the dashboard header is visible."*
- *"Check if the signup form is accessible on a mobile screen size."*

-----

**References:**

- [Official Documentation](https://developer.chrome.com/docs/devtools#mcp)
- [Setup Guide Video](http://www.youtube.com/watch?v=hokTkVqKujY)
- [GitHub Repository](https://www.google.com/search?q=https://github.com/GoogleChromeLabs/devtools-mcp)

<http://googleusercontent.com/youtube_content/0>
