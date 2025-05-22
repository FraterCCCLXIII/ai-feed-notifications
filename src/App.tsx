import { useState, useEffect } from "react";
import { MessageFeed } from "./components/MessageFeed";
import InteractionPatterns from "./components/InteractionPatterns";
import { sampleMessages } from "./data/messages";
import { FiCpu, FiMoon, FiSun, FiMessageSquare, FiList } from 'react-icons/fi';

type TabType = 'messages' | 'patterns';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('messages');

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-gray-100'} transition-colors duration-200`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm py-4 mb-8 transition-colors duration-200`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center">
          <div className={`flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`}>
            <FiCpu className="text-2xl" />
          </div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>AI Assistant Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'messages'
                ? `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare />
            <span>Message Feed</span>
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'patterns'
                ? `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
            onClick={() => setActiveTab('patterns')}
          >
            <FiList />
            <span>Interaction Patterns</span>
          </button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'messages' ? (
          <MessageFeed messages={sampleMessages} darkMode={darkMode} />
        ) : (
          <InteractionPatterns />
        )}
      </main>
      
      <footer className={`mt-12 py-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>AI Assistant Message Feed Demo © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
