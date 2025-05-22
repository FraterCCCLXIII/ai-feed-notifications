import React, { useState } from 'react';
import { interactionPatterns, patternsByCategory } from '../data/interaction-patterns';
import InteractionDemo from './InteractionDemo';
import { FiChevronDown, FiChevronRight, FiFilter, FiPlay, FiList } from 'react-icons/fi';

export const InteractionPatterns: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(patternsByCategory).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'demo'>('list');
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Update darkMode when document class changes
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredPatterns = interactionPatterns.filter(pattern => {
    const matchesSearch = searchTerm === '' || 
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.example.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || pattern.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredCategories = [...new Set(filteredPatterns.map(p => p.category))];

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className={`inline-flex rounded-md shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center gap-2 ${
              activeView === 'list'
                ? `${darkMode ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white'}`
                : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`
            }`}
            onClick={() => setActiveView('list')}
          >
            <FiList />
            <span>Pattern List</span>
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center gap-2 ${
              activeView === 'demo'
                ? `${darkMode ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white'}`
                : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`
            }`}
            onClick={() => setActiveView('demo')}
          >
            <FiPlay />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>

      {activeView === 'demo' ? (
        <InteractionDemo darkMode={darkMode} />
      ) : (
        <div className={`max-w-4xl mx-auto p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>AI Interaction Patterns</h2>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search patterns..."
                className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            
            <div className="relative">
              <select
                className={`appearance-none px-4 py-2 pr-8 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {Object.keys(patternsByCategory).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                <FiFilter />
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCategories.map(category => (
              <div key={category} className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
                <div 
                  className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer`}
                  onClick={() => toggleCategory(category)}
                >
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{category}</h3>
                  <span>
                    {expandedCategories[category] ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                </div>
                
                {expandedCategories[category] && (
                  <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredPatterns
                      .filter(pattern => pattern.category === category)
                      .map(pattern => (
                        <div key={pattern.id} className={`p-4 ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}>
                          <h4 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{pattern.title}</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{pattern.description}</p>
                          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {pattern.example}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredPatterns.length === 0 && (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No patterns found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractionPatterns;