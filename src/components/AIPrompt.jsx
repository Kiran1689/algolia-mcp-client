import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Paperclip, Send, Plus, Sparkles, MessageSquare, Trash2, Menu, X, Copy, Heart,} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea.jsx";
import ShimmerText from "./ui/shimmer-text.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "../components/ui/dropdown-menu.jsx";
import { Button } from "../components/ui/button.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ThemeToggle from "./themeToggle.jsx";
import ChartRenderer from "../components/ui/ChartRenderer.jsx";
import { TextAnimate } from "./ui/text-animate.jsx";


export default function AIPrompt() {
  const [value, setValue] = useState("");
  const [animatedText, setAnimatedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });
  const [selectedModel, setSelectedModel] = useState("Claude Sonnet 4");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mcpServers, setMcpServers] = useState([]);
  const [tools, setTools] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const AI_MODELS = [
    "Claude Sonnet 4",
    "Gemini 2.5 Flash",
    "o3-mini",
    "GPT-4-1 Mini",
    "GPT-4-1",
  ];

  const MODEL_ICONS = {
    "o3-mini": OPENAI_SVG,
    "Gemini 2.5 Flash": (
      <svg
        height="1em"
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Gemini</title>
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="#3186FF"
        ></path>
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#lobe-icons-gemini-fill-0)"
        ></path>
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#lobe-icons-gemini-fill-1)"
        ></path>
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#lobe-icons-gemini-fill-2)"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="lobe-icons-gemini-fill-0"
            x1="7"
            x2="11"
            y1="15.5"
            y2="12"
          >
            <stop stop-color="#08B962"></stop>
            <stop offset="1" stop-color="#08B962" stop-opacity="0"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="lobe-icons-gemini-fill-1"
            x1="8"
            x2="11.5"
            y1="5.5"
            y2="11"
          >
            <stop stop-color="#F94543"></stop>
            <stop offset="1" stop-color="#F94543" stop-opacity="0"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="lobe-icons-gemini-fill-2"
            x1="3.5"
            x2="17.5"
            y1="13.5"
            y2="12"
          >
            <stop stop-color="#FABC12"></stop>
            <stop offset=".46" stop-color="#FABC12" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
    "Claude Sonnet 4": (
      <svg
        height="1em"
        style={{ flex: "none", lineHeight: "1" }}
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Claude</title>
        <path
          d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
          fill="#D97757"
          fillRule="nonzero"
        />
      </svg>
    ),
    "GPT-4-1 Mini": OPENAI_SVG,
    "GPT-4-1": OPENAI_SVG,
  };

  function AnimatedUserIcon() {
    return (
      <div className="loader w-10 h-10">
        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
          <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="b"
            >
              <stop stopColor="#973BED"></stop>
              <stop stopColor="#007CFF" offset="1"></stop>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="0"
              y1="64"
              x1="0"
              id="c"
            >
              <stop stopColor="#FFC800"></stop>
              <stop stopColor="#F0F" offset="1"></stop>
              <animateTransform
                repeatCount="indefinite"
                keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                keyTimes="0; 0.33; 0.66; 1"
                dur="8s"
                values="0 32 32;-270 32 32;-540 32 32;-810 32 32"
                type="rotate"
                attributeName="gradientTransform"
              ></animateTransform>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="d"
            >
              <stop stopColor="#00E0ED"></stop>
              <stop stopColor="#00DA72" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 64 64"
          height="40"
          width="40"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#b)"
            d="M54.72 3.97a2 2 0 0 0 .22.03h5.01c-1 13.05-10.86 23.68-23.84 25.58a2 2 0 0 0-1.71 1.98V60h-4.82V31.56a2 2 0 0 0-1.71-1.98C14.9 27.68 5.04 17.05 4.05 4h5.23c1.23 11.64 10.98 20.55 22.69 20.73a2 2 0 0 0 0 .01c11.81.04 21.71-9 22.74-20.76z"
            className="dash"
            pathLength="360"
          />
        </svg>
        <svg
          fill="none"
          viewBox="0 0 64 64"
          height="40"
          width="40"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="10"
            stroke="url(#c)"
            d="M32 5a27 27 0 1 1 0 54 27 27 0 1 1 0-54"
            className="spin"
            pathLength="360"
          />
        </svg>
        <svg
          fill="none"
          viewBox="0 0 64 64"
          height="40"
          width="40"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#d)"
            d="M4 4h4.62v25.92c0 11.92 9.84 21.55 21.75 21.3 11.62-.24 21.01-9.64 21.25-21.26V4H56.25v25.92c0 14.34-11.58 25.92-25.92 25.92-14.52 0-26.34-11.64-26.33-25.92z"
            className="dash"
            pathLength="360"
          />
        </svg>
      </div>
    );
  }

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem("ai-chats");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
      }));
      setChats(parsedChats);
    }
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    localStorage.setItem("ai-chats", JSON.stringify(chats));
  }, [chats]);

  // Fetch MCP servers and tools
  useEffect(() => {
    fetchMCPData();
  }, []);

  const fetchMCPData = async () => {
    try {
      const serversRes = await fetch("http://localhost:8000/server-name");
      const serverData = serversRes.ok
        ? await serversRes.json()
        : { server_name: "Unknown" };
      const serverName = serverData.server_name.toLowerCase();

      const toolsRes = await fetch("http://localhost:8000/tools");
      const toolsData = toolsRes.ok ? await toolsRes.json() : { tools: [] };
      const toolNames = toolsData.tools.map((tool) => tool.name);

      // Group tools by server name
      setMcpServers([
        {
          name: serverName,
          connected: true,
          toolCount: toolNames.length,
        },
      ]);

      setTools({ [serverName]: toolNames });
    } catch (error) {
      console.error("Failed to fetch MCP data:", error);
    }
  };

  const handleServerClick = (serverName) => {
    setSelectedServer(selectedServer === serverName ? null : serverName);
  };

  const generateChatTitle = (firstMessage) => {
    return firstMessage.length > 50
      ? firstMessage.substring(0, 50) + "..."
      : firstMessage;
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  const selectChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const updateCurrentChat = (newMessages) => {
    if (!currentChatId) return;

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === currentChatId) {
          const title =
            newMessages.length > 0 && chat.title === "New Chat"
              ? generateChatTitle(newMessages[0].content)
              : chat.title;

          return {
            ...chat,
            title,
            messages: newMessages,
            updatedAt: new Date(),
          };
        }
        return chat;
      })
    );
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!value.trim() || loading) return;

    // Create new chat if none exists
    if (!currentChatId) {
      createNewChat();
    }

    const userMessage = { role: "user", content: value };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    setValue("");
    adjustHeight(true);

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: value }),
      });
      const data = await res.json();
      const botMessage = {
        role: "bot",
        content:
          data.response ||
          "I apologize, but I'm having trouble connecting right now. Please try again.",
      };
      const finalMessages = [...newMessages, botMessage];
      setMessages(finalMessages);
      updateCurrentChat(finalMessages);
    } catch (err) {
      const errorMessage = {
        role: "bot",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again.",
      };
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      updateCurrentChat(finalMessages);
    }

    setLoading(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Update current chat when messages change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      updateCurrentChat(messages);
    }
  }, [messages]);

  const animateTemplateFill = (text) => {
    setIsAnimating(true);
    setAnimatedText(text);
    setValue(""); // Clear the textarea

    setTimeout(() => {
      setValue(text); // Set the real input value
      setIsAnimating(false); // Hide animation layer
      textareaRef?.current?.focus();
    }, 1200);
  };

  const templatePrompts = [
    {
      label: "List My Apps",
      value: "List all my Algolia apps.",
    },
    {
      label: "Show Indices",
      value:
        "List all the indices in my 'e-commerce' application and format them into a table sorted by entries.",
    },
    {
      label: "Index Config",
      value: "Show me the configuration for my 'products' index.",
    },
    {
      label: "No-Results Rate",
      value:
        "What's the no-results rate for my 'products' index in the DE region? Generate a graph",
    },
    {
      label: "Ongoing Incidents",
      value: "Are there any ongoing incidents at Algolia?",
    },

    {
      label: "List A/B Tests",
      value: "SList all A/B tests in my 'e-commerce' application.",
    },
  ];

  // Variants for the container
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1, // time between each button
        delayChildren: 0.3, // delay before starting the stagger
      },
    },
  };

  // Variants for each button
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.2 }}
            className="z-40 h-full w-80 bg-[var(--bg-main)] border-[var(--border)] flex flex-col sm:static fixed left-0 top-0 shadow-lg"
          >
            {/* Sidebar Header with Logo and Name */}
            <div className="p-2 border-b border-[var(--border)] flex justify-between items-center">
              <div className="flex items-center justify-center gap-3 ">
                <div className="">{ALGOLIA_SVG}</div>
                <h1 className="text-md font-semibold text-[var(--text-main)]">
                  Algolia MCP Client
                </h1>
              </div>
              <Button
                onClick={() => setSidebarOpen(false)}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-[var(--text-main)]"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-2  flex justify-center items-center">
              <button
                onClick={createNewChat}
                className="w-full max-w-52 flex items-center gap-3 justify-center cursor-pointer text-[var(--button-text)] bg-[var(--button-bg)] rounded-xl p-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              {chats.length === 0 ? (
                <div className="text-center text-[var(--text-secondary)] mt-8 ">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={cn(
                        "group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors",
                        currentChatId === chat.id
                          ? "bg-gradient-to-r from-[var(--sidebar)] to-transparent text-[var(--text-main)]"
                          : "hover:bg-[var(--bg-secondary)] text-[var(--text-main)]"
                      )}
                      onClick={() => selectChat(chat.id)}
                    >
                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{chat.title}</p>
                        <p className="text-xs text-zinc-500">
                          {chat.updatedAt.toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity group relative flex h-8 w-8 flex-col items-center justify-center overflow-hidden rounded-xl border-2 dark:border-red-900/50 border-red-400 dark:bg-red-800/10 bg-red-300 hover:bg-red-600 dark:hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                      >
                        <svg
                          viewBox="0 0 1 1"
                          className="absolute -top-7 fill-white delay-100 group-hover:top-3 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                          height="8"
                          width="8"
                        >
                          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                        </svg>
                        <svg
                          width="8"
                          fill="none"
                          viewBox="0 0 39 7"
                          className="origin-right duration-500 group-hover:rotate-90"
                        >
                          <line
                            strokeWidth="4"
                            stroke="white"
                            y2="5"
                            x2="39"
                            y1="5"
                          ></line>
                          <line
                            strokeWidth="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                          ></line>
                        </svg>
                        <svg
                          width="8"
                          fill="none"
                          viewBox="0 0 33 39"
                          className=""
                        >
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M12 6L12 29"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M21 6V29"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="">
              <div className=" border-[var(--border)] text-xs text-center text-[var(--text-secondary)] flex flex-row items-center justify-center">
                Made with 💙 by{" "}
                <a
                  href="https://kiran1689.github.io"
                  target="_black"
                  className="ml-1 italic underline"
                >
                  {" "}
                  Kiran
                </a>
              </div>
              <div className="flex justify-center items-center p-2 mx-auto gap-2">
                <ThemeToggle />
                <button className="w-36 group relative bg-[var(--bg-main)] rounded-full p-px overflow-hidden ">
                  {/* Outer gradient blob layer */}
                  <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none select-none">
                    <span
                      className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))",
                      }}
                    ></span>
                  </span>

                  {/* Animated glow layer */}
                  <span
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{
                      animation:
                        "border-glow-translate 10s ease-in-out infinite alternate",
                    }}
                  >
                    <span
                      className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
                      style={{
                        animation:
                          "border-glow-scale 10s ease-in-out infinite alternate",
                        background:
                          "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))",
                      }}
                    ></span>
                  </span>

                  {/* Inner content */}
                  <span className="flex items-center justify-center gap-1 relative z-[1] bg-[var(--bg-main)]  rounded-full py-2 px-4 pl-2 w-full">
                    {/* Icon container with hover transform */}
                    <span className="relative group-hover:scale-105 transition-transform group-hover:rotate-[360deg] duration-500">
                      {/* Star icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-80 dark:opacity-100"
                        style={{
                          animation:
                            "star-rotate 14s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate",
                        }}
                      >
                        <path
                          d="M11.5268 2.29489C11.5706 2.20635 11.6383 2.13183 11.7223 2.07972C11.8062 2.02761 11.903 2 12.0018 2C12.1006 2 12.1974 2.02761 12.2813 2.07972C12.3653 2.13183 12.433 2.20635 12.4768 2.29489L14.7868 6.97389C14.939 7.28186 15.1636 7.5483 15.4414 7.75035C15.7192 7.95239 16.0419 8.08401 16.3818 8.13389L21.5478 8.88989C21.6457 8.90408 21.7376 8.94537 21.8133 9.00909C21.8889 9.07282 21.9452 9.15644 21.9758 9.2505C22.0064 9.34456 22.0101 9.4453 21.9864 9.54133C21.9627 9.63736 21.9126 9.72485 21.8418 9.79389L18.1058 13.4319C17.8594 13.672 17.6751 13.9684 17.5686 14.2955C17.4622 14.6227 17.4369 14.9708 17.4948 15.3099L18.3768 20.4499C18.3941 20.5477 18.3835 20.6485 18.3463 20.7406C18.3091 20.8327 18.2467 20.9125 18.1663 20.9709C18.086 21.0293 17.9908 21.0639 17.8917 21.0708C17.7926 21.0777 17.6935 21.0566 17.6058 21.0099L12.9878 18.5819C12.6835 18.4221 12.345 18.3386 12.0013 18.3386C11.6576 18.3386 11.3191 18.4221 11.0148 18.5819L6.3978 21.0099C6.31013 21.0563 6.2112 21.0772 6.11225 21.0701C6.0133 21.0631 5.91832 21.0285 5.83809 20.9701C5.75787 20.9118 5.69563 20.8321 5.65846 20.7401C5.62128 20.6482 5.61066 20.5476 5.6278 20.4499L6.5088 15.3109C6.567 14.9716 6.54178 14.6233 6.43534 14.2959C6.32889 13.9686 6.14441 13.672 5.8978 13.4319L2.1618 9.79489C2.09039 9.72593 2.03979 9.63829 2.01576 9.54197C1.99173 9.44565 1.99524 9.34451 2.02588 9.25008C2.05652 9.15566 2.11307 9.07174 2.18908 9.00788C2.26509 8.94402 2.3575 8.90279 2.4558 8.88889L7.6208 8.13389C7.96106 8.08439 8.28419 7.95295 8.56238 7.75088C8.84058 7.54881 9.0655 7.28216 9.2178 6.97389L11.5268 2.29489Z"
                          fill="url(#paint0_linear_171_8212)"
                          stroke="url(#paint1_linear_171_8212)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_171_8212"
                            x1="-0.5"
                            y1="9"
                            x2="15.5"
                            y2="-1.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#7A69F9" />
                            <stop offset="0.575" stopColor="#F26378" />
                            <stop offset="1" stopColor="#F5833F" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_171_8212"
                            x1="-0.5"
                            y1="9"
                            x2="15.5"
                            y2="-1.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#7A69F9" />
                            <stop offset="0.575" stopColor="#F26378" />
                            <stop offset="1" stopColor="#F5833F" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Starshine glow */}
                      <span
                        className="rounded-full size-11 absolute opacity-0 dark:opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg"
                        style={{
                          animation:
                            "star-shine 14s ease-in-out infinite alternate",
                          background:
                            "linear-gradient(135deg, rgb(59, 196, 242), rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))",
                        }}
                      ></span>
                    </span>

                    {/* Button label */}
                    <span className="bg-[var(--text-main)] ml-1.5 bg-clip-text text-xs text-transparent group-hover:scale-105 transition-transform">
                      <a href="https://kiran1689.github.io" target="_black">
                        Star on Github
                      </a>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {!sidebarOpen && (
          <Button
            onClick={() => setSidebarOpen(true)}
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 text-gray-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-full flex items-center justify-center mt-10 mb-4 bg-transparent"
              >
                {ALGOLIA_SVG}
              </motion.div>

              <motion.h2
                className="text-4xl font-semibold text-[var(--header)] mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                How can I help you today?
              </motion.h2>

              <motion.p
                className="text-zinc-600 dark:text-gray-400 max-w-xl text-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Start a conversation by typing a message below. I'm here to
                assist with any questions or tasks you have.
              </motion.p>

              <motion.div
                className="flex gap-4 my-4 flex-wrap justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {templatePrompts.map((prompt, idx) => (
                  <motion.div key={idx} variants={buttonVariants}>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full font-normal flex items-center gap-2 px-4 bg-[var(--prompt-bg)] text-[var(--prompt-text)] border-[var(--prompt-border)] hover:border-[var(--prompt-hover)]"
                      size="sm"
                      onClick={() => animateTemplateFill(prompt.value)}
                    >
                      {prompt.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "group flex gap-3 items-start",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium">
                    {msg.role === "user" ? <AnimatedUserIcon /> : CLAUDE_SVG}
                  </div>

                  {/* Message Content */}
                  <div className="flex flex-col max-w-xl">
                    <div className="relative group">
                      <div
                        className={cn(
                          "inline-block p-4 rounded-3xl max-w-full text-left whitespace-pre-wrap break-words overflow-x-auto custom-scrollbar",
                          msg.role === "user"
                            ? "bg-white/80 shadow-md shadow-zinc-200 dark:shadow-none text-zinc-900 self-end"
                            : "bg-[var(--border)] text-[var(--text-primary)] self-start"
                        )}
                      >
                        {msg.role === "bot" ? (
                          <div className="prose prose-invert">
                            {/* Check if message has structured content */}
                            {msg.content &&
                            typeof msg.content === "object" &&
                            Array.isArray(msg.content.content) ? (
                              // Handle structured format
                              <div>
                                {msg.content.content.map((block, index) => {
                                  switch (block.type) {
                                    case "text":
                                      return (
                                        <ReactMarkdown
                                          key={index}
                                          rehypePlugins={[rehypeHighlight]}
                                          remarkPlugins={[remarkGfm]}
                                          components={{
                                            code({
                                              node,
                                              inline,
                                              className,
                                              children,
                                              ...props
                                            }) {
                                              const language =
                                                className?.replace(
                                                  "language-",
                                                  ""
                                                ) || "";
                                              return inline ? (
                                                <span className="text-inherit">
                                                  {children}
                                                </span>
                                              ) : (
                                                <div className="relative">
                                                  <pre className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm rounded-lg overflow-x-auto p-4 custom-scrollbar">
                                                    <code
                                                      className={`language-${language}`}
                                                    >
                                                      {children}
                                                    </code>
                                                  </pre>
                                                  <button
                                                    className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white"
                                                    onClick={() => {
                                                      const text =
                                                        Array.isArray(children)
                                                          ? children.join("")
                                                          : typeof children ===
                                                            "string"
                                                          ? children
                                                          : String(children);

                                                      navigator.clipboard.writeText(
                                                        text
                                                      );
                                                    }}
                                                  >
                                                    Copy
                                                  </button>
                                                </div>
                                              );
                                            },
                                          }}
                                        >
                                          {block.text}
                                        </ReactMarkdown>
                                      );

                                    case "code":
                                      return (
                                        <div
                                          key={index}
                                          className="relative my-4"
                                        >
                                          <pre className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm rounded-lg overflow-x-auto p-4 custom-scrollbar">
                                            <code
                                              className={`language-${block.language}`}
                                            >
                                              {block.code}
                                            </code>
                                          </pre>
                                          <button
                                            className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white"
                                            onClick={() =>
                                              navigator.clipboard.writeText(
                                                block.code
                                              )
                                            }
                                          >
                                            Copy
                                          </button>
                                        </div>
                                      );

                                    case "chart":
                                      return (
                                        <div key={index} className="my-4">
                                          <ChartRenderer
                                            chartType={block.chartType}
                                            data={block.data}
                                            options={block.options}
                                          />
                                        </div>
                                      );

                                    default:
                                      return null;
                                  }
                                })}
                              </div>
                            ) : (
                              // Fallback for old format
                              <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  code({
                                    node,
                                    inline,
                                    className,
                                    children,
                                    ...props
                                  }) {
                                    if (
                                      className === "language-chart" &&
                                      !inline
                                    ) {
                                      try {
                                        const chartData = JSON.parse(
                                          children.trim()
                                        );
                                        return (
                                          <ChartRenderer
                                            chartType={chartData.type}
                                            data={chartData.data}
                                            options={chartData.options}
                                          />
                                        );
                                      } catch (e) {
                                        return (
                                          <pre>Error parsing chart data</pre>
                                        );
                                      }
                                    }
                                    const language =
                                      className?.replace("language-", "") || "";
                                    return inline ? (
                                      <span className="text-inherit">
                                        {children}
                                      </span>
                                    ) : (
                                      <div className="relative">
                                        <pre className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm rounded-lg overflow-x-auto p-4 custom-scrollbar">
                                          <code
                                            className={`language-${language}`}
                                          >
                                            {children}
                                          </code>
                                        </pre>
                                        <button
                                          className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white"
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              children
                                            )
                                          }
                                        >
                                          Copy
                                        </button>
                                      </div>
                                    );
                                  },
                                }}
                              >
                                {typeof msg.content === "string"
                                  ? msg.content
                                  : JSON.stringify(msg.content)}
                              </ReactMarkdown>
                            )}
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}
                      </div>

                      {/* Copy Button for Bot Message */}
                      {msg.role === "bot" && (
                        <div className="flex justify-end mt-1">
                          <button
                            onClick={() => {
                              const toCopy =
                                typeof msg.content === "object"
                                  ? JSON.stringify(msg.content.content, null, 2)
                                  : msg.content;
                              navigator.clipboard.writeText(toCopy);
                              setCopiedId(idx);
                              setTimeout(() => setCopiedId(null), 1500);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                          >
                            {copiedId === idx ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                    {CLAUDE_SVG}
                  </div>
                  <div className="flex">
                    <div className="inline-block pt-1 rounded-2xl">
                      <ShimmerText text="Thinking..." />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[var(--border)] p-6 rounded-t-3xl bg-[var(--input-bg)]">
          <div className="max-w-4xl mx-auto">
            {/*
            <div className="relative bg-zinc-800 rounded-2xl border border-zinc-700 shadow-lg">
                */}
            <div
              className={cn(
                "bg-white dark:zinc-800 rounded-2xl w-full p-1.5 animate-border shadow-zinc-300",
                "[background:linear-gradient(45deg,#fff,#fff)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]",
                "dark:[background:linear-gradient(45deg,#030303,#030303)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.200/.48))_border-box]",
                "border border-transparent"
              )}
            >
              <div
                className={cn(
                  "w-full p-5 rounded-xl relative",
                  "bg-gradient-to-tl to-transparent from-zinc-100 dark:from-white/[0.08]",
                  "backdrop-blur-md backdrop-saturate-150",
                  "border border-[var(--barder)] dark:border-white/[0.08]",
                  "text-zinc-900 dark:text-white",
                  "shadow-xs",
                  "will-change-transform translate-z-0",
                  "before:absolute before:inset-0 before:bg-linear-to-br before:from-white/[0.03] before:to-white/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none",
                  "hover:before:opacity-100"
                )}
              >
                {/* Textarea */}
                <div className="relative w-full">
                  <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      adjustHeight();
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className={cn(
                      "w-full border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
                      "px-4 py-4 pr-32 text-zinc-900 dark:text-white placeholder:opacity-0",
                      "min-h-[56px] max-h-[200px]"
                    )}
                    style={{ minHeight: "56px" }}
                    placeholder="Ask me anything..."
                  />

                  {value === "" && !loading && !isAnimating && (
                    <div className="pointer-events-none absolute left-4 top-4 text-[var(--text-secondary)] text-sm sm:text-xs">
                      <TextAnimate animation="blurIn" as="span">
                        Ask me anything...
                      </TextAnimate>
                    </div>
                  )}

                  {isAnimating && (
                    <div className="pointer-events-none absolute left-4 top-4 text-[var(--text-secondary)] text-sm sm:text-xs">
                      <TextAnimate animation="slideLeft" by="character">
                        {animatedText}
                      </TextAnimate>
                    </div>
                  )}
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Model Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-xs text-[var(--text-primary)] dark:text-zinc-100 hover:text-white hover:bg-[var(--text-secondary)] rounded-lg border border-[var(--border)]"
                        >
                          <div className="flex items-center gap-2 mr-1">
                            {MODEL_ICONS[selectedModel]}
                            <span className="hidden sm:inline">
                              {selectedModel}
                            </span>
                          </div>
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-48 bg-gradient-to-b from-[var(--bg-main)] to-[var(--border)] border-[var(--border)]"
                      >
                        {AI_MODELS.map((model) => (
                          <DropdownMenuItem
                            key={model}
                            onSelect={() => setSelectedModel(model)}
                            className="flex items-center justify-between text-[var(--text-main)] hover:bg-[var(--border)] rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              {MODEL_ICONS[model]}
                              <span>{model}</span>
                            </div>
                            {selectedModel === model && (
                              <Check className="w-4 h-4 text-green-400" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* File Upload */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-[var(--text-primary)] dark:text-zinc-100 hover:text-white hover:bg-[var(--text-secondary)] rounded-lg border border-[var(--border)]"
                      asChild
                    >
                      <label>
                        <input type="file" className="hidden" />
                        <Paperclip className="w-4 h-4" />
                      </label>
                    </Button>

                    {/* Tools Dropdown */}
                    <DropdownMenu
                      open={toolsOpen}
                      onOpenChange={(open) => {
                        setToolsOpen(open);
                        if (!open) {
                          setSelectedServer(null);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[var(--text-primary)] dark:text-zinc-100 hover:text-white hover:bg-[var(--text-secondary)] rounded-lg border border-[var(--border)]"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="flex bg-gradient-to-b from-[var(--bg-main)] to-[var(--border)] border-[var(--border)] p-0 "
                      >
                        {/* MCP Servers Panel */}
                        <div className="w-64 border-r dark:border-zinc-700">
                          <div className="px-3 py-2 text-xs font-medium text-[var(--text-main)] booder-[var(--border)]">
                            MCP SERVERS
                          </div>
                          {mcpServers.map((server) => (
                            <DropdownMenuItem
                              key={server.name}
                              className={cn(
                                "flex items-center justify-between text-[var(--text-main)] hover:bg-[var(--border)] cursor-pointer",
                                selectedServer === server.name &&
                                  "bg-[var(--border)]"
                              )}
                              onSelect={(e) => {
                                e.preventDefault();
                                handleServerClick(server.name);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>{server.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">
                                  {server.toolCount}
                                </span>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 transition-transform",
                                    selectedServer === server.name
                                      ? "rotate-[-90deg]"
                                      : "rotate-[-90deg]"
                                  )}
                                />
                              </div>
                            </DropdownMenuItem>
                          ))}
                          <div className="border-t border-gray-700 mt-1">
                            <DropdownMenuItem className="text-[var(--text-main)] hover:bg-[var(--border)]">
                              <Plus className="w-4 h-4 mr-2" />
                              Add MCP Server
                              <span className="ml-auto text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">
                                Coming Soon
                              </span>
                            </DropdownMenuItem>
                            {/*}
                          <DropdownMenuItem className="text-gray-300 hover:bg-zinc-700">
                            <svg
                              className="w-4 h-4 mr-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                            Manage connectors
                          </DropdownMenuItem>
                          */}
                          </div>
                        </div>

                        {/* Tools Panel - Only show when a server is selected */}
                        {selectedServer && tools[selectedServer] && (
                          <div className="w-64">
                            <div className="px-3 py-2 text-xs font-medium text-[var(--text-main)] hover:bg-[var(--border)]">
                              {selectedServer.toUpperCase()} TOOLS
                            </div>
                            <div className="max-h-64 overflow-y-auto custom-scrollbar">
                              {tools[selectedServer].map((tool) => (
                                <DropdownMenuItem
                                  key={tool}
                                  className="flex items-center gap-2 text-[var(--text-main)] hover:bg-[var(--border)]"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <span className="text-xs font-mono bg-[var(--border)] px-1.5 py-0.5 rounded">
                                    {tool.charAt(0).toUpperCase()}
                                  </span>
                                  <span>{tool}</span>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Send Button */}

                  {/*
                <Button
                  onClick={sendMessage}
                  disabled={!value.trim() || loading}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg transition-all",
                    value.trim() && !loading
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" />
                </Button>
                */}

                  <button
                    disabled={!value.trim() || loading}
                    onClick={sendMessage}
                    className={`
                relative p-2 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center justify-center
                ${
                  value.trim() && !loading
                    ? "[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white"
                    : "bg-indigo-500/50 text-indigo-200"
                }
                ${
                  value.trim() && !loading
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500/30
              `}
                  >
                    <>
                      <svg viewBox="0 0 512 512" className="h-5 w-5 mr-1.5">
                        <path
                          fill="currentColor"
                          d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"
                        ></path>
                      </svg>
                    </>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center mt-3">
              Claude can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const OPENAI_SVG = (
  <svg
    height="1em"
    style={{ flex: "none", lineHeight: "1" }}
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>OpenAI</title>
    <path
      d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"
      fill="#fff"
      fillRule="nonzero"
    ></path>
  </svg>
);
const CLAUDE_SVG = (
  <motion.svg
    height="2em"
    width="2em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#D97757"
    fillRule="nonzero"
    animate={{ fill: ["#D97757", "#fff", "#D97757"] }}
    transition={{ duration: 3, repeat: Infinity }}
    style={{ flex: "none", lineHeight: "1" }}
  >
    <title>Claude</title>
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
  </motion.svg>
);

const ALGOLIA_SVG = (
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M124.997 0C56.683 0 .997 55.037.013 123.075-.99 192.166 55.11 249.424 124.26 249.817c21.362.128 41.927-5.091 60.191-15.017 1.78-.963 2.055-3.411.541-4.757l-11.694-10.359c-2.38-2.103-5.764-2.702-8.685-1.454-12.746 5.425-26.603 8.186-40.884 8.019-55.873-.688-101.025-47.144-100.13-102.977.875-55.125 46.028-99.705 101.399-99.705h101.419v180.127l-57.535-51.085c-1.859-1.652-4.711-1.327-6.216.658-9.235 12.216-24.283 19.823-40.992 18.663-23.182-1.602-41.966-20.245-43.697-43.4-2.076-27.617 19.827-50.752 47.031-50.752 24.607 0 44.867 18.93 46.981 42.978.187 2.143 1.151 4.138 2.764 5.563l14.989 13.277c1.701 1.504 4.396.58 4.819-1.651a71.016 71.016 0 0 0 1.033-17.955c-2.41-35.165-30.922-63.46-66.131-65.632-40.363-2.486-74.117 29.072-75.189 68.629-1.043 38.545 30.557 71.774 69.14 72.629 16.11.353 31.03-4.708 43.098-13.474l75.178 66.594c3.226 2.85 8.311.57 8.311-3.735V4.737A4.741 4.741 0 0 0 245.259 0H124.997Z"
      fill="#003DFF"
    />
  </svg>
);