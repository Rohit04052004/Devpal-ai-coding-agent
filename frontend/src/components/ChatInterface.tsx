import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCode } from "@/lib/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBuildRequest: () => void;
  isFullScreen?: boolean;
}

export const ChatInterface = ({ onBuildRequest, isFullScreen = false }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI coding assistant. Describe the app you'd like to build and I'll create it for you instantly!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Any input is treated as a build request
    if (true) {
      try {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect! I'll start building that for you right now. Let me switch to the development environment...",
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Call the backend API
        const response = await generateCode({ user_prompt: inputValue });
        
        if (response.status === 'success') {
          // Store the generated code in the window object for SplitInterface to access
          window.generatedCode = response.generated_code || '';
          
          const resultMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "I've generated the code for you! Here's the result.",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, resultMessage]);
          onBuildRequest();
        } else {
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: `Sorry, there was an error: ${response.message || 'Unknown error'}`,
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "Sorry, I couldn't connect to the backend service. Please make sure it's running.",
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Regular chat response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to help! To get started building, just tell me what kind of app you'd like to create. For example: 'Build me a todo app' or 'Create a calculator'.",
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className={`glass-card ${isFullScreen ? 'h-full' : 'w-full max-w-2xl mx-auto'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Ready to build your app</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 p-4 space-y-4 overflow-y-auto ${isFullScreen ? 'max-h-[calc(100vh-200px)]' : 'max-h-96'}`}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === "user" ? "bg-primary" : "gradient-primary"
              }`}>
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-xl ${
                message.sender === "user" 
                  ? "bg-primary text-white ml-auto" 
                  : "glass border border-white/10"
              }`}>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass border border-white/10 p-3 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the app you want to build..."
            className="flex-1 bg-white/5 border-white/10 focus:border-primary"
          />
          <Button 
            type="submit" 
            variant="hero"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};