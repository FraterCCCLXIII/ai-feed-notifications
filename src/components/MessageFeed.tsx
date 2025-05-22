import type { Message } from "./types";
import { MessageItem } from "./MessageItem";

interface MessageFeedProps {
  messages: Message[];
  darkMode?: boolean;
}

export const MessageFeed = ({ messages, darkMode = false }: MessageFeedProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-200`}>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${darkMode ? 'bg-green-400' : 'bg-green-500'} animate-pulse`}></span>
            AI Assistant Feed
          </h2>
          <div className={`px-2 py-0.5 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full text-xs font-medium transition-colors duration-200`}>
            {messages.length} messages
          </div>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};