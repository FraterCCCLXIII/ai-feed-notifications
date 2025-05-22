import React, { useState } from 'react';
import { FiAlertTriangle, FiX, FiGitBranch, FiGitPullRequest, FiGitMerge, FiGitCommit, FiMoreHorizontal, FiRefreshCw } from 'react-icons/fi';

export type AlertType = 'error' | 'warning' | 'info' | 'success';

export interface AlertNotificationProps {
  type: AlertType;
  message: string;
  details?: string;
  darkMode?: boolean;
  onClose?: () => void;
  showGitControls?: boolean;
}

export const AlertNotification: React.FC<AlertNotificationProps> = ({
  type,
  message,
  details,
  darkMode = false,
  onClose,
  showGitControls = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreGitControls, setShowMoreGitControls] = useState(false);

  // Determine background color based on type and dark mode
  const getBgColor = () => {
    if (darkMode) {
      switch (type) {
        case 'error': return 'bg-red-900';
        case 'warning': return 'bg-yellow-900';
        case 'info': return 'bg-blue-900';
        case 'success': return 'bg-green-900';
        default: return 'bg-gray-800';
      }
    } else {
      switch (type) {
        case 'error': return 'bg-red-100';
        case 'warning': return 'bg-yellow-100';
        case 'info': return 'bg-blue-100';
        case 'success': return 'bg-green-100';
        default: return 'bg-gray-100';
      }
    }
  };

  // Determine text color based on type and dark mode
  const getTextColor = () => {
    if (darkMode) {
      switch (type) {
        case 'error': return 'text-red-200';
        case 'warning': return 'text-yellow-200';
        case 'info': return 'text-blue-200';
        case 'success': return 'text-green-200';
        default: return 'text-gray-200';
      }
    } else {
      switch (type) {
        case 'error': return 'text-red-800';
        case 'warning': return 'text-yellow-800';
        case 'info': return 'text-blue-800';
        case 'success': return 'text-green-800';
        default: return 'text-gray-800';
      }
    }
  };

  // Determine icon color based on type and dark mode
  const getIconColor = () => {
    if (darkMode) {
      switch (type) {
        case 'error': return 'text-red-300';
        case 'warning': return 'text-yellow-300';
        case 'info': return 'text-blue-300';
        case 'success': return 'text-green-300';
        default: return 'text-gray-300';
      }
    } else {
      switch (type) {
        case 'error': return 'text-red-500';
        case 'warning': return 'text-yellow-500';
        case 'info': return 'text-blue-500';
        case 'success': return 'text-green-500';
        default: return 'text-gray-500';
      }
    }
  };

  // Git control buttons
  const gitControls = [
    { icon: <FiGitPullRequest />, label: 'Pull', action: () => console.log('Pull') },
    { icon: <FiGitCommit />, label: 'Push', action: () => console.log('Push') },
    { icon: <FiGitBranch />, label: 'Branch', action: () => console.log('Branch') },
    { icon: <FiRefreshCw />, label: 'Fetch', action: () => console.log('Fetch') },
  ];

  const moreGitControls = [
    { icon: <FiGitMerge />, label: 'Merge', action: () => console.log('Merge') },
    { icon: <FiGitBranch />, label: 'Checkout', action: () => console.log('Checkout') },
    { icon: <FiGitCommit />, label: 'Commit', action: () => console.log('Commit') },
    { icon: <FiGitBranch />, label: 'Stash', action: () => console.log('Stash') },
  ];

  return (
    <div 
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${getBgColor()}`}
      style={{ maxWidth: 'calc(100% - 2rem)' }}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={`mr-3 flex-shrink-0 ${getIconColor()}`}>
            <FiAlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${getTextColor()}`}>{message}</h3>
            
            {details && (
              <div className="mt-1">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className={`text-xs underline ${getTextColor()} opacity-80 hover:opacity-100`}
                >
                  {showDetails ? 'Hide details' : 'Show details'}
                </button>
                
                {showDetails && (
                  <p className={`mt-2 text-xs ${getTextColor()} opacity-90 whitespace-pre-wrap`}>
                    {details}
                  </p>
                )}
              </div>
            )}

            {/* Git Controls */}
            {showGitControls && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {gitControls.map((control, index) => (
                  <button
                    key={index}
                    onClick={control.action}
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded
                      ${darkMode 
                        ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="mr-1">{control.icon}</span>
                    {control.label}
                  </button>
                ))}
                
                <div className="relative">
                  <button
                    onClick={() => setShowMoreGitControls(!showMoreGitControls)}
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded
                      ${darkMode 
                        ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiMoreHorizontal />
                  </button>
                  
                  {showMoreGitControls && (
                    <div className={`absolute bottom-full right-0 mb-1 p-1 rounded shadow-lg 
                      ${darkMode ? 'bg-gray-800' : 'bg-white'} z-10`}>
                      <div className="flex flex-col gap-1">
                        {moreGitControls.map((control, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              control.action();
                              setShowMoreGitControls(false);
                            }}
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded whitespace-nowrap
                              ${darkMode 
                                ? 'text-gray-200 hover:bg-gray-700' 
                                : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            <span className="mr-1">{control.icon}</span>
                            {control.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {onClose && (
            <button 
              onClick={onClose}
              className={`ml-3 flex-shrink-0 ${getTextColor()} opacity-70 hover:opacity-100`}
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};