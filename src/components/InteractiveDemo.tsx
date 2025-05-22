import { useState, useRef, useEffect } from 'react';
import type { Message, GitRepoInfo, AgentStatus } from './types';
import { MessageItem } from './MessageItem';
import { FiSend, FiMaximize2, FiMinimize2, FiCode, FiTerminal, FiGlobe, FiGitBranch, FiGitCommit, FiAlertCircle, FiCheck, FiX, FiStopCircle } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';

interface InteractiveDemoProps {
  messages: Message[];
  darkMode?: boolean;
  gitInfo?: GitRepoInfo;
  agentStatus?: AgentStatus;
}

export const InteractiveDemo = ({ 
  messages, 
  darkMode = false,
  gitInfo = { name: "ai-message-feed", branch: "interactive-demo", status: "modified", lastCommit: "a1b2c3d" },
  agentStatus = { status: "busy", message: "Processing request..." }
}: InteractiveDemoProps) => {
  const [userInput, setUserInput] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'code' | 'terminal' | 'browser'>('code');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      // In a real app, this would send the message to an API
      console.log('User input:', userInput);
      setUserInput('');
    }
  };

  const toggleExpand = (id: string, type: 'code' | 'terminal' | 'browser') => {
    if (expandedMessageId === id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(id);
      setPreviewType(type);
    }
  };

  // Determine if a message has expandable content
  const hasExpandableContent = (message: Message): 'code' | 'terminal' | 'browser' | null => {
    if (message.code) return 'code';
    if (message.type === 'build' || message.type === 'system') return 'terminal';
    if (message.type === 'bug' || message.type === 'dependency') return 'browser';
    return null;
  };

  // Render preview content based on type
  const renderPreviewContent = () => {
    const expandedMessage = messages.find(m => m.id === expandedMessageId);
    if (!expandedMessage) return null;

    switch (previewType) {
      case 'code':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                <FiCode className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Code Preview</span>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  onClick={() => setExpandedMessageId(null)}
                >
                  <FiMinimize2 className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <pre className={`p-4 h-full m-0 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-800 text-gray-100'} font-mono text-sm overflow-auto`}>
                <code>{expandedMessage.code}</code>
              </pre>
            </div>
          </div>
        );
      
      case 'terminal':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                <FiTerminal className={darkMode ? 'text-green-400' : 'text-green-600'} />
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Terminal</span>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  onClick={() => setExpandedMessageId(null)}
                >
                  <FiMinimize2 className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
            <div className={`flex-1 p-4 font-mono text-sm overflow-auto ${darkMode ? 'bg-black text-green-400' : 'bg-black text-green-500'}`}>
              <div className="whitespace-pre-line">
                $ {expandedMessage.content}
                {expandedMessage.code && (
                  <>
                    <br /><br />
                    {expandedMessage.code}
                  </>
                )}
                <div className="animate-pulse mt-2">_</div>
              </div>
            </div>
          </div>
        );
      
      case 'browser':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                <FiGlobe className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Browser Preview</span>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  onClick={() => setExpandedMessageId(null)}
                >
                  <FiMinimize2 className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
            <div className={`flex-1 ${darkMode ? 'bg-white' : 'bg-white'} overflow-auto`}>
              <div className="p-4 flex items-center justify-center h-full">
                <div className="text-center">
                  <FiGlobe className={`text-6xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Browser preview for: {expandedMessage.content}
                  </p>
                  {expandedMessage.code && (
                    <pre className="mt-4 p-3 bg-gray-100 text-gray-800 rounded text-sm overflow-auto text-left">
                      <code>{expandedMessage.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-3 border-b ${darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'} flex justify-between items-center`}>
        <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${darkMode ? 'bg-green-400' : 'bg-green-500'} animate-pulse`}></span>
          All Hands Sandbox
        </h1>
        <div className={`px-2 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full text-xs font-medium`}>
          {messages.length} messages
        </div>
      </div>

      {/* Main content area with conditional layout */}
      <div className={`flex-1 flex ${expandedMessageId ? 'overflow-hidden' : 'overflow-auto'}`}>
        {/* Messages container - shrinks when preview is open */}
        <div 
          className={`${expandedMessageId ? 'w-2/5' : 'w-full'} transition-all duration-300 ease-in-out flex flex-col overflow-auto`}
        >
          <div className="flex-1 p-3 overflow-auto">
            <div className="space-y-3 pb-4">
              {messages.map((message) => {
                const expandableType = hasExpandableContent(message);
                return (
                  <div key={message.id} className="relative group">
                    <MessageItem message={message} darkMode={darkMode} />
                    {expandableType && (
                      <button 
                        onClick={() => toggleExpand(message.id, expandableType)}
                        className={`absolute top-1/2 -right-3 transform -translate-y-1/2 p-1.5 rounded-full shadow-md 
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} 
                          ${expandedMessageId === message.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                          transition-opacity duration-200`}
                        aria-label="Expand preview"
                      >
                        <FiMaximize2 className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area - sticky to bottom */}
          <div className={`p-3 border-t ${darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 p-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                type="submit"
                disabled={!userInput.trim()}
                className={`p-2.5 rounded-lg ${
                  userInput.trim()
                    ? darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiSend size={18} />
              </button>
            </form>
            
            {/* Git Info and Agent Status */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              {/* Git Repository Info */}
              <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FiGitBranch className={
                    gitInfo.status === 'clean' 
                      ? darkMode ? 'text-green-400' : 'text-green-600'
                      : gitInfo.status === 'modified'
                        ? darkMode ? 'text-yellow-400' : 'text-yellow-600'
                        : darkMode ? 'text-red-400' : 'text-red-600'
                  } />
                  <span className="font-medium">{gitInfo.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    {gitInfo.branch}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <FiGitCommit className={darkMode ? 'text-gray-500' : 'text-gray-500'} />
                  <span className="font-mono">{gitInfo.lastCommit?.substring(0, 7)}</span>
                </div>
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
                  {agentStatus.status === 'online' && <FiCheck size={12} />}
                  {agentStatus.status === 'offline' && <FiX size={12} />}
                  {agentStatus.status === 'busy' && <CgSpinner className="animate-spin" size={12} />}
                  {agentStatus.status === 'error' && <FiAlertCircle size={12} />}
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

        {/* Preview panel - slides in from right */}
        {expandedMessageId && (
          <div 
            className={`w-3/5 border-l ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition-all duration-300 ease-in-out`}
          >
            {renderPreviewContent()}
          </div>
        )}
      </div>
    </div>
  );
};