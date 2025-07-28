import { useIsMobile } from "@/hooks/use-mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      content:
        "Olá! Sou o assistente de pesquisa EMPRAD. Como posso ajudar com sua pesquisa nos artigos científicos do EMPRAD? Você pode me perguntar sobre temas como empreendedorismo, inovação, gestão ou sustentabilidade.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // TODO: evaluate if this is needed
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [waitingForFirstChunk, setWaitingForFirstChunk] = useState(false);
  const abortControllerRef = useRef(null); // To cancel the fetch request

  const startStreaming = useCallback(
    async (message: string) => {
      if (isStreaming) return; // Prevent multiple simultaneous streams

      setIsStreaming(true);
      setWaitingForFirstChunk(true);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      const messageId = Date.now().toString() + "_ai";

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
          method: "POST",
          signal: signal, // Attach the abort signal
          body: JSON.stringify({ message: message }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Ensure the body is a ReadableStream
        if (!response.body) {
          throw new Error("Response body is not a ReadableStream.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8"); // For text streams

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // value is a Uint8Array
          const chunk = decoder.decode(value, { stream: true }); // Decode chunk by chunk

          const parsedChunk = chunk
            .split('data: {"type": "')
            .at(-1)
            .slice(0, -2);

          const chunkStringToParse = '{"type": "' + parsedChunk;

          try {
            const response = JSON.parse(chunkStringToParse);

            let answer = "";

            let results = [];

            if (response.type === "complete") {
              answer = response.answer;
              results = response.results;
            } else if (response.type === "chunk") {
              try {
                const parsedContent = JSON.parse(
                  response.content.split('","')[0] + '"}'
                );

                setWaitingForFirstChunk(false);

                answer = parsedContent.answer;
                results = parsedContent.results;
              } catch (error) {
                console.error("Error parsing chunk:", response.content);
              }
            }

            setMessages((prev) => {
              const newList = prev.filter((item) => item.id !== messageId);

              return [
                ...newList,
                {
                  id: messageId,
                  content: answer,
                  isUser: false,
                  references: results,
                  timestamp: new Date(),
                },
              ];
            });
          } catch (error) {
            console.error("Error parsing chunk:", chunkStringToParse);
          }
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted.");
        } else {
          console.error("Error during streaming:", err);
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null; // Clear the ref
      }
    },
    [isStreaming]
  );

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the fetch request
      console.log("Attempting to stop stream...");
      setIsStreaming(false); // Update state immediately
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStreaming(); // Ensure stream is stopped if component unmounts
    };
  }, [stopStreaming]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    startStreaming(content);

    setMessages((prev) => [...prev, userMessage]);
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
        {waitingForFirstChunk && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-xl p-4 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce"></div>
                <div
                  className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-3 w-3 bg-emprad-purple rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={waitingForFirstChunk || isStreaming}
      />
    </div>
  );
};

export default ChatInterface;
