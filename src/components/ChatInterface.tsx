
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { mockQueryArticles, generateEnhancedAIResponse } from '../services/articleService';
import { Message, Article } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: 'Olá! Sou o assistente de pesquisa EMPRAD. Como posso ajudar com sua pesquisa nos artigos científicos do EMPRAD? Você pode me perguntar sobre temas como empreendedorismo, inovação, gestão ou sustentabilidade.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Querying:', content);
      const articles = await mockQueryArticles(content);
      
      // Generate enhanced AI response
      setTimeout(() => {
        const aiResponseContent = generateEnhancedAIResponse(content, articles);
        
        const aiResponse: Message = {
          id: Date.now().toString(),
          content: aiResponseContent,
          isUser: false,
          references: articles,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: 'Desculpe, ocorreu um erro ao processar sua consulta. Por favor, tente novamente mais tarde.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            isUser={message.isUser} 
            content={message.content} 
            references={message.references}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-xl p-4 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce"></div>
                <div className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
