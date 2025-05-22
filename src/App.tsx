import { useState, useEffect } from "react";
import { MessageFeed } from "./components/MessageFeed";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { sampleMessages } from "./data/messages";
import { FiCpu, FiMoon, FiSun, FiMessageSquare, FiLayout } from "react-icons/fi";
import type { GitRepoInfo, AgentStatus } from "./components/types";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"feed" | "interactive">("feed");
  const [gitInfo, setGitInfo] = useState<GitRepoInfo>({
    name: "ai-message-feed",
    branch: "interactive-demo",
    status: "modified",
    lastCommit: "a1b2c3d"
  });
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    status: "online",
    message: "Ready"
  });

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-b from-gray-50 to-gray-100"} transition-colors duration-200`}>
      <header className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm py-4 transition-colors duration-200`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center">
          <div className={`flex items-center ${darkMode ? "text-blue-400" : "text-blue-600"} mr-3`}>
            <FiCpu className="text-2xl" />
          </div>
          <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>AI Assistant Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"} transition-colors duration-200`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("feed")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                ${activeTab === "feed"
                  ? darkMode
                    ? "border-blue-500 text-blue-400"
                    : "border-blue-600 text-blue-600"
                  : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <FiMessageSquare />
              Message Feed
            </button>
            <button
              onClick={() => setActiveTab("interactive")}
              className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                ${activeTab === "interactive"
                  ? darkMode
                    ? "border-blue-500 text-blue-400"
                    : "border-blue-600 text-blue-600"
                  : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <FiLayout />
              Interactive Demo
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      {activeTab === "feed" ? (
        <main className="container mx-auto px-4 py-6">
          <MessageFeed 
            messages={sampleMessages} 
            darkMode={darkMode} 
            gitInfo={gitInfo}
            agentStatus={agentStatus}
          />
        </main>
      ) : (
        <div className="h-[calc(100vh-8.5rem)]">
          <InteractiveDemo 
            messages={sampleMessages} 
            darkMode={darkMode} 
            gitInfo={gitInfo}
            agentStatus={agentStatus}
          />
        </div>
      )}
      
      {/* Footer - only show on feed tab */}
      {activeTab === "feed" && (
        <footer className={`mt-12 py-6 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <p>AI Assistant Message Feed Demo © {new Date().getFullYear()}</p>
        </footer>
      )}
    </div>
  );
}

export default App;
