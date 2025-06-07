
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t">
      <div className="relative flex-grow">
        <textarea
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emprad-purple resize-none min-h-[60px] pr-12"
          placeholder="Pesquise nos 1585 artigos do EMPRAD..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={2}
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="bg-emprad-purple hover:bg-emprad-dark-purple text-white p-4 rounded-md h-12 w-12 flex items-center justify-center"
        disabled={!message.trim() || isLoading}
        aria-label="Enviar mensagem"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
