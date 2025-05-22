import { useState } from "react";
import type { Message, GitRepoInfo, AgentStatus } from "./types";
import { MessageItem } from "./MessageItem";
import { FiGitBranch, FiGitCommit, FiAlertCircle, FiCheck, FiX, FiStopCircle } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

interface MessageFeedProps {
  messages: Message[];
  darkMode?: boolean;
  gitInfo?: GitRepoInfo;
  agentStatus?: AgentStatus;
  previewOpen?: boolean;
}

export const MessageFeed = ({ 
  messages, 
  darkMode = false, 
  gitInfo = { name: "ai-message-feed", branch: "main", status: "clean", lastCommit: "a1b2c3d" },
  agentStatus = { status: "online" },
  previewOpen = false
}: MessageFeedProps) => {
  const [showGitInfo, setShowGitInfo] = useState(true);

  const getAgentStatusIcon = () => {
    switch (agentStatus.status) {
      case "online": return <FiCheck className="text-green-500" />;
      case "offline": return <FiX className="text-red-500" />;
      case "busy": return <CgSpinner className="text-yellow-500 animate-spin" />;
      case "error": return <FiAlertCircle className="text-red-500" />;
      default: return null;
    }
  };

  const getGitStatusColor = () => {
    switch (gitInfo.status) {
      case "clean": return darkMode ? "text-green-400" : "text-green-600";
      case "modified": return darkMode ? "text-yellow-400" : "text-yellow-600";
      case "untracked": return darkMode ? "text-red-400" : "text-red-600";
      default: return darkMode ? "text-gray-400" : "text-gray-600";
    }
  };

  return (
    <div className={`${previewOpen ? 'w-full' : 'max-w-3xl mx-auto'} transition-all duration-300`}>
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-200`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${darkMode ? 'bg-green-400' : 'bg-green-500'} animate-pulse`}></span>
            AI Assistant Feed
          </h2>
          <div className={`px-2.5 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full text-xs font-medium shadow-sm transition-colors duration-200`}>
            {messages.length} messages
          </div>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} darkMode={darkMode} />
          ))}
        </div>
        
        {/* Git Info and Agent Status */}
        <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Git Repository Info */}
            <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <button 
                onClick={() => setShowGitInfo(!showGitInfo)}
                className={`flex items-center gap-1 px-2 py-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <FiGitBranch className={getGitStatusColor()} />
                <span className="font-medium">{gitInfo.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  {gitInfo.branch}
                </span>
              </button>
              
              {showGitInfo && (
                <>
                  <div className="flex items-center gap-1">
                    <FiGitCommit className={darkMode ? 'text-gray-500' : 'text-gray-500'} />
                    <span className="font-mono">{gitInfo.lastCommit?.substring(0, 7)}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    gitInfo.status === 'clean' 
                      ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      : gitInfo.status === 'modified'
                        ? darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                        : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                  }`}>
                    {gitInfo.status}
                  </span>
                </>
              )}
            </div>
            
            {/* Agent Status and Stop Button */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                agentStatus.status === 'online'
                  ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                  : agentStatus.status === 'busy'
                    ? darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                    : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
              }`}>
                {getAgentStatusIcon()}
                <span>{agentStatus.status}</span>
                {agentStatus.message && <span className="ml-1 opacity-80">- {agentStatus.message}</span>}
              </div>
              
              <button 
                className={`p-1.5 rounded-full ${
                  darkMode 
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-800/50' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                title="Stop all processes"
              >
                <FiStopCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};