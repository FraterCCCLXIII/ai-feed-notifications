import { useState, useEffect } from 'react';
import type { ToastNotification as ToastNotificationType } from './types';
import { FiX, FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';

interface ToastNotificationProps {
  notification: ToastNotificationType;
  onClose: (id: string) => void;
  darkMode?: boolean;
}

export const ToastNotification = ({ 
  notification, 
  onClose, 
  darkMode = false 
}: ToastNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notification.autoClose && notification.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(notification.id), 300); // Wait for animation to complete
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300); // Wait for animation to complete
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'error':
        return <FiAlertCircle className="text-white" size={20} />;
      case 'warning':
        return <FiAlertTriangle className="text-white" size={20} />;
      case 'success':
        return <FiCheckCircle className="text-white" size={20} />;
      case 'info':
        return <FiInfo className="text-white" size={20} />;
      default:
        return <FiInfo className="text-white" size={20} />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'error':
        return darkMode ? 'bg-red-700' : 'bg-red-600';
      case 'warning':
        return darkMode ? 'bg-amber-700' : 'bg-amber-500';
      case 'success':
        return darkMode ? 'bg-green-700' : 'bg-green-600';
      case 'info':
        return darkMode ? 'bg-blue-700' : 'bg-blue-600';
      default:
        return darkMode ? 'bg-gray-700' : 'bg-gray-600';
    }
  };

  return (
    <div 
      className={`${getBackgroundColor()} text-white rounded-lg shadow-lg 
        transition-all duration-300 ease-in-out mb-3
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 mr-2">
          <p className="font-medium">{notification.message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-white hover:text-gray-200 focus:outline-none"
        >
          <FiX size={20} />
        </button>
      </div>
      
      {notification.actions && notification.actions.length > 0 && (
        <div className="px-4 pb-3 flex gap-2 justify-end">
          {notification.actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                if (action.handler) action.handler();
                handleClose();
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium 
                ${index === 0 
                  ? 'bg-white text-gray-800 hover:bg-gray-100' 
                  : 'bg-transparent border border-white text-white hover:bg-white/10'
                }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ToastContainer = ({ 
  notifications, 
  onClose,
  darkMode = false
}: { 
  notifications: ToastNotificationType[],
  onClose: (id: string) => void,
  darkMode?: boolean
}) => {
  return (
    <>
      {notifications.map(notification => (
        <ToastNotification 
          key={notification.id} 
          notification={notification} 
          onClose={onClose}
          darkMode={darkMode}
        />
      ))}
    </>
  );
};