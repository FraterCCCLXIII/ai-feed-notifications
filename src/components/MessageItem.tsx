import type { Message } from "./types";
import { FiTerminal, FiAlertCircle, FiGitMerge, FiShield, FiZap, FiCode, FiBook, FiCpu, FiSend, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { FaBug } from 'react-icons/fa';
import { FaNodeJs } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

interface MessageItemProps {
  message: Message;
  darkMode?: boolean;
}

export const MessageItem = ({ message, darkMode = false }: MessageItemProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get icon based on message type
  const getIcon = (type: string, status?: string) => {
    // For notification type, use status to determine icon
    if (type === 'notification' && status) {
      switch (status) {
        case 'success': return <FiCheck className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />;
        case 'failure': return <FiX className={`${darkMode ? 'text-red-400' : 'text-red-600'}`} />;
        case 'warning': return <FiAlertCircle className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
        case 'info': return <FiInfo className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />;
        case 'in_progress': return <CgSpinner className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} animate-spin`} />;
        case 'completed': return <FiCheck className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />;
        default: return <FiSend className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />;
      }
    }
    
    // For other types
    switch (type) {
      case 'system': return <FiCpu className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />;
      case 'code': return <FiCode className={`${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />;
      case 'build': return <FiTerminal className={`${darkMode ? 'text-green-400' : 'text-green-500'}`} />;
      case 'git': return <FiGitMerge className={`${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />;
      case 'bug': return <FaBug className={`${darkMode ? 'text-red-400' : 'text-red-500'}`} />;
      case 'dependency': return <FaNodeJs className={`${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />;
      case 'test': return <FiZap className={`${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />;
      case 'docs': return <FiBook className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />;
      case 'security': return <FiShield className={`${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />;
      case 'performance': return <FiZap className={`${darkMode ? 'text-teal-400' : 'text-teal-500'}`} />;
      case 'api': return <FiSend className={`${darkMode ? 'text-blue-300' : 'text-blue-400'}`} />;
      case 'prompt': return <FiSend className={`${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />;
      case 'error': return <FiAlertCircle className={`${darkMode ? 'text-red-400' : 'text-red-600'}`} />;
      case 'notification': return <FiSend className={`${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />;
      default: return <FiCpu className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />;
    }
  };

  // Define background and border colors based on message type
  const getCardStyles = () => {
    // For notification type, use status to determine styling
    if (message.type === 'notification' && message.status) {
      if (darkMode) {
        switch (message.status) {
          case 'success': return 'border-green-800 bg-green-900/30';
          case 'failure': return 'border-red-800 bg-red-900/30';
          case 'warning': return 'border-yellow-800 bg-yellow-900/30';
          case 'in_progress': return 'border-blue-800 bg-blue-900/30';
          case 'completed': return 'border-green-800 bg-green-900/30';
          default: return 'border-gray-700 bg-gray-800/50';
        }
      } else {
        switch (message.status) {
          case 'success': return 'border-green-300 bg-gradient-to-br from-green-50 to-green-100';
          case 'failure': return 'border-red-300 bg-gradient-to-br from-red-50 to-red-100';
          case 'warning': return 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100';
          case 'in_progress': return 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100';
          case 'completed': return 'border-green-300 bg-gradient-to-br from-green-50 to-green-100';
          default: return 'border-gray-300 bg-gradient-to-br from-white to-gray-50';
        }
      }
    }
    
    // For other types
    if (darkMode) {
      switch (message.type) {
        case 'error': return 'border-red-800 bg-red-900/30';
        case 'security': return 'border-pink-800 bg-pink-900/30';
        case 'performance': return 'border-teal-800 bg-teal-900/30';
        case 'code': return 'border-purple-800 bg-purple-900/30';
        case 'bug': return 'border-orange-800 bg-orange-900/30';
        case 'system': return 'border-blue-800 bg-blue-900/30';
        case 'git': return 'border-amber-800 bg-amber-900/30';
        case 'test': return 'border-indigo-800 bg-indigo-900/30';
        case 'dependency': return 'border-yellow-800 bg-yellow-900/30';
        case 'docs': return 'border-slate-700 bg-slate-800/50';
        default: return 'border-gray-700 bg-gray-800/50';
      }
    } else {
      switch (message.type) {
        case 'error': return 'border-red-300 bg-gradient-to-br from-red-50 to-red-100';
        case 'security': return 'border-pink-300 bg-gradient-to-br from-pink-50 to-pink-100';
        case 'performance': return 'border-teal-300 bg-gradient-to-br from-teal-50 to-teal-100';
        case 'code': return 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100';
        case 'bug': return 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100';
        case 'system': return 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100';
        case 'git': return 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100';
        case 'test': return 'border-indigo-300 bg-gradient-to-br from-indigo-50 to-indigo-100';
        case 'dependency': return 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100';
        case 'docs': return 'border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100';
        default: return 'border-gray-300 bg-gradient-to-br from-white to-gray-50';
      }
    }
  };

  // Get icon background color
  const getIconBgColor = () => {
    if (darkMode) {
      switch (message.type) {
        case 'error': return 'bg-red-800/50';
        case 'security': return 'bg-pink-800/50';
        case 'performance': return 'bg-teal-800/50';
        case 'code': return 'bg-purple-800/50';
        case 'bug': return 'bg-orange-800/50';
        case 'system': return 'bg-blue-800/50';
        case 'git': return 'bg-amber-800/50';
        case 'test': return 'bg-indigo-800/50';
        case 'dependency': return 'bg-yellow-800/50';
        case 'docs': return 'bg-slate-700/50';
        default: return 'bg-gray-700/50';
      }
    } else {
      switch (message.type) {
        case 'error': return 'bg-red-200';
        case 'security': return 'bg-pink-200';
        case 'performance': return 'bg-teal-200';
        case 'code': return 'bg-purple-200';
        case 'bug': return 'bg-orange-200';
        case 'system': return 'bg-blue-200';
        case 'git': return 'bg-amber-200';
        case 'test': return 'bg-indigo-200';
        case 'dependency': return 'bg-yellow-200';
        case 'docs': return 'bg-slate-200';
        default: return 'bg-gray-200';
      }
    }
  };

  // Get status badge styles
  const getStatusBadgeStyles = () => {
    if (darkMode) {
      switch (message.status) {
        case 'thinking': return 'text-blue-300 bg-blue-900/50 border border-blue-700';
        case 'researching': return 'text-purple-300 bg-purple-900/50 border border-purple-700';
        case 'error_llm_authentication': return 'text-red-300 bg-red-900/50 border border-red-700';
        case 'error_llm_service_unavailable': return 'text-orange-300 bg-orange-900/50 border border-orange-700';
        case 'error_llm_internal_server_error': return 'text-red-300 bg-red-900/50 border border-red-700';
        case 'error_llm_out_of_credits': return 'text-yellow-300 bg-yellow-900/50 border border-yellow-700';
        case 'error_llm_content_policy_violation': return 'text-pink-300 bg-pink-900/50 border border-pink-700';
        case 'success': return 'text-green-300 bg-green-900/50 border border-green-700';
        case 'failure': return 'text-red-300 bg-red-900/50 border border-red-700';
        case 'warning': return 'text-yellow-300 bg-yellow-900/50 border border-yellow-700';
        case 'info': return 'text-blue-300 bg-blue-900/50 border border-blue-700';
        case 'failed': return 'text-red-300 bg-red-900/50 border border-red-700';
        case 'completed': return 'text-green-300 bg-green-900/50 border border-green-700';
        case 'in_progress': return 'text-blue-300 bg-blue-900/50 border border-blue-700';
        default: return 'text-gray-300 bg-gray-800 border border-gray-700';
      }
    } else {
      switch (message.status) {
        case 'thinking': return 'text-blue-700 bg-blue-100 border border-blue-200';
        case 'researching': return 'text-purple-700 bg-purple-100 border border-purple-200';
        case 'error_llm_authentication': return 'text-red-700 bg-red-100 border border-red-200';
        case 'error_llm_service_unavailable': return 'text-orange-700 bg-orange-100 border border-orange-200';
        case 'error_llm_internal_server_error': return 'text-red-700 bg-red-100 border border-red-200';
        case 'error_llm_out_of_credits': return 'text-yellow-700 bg-yellow-100 border border-yellow-200';
        case 'error_llm_content_policy_violation': return 'text-pink-700 bg-pink-100 border border-pink-200';
        case 'success': return 'text-green-700 bg-green-100 border border-green-200';
        case 'failure': return 'text-red-700 bg-red-100 border border-red-200';
        case 'warning': return 'text-yellow-700 bg-yellow-100 border border-yellow-200';
        case 'info': return 'text-blue-700 bg-blue-100 border border-blue-200';
        case 'failed': return 'text-red-700 bg-red-100 border border-red-200';
        case 'completed': return 'text-green-700 bg-green-100 border border-green-200';
        case 'in_progress': return 'text-blue-700 bg-blue-100 border border-blue-200';
        default: return 'text-gray-700 bg-gray-100 border border-gray-200';
      }
    }
  };

  // Get primary button styles
  const getPrimaryButtonStyles = () => {
    if (darkMode) {
      switch (message.type) {
        case 'error': return 'bg-red-600 hover:bg-red-700 text-white';
        case 'security': return 'bg-pink-600 hover:bg-pink-700 text-white';
        case 'performance': return 'bg-teal-600 hover:bg-teal-700 text-white';
        case 'code': return 'bg-purple-600 hover:bg-purple-700 text-white';
        case 'bug': return 'bg-orange-600 hover:bg-orange-700 text-white';
        case 'system': return 'bg-blue-600 hover:bg-blue-700 text-white';
        default: return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    } else {
      switch (message.type) {
        case 'error': return 'bg-red-600 hover:bg-red-700 text-white';
        case 'security': return 'bg-pink-600 hover:bg-pink-700 text-white';
        case 'performance': return 'bg-teal-600 hover:bg-teal-700 text-white';
        case 'code': return 'bg-purple-600 hover:bg-purple-700 text-white';
        case 'bug': return 'bg-orange-600 hover:bg-orange-700 text-white';
        case 'system': return 'bg-blue-600 hover:bg-blue-700 text-white';
        default: return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    }
  };

  return (
    <div className={`p-3 rounded-lg border shadow-sm transition-all hover:shadow-md ${getCardStyles()}`}>
      <div className="flex items-start gap-2">
        <div className={`mt-0.5 p-1.5 rounded-full ${getIconBgColor()} shadow-sm`}>
          <div className="text-sm">{getIcon(message.type, message.status)}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
              </span>
              {message.status && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium shadow-sm flex items-center gap-1 ${getStatusBadgeStyles()}`}>
                  {message.status === 'success' && <FiCheck className="inline-block" size={12} />}
                  {message.status === 'failure' && <FiX className="inline-block" size={12} />}
                  {message.status === 'warning' && <FiAlertCircle className="inline-block" size={12} />}
                  {message.status === 'info' && <FiInfo className="inline-block" size={12} />}
                  {message.status === 'failed' && <FiX className="inline-block" size={12} />}
                  {message.status === 'completed' && <FiCheck className="inline-block" size={12} />}
                  {message.status === 'in_progress' && <CgSpinner className="inline-block animate-spin" size={12} />}
                  {message.status === 'thinking' && <CgSpinner className="inline-block animate-spin" size={12} />}
                  {message.status === 'researching' && <CgSpinner className="inline-block animate-spin" size={12} />}
                  {message.status.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
              {formatTime(message.timestamp)}
            </span>
          </div>
          
          <p className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{message.content}</p>
          
          {/* Progress indicators */}
          {message.type === 'notification' && message.status === 'in_progress' && (
            <div className="mt-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-full progress-bar-animated`}
                style={{ 
                  width: '45%',
                  animation: 'progress-bar-stripes 1s linear infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              ></div>
            </div>
          )}
          
          {message.type === 'system' && message.status === 'in_progress' && (
            <div className="mt-2 flex items-center">
              <div className="mr-2 w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                style={{ 
                  borderColor: darkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)',
                  borderTopColor: 'transparent'
                }}
              ></div>
              <span className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Operation in progress...
              </span>
            </div>
          )}
          
          {message.code && (
            <pre className={`mt-2 p-2 ${darkMode ? 'bg-gray-950' : 'bg-gray-900'} text-gray-100 rounded-md text-xs overflow-x-auto border ${darkMode ? 'border-gray-800' : 'border-gray-700'} shadow-inner`}>
              <code>{message.code}</code>
            </pre>
          )}
          
          {message.actions && message.actions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {message.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.handler}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all shadow-sm hover:shadow ${
                    index === 0 
                      ? getPrimaryButtonStyles()
                      : darkMode 
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {action.label}
                  {action.command && (
                    <span className="ml-1 opacity-80" title={action.command}>
                      <FiTerminal className="inline-block text-xs" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};