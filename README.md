
# Algolia MCP Client

A modern, responsive web MCP client for interacting with the Algolia Model Context Protocol (MCP) server and LLMs (Claude, Gemini, GPT-4, etc.).

## Features

- **Chat-based UI**: Conversational interface for querying Algolia MCP and LLMs.
- **Prompt Templates**: One-click prompt suggestions for common tasks.
- **Markdown & Code Rendering**: Supports markdown, syntax-highlighted code, and copy-to-clipboard.
- **Chart Visualization**: Renders charts from LLM/MCP responses using Chart.js.
- **Persistent Chat History**: Chats are saved in local storage.
- **Mobile Responsive Sidebar**: Overlay sidebar for mobile and desktop.
- **MCP Server & Tools Browser**: View available MCP servers and tools dynamically.
- **Theme Toggle**: Light/dark mode and custom _Algolia_ theme.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MCP server running locally (see [MCP Proxy Server](https://github.com/algolia/mcp-proxy-server))

### Installation

```bash
git clone https://github.com/Kiran1689/algolia-mcp-client.git
cd algolia-mcp-client
npm install
```

### Running the App

```bash
npm run dev
```
The app will be available at `http://localhost:5173` by default.

### Connecting to MCP Server

Ensure your MCP client is running at `http://localhost:8000` (default). You can change the endpoints in the code if needed.

## How It Works

- User messages are sent to the MCP server, which routes them to the selected LLM.
- The server returns structured responses (text, code, charts), which are rendered in the chat UI.
- The sidebar displays available MCP servers and tools, fetched dynamically.

## Key Technologies

- React, Vite, Tailwind CSS
- Chart.js & react-chartjs-2
- ReactMarkdown, rehype-highlight, remark-gfm
- Framer Motion (animations)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
