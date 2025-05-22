import { useState } from 'react';
import type { GitRepoInfo, GitAction } from './types';
import { 
  FiGitCommit, 
  FiGitPullRequest, 
  FiGitBranch, 
  FiUpload, 
  FiDownload, 
  FiMoreHorizontal,
  FiRefreshCw,
  FiPlus,
  FiCode
} from 'react-icons/fi';

interface GitControlsProps {
  gitInfo: GitRepoInfo;
  darkMode?: boolean;
  onAction?: (action: string) => void;
}

export const GitControls = ({ gitInfo, darkMode = false, onAction }: GitControlsProps) => {
  const [showMore, setShowMore] = useState(false);

  const primaryActions: GitAction[] = [
    { label: 'Pull', icon: 'FiDownload', handler: () => onAction?.('pull') },
    { label: 'Push', icon: 'FiUpload', handler: () => onAction?.('push') },
    { label: 'Branch', icon: 'FiGitBranch', handler: () => onAction?.('branch') },
  ];

  const secondaryActions: GitAction[] = [
    { label: 'Fetch', icon: 'FiRefreshCw', handler: () => onAction?.('fetch') },
    { label: 'New PR', icon: 'FiGitPullRequest', handler: () => onAction?.('pr') },
    { label: 'Commit', icon: 'FiGitCommit', handler: () => onAction?.('commit') },
    { label: 'Add Remote', icon: 'FiPlus', handler: () => onAction?.('remote') },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FiGitCommit': return <FiGitCommit size={14} />;
      case 'FiGitPullRequest': return <FiGitPullRequest size={14} />;
      case 'FiGitBranch': return <FiGitBranch size={14} />;
      case 'FiUpload': return <FiUpload size={14} />;
      case 'FiDownload': return <FiDownload size={14} />;
      case 'FiRefreshCw': return <FiRefreshCw size={14} />;
      case 'FiPlus': return <FiPlus size={14} />;
      case 'FiCode': return <FiCode size={14} />;
      default: return <FiGitBranch size={14} />;
    }
  };

  return (
    <div className={`flex items-center justify-between w-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {/* Repository info */}
      <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <FiCode size={12} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
        <span className="font-medium">{gitInfo.name}</span>
        <span className="mx-1">•</span>
        <FiGitBranch size={12} />
        <span>{gitInfo.branch}</span>
        {gitInfo.status && (
          <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
            gitInfo.status === 'clean' 
              ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
              : gitInfo.status === 'modified'
                ? darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                : darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}>
            {gitInfo.status}
          </span>
        )}
      </div>
      
      {/* Git actions */}
      <div className="flex items-center gap-1.5">
        {primaryActions.map((action, index) => (
          <button
            key={index}
            onClick={action.handler}
            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 
              ${darkMode 
                ? 'hover:bg-gray-700 focus:bg-gray-700' 
                : 'hover:bg-gray-200 focus:bg-gray-200'
              } transition-colors`}
            title={action.label}
          >
            {action.icon && getIcon(action.icon)}
            <span className="hidden sm:inline">{action.label}</span>
          </button>
        ))}
        
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`px-2 py-1 rounded-md text-xs flex items-center 
              ${darkMode 
                ? 'hover:bg-gray-700 focus:bg-gray-700' 
                : 'hover:bg-gray-200 focus:bg-gray-200'
              } transition-colors`}
            title="More Git Actions"
          >
            <FiMoreHorizontal size={14} />
          </button>
          
          {showMore && (
            <div 
              className={`absolute bottom-full right-0 mb-1 p-1 rounded-md shadow-lg z-10 
                ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
            >
              {secondaryActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.handler?.();
                    setShowMore(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-2 w-full text-left
                    ${darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                    }`}
                >
                  {action.icon && getIcon(action.icon)}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};