
import React from 'react';
import { MessageCircle } from "lucide-react";
import ArticleReference from "./ArticleReference";
import { Article } from "../types";
import ReactMarkdown from 'react-markdown';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessageProps {
  isUser: boolean;
  content: string;
  references?: Article[];
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isUser, content, references, timestamp }) => {
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`${isMobile ? 'max-w-[95%]' : 'max-w-[80%]'} ${isUser ? 'bg-[#283691] text-white' : 'bg-gray-100 border'} rounded-xl p-4 shadow`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-[#1A2670]' : 'bg-blue-100'}`}>
            {isUser ? (
              <span className="text-white font-medium">U</span>
            ) : (
              <MessageCircle className="w-4 h-4 text-[#283691]" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">{isUser ? 'Você' : 'Assistente EMPRAD'}</div>
            <div className="prose prose-sm max-w-none mt-2 prose-headings:text-[#283691] prose-headings:font-semibold prose-strong:font-bold">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            
            {references && references.length > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-[#283691] mb-3">Referências Encontradas</h4>
                <div className="space-y-4">
                  {references.map((article, index) => (
                    <ArticleReference key={index} article={article} />
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-3 text-right">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
