
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// Define a type for our chat messages
type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export function ChatTab() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm OMNIS, your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAiResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Generate a simple response based on user input
  const generateAiResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello there! How can I assist you today?";
    } else if (lowerInput.includes("help")) {
      return "I'm here to help! I can assist with various business tasks. Just let me know what you need.";
    } else if (lowerInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerInput.includes("contact") || lowerInput.includes("lead")) {
      return "I can help you manage and research contacts or generate leads. Would you like me to show you how?";
    } else if (lowerInput.includes("idea") || lowerInput.includes("brainstorm")) {
      return "Need help with brainstorming? I can generate creative ideas for your business needs. Just provide some context about what you're looking for.";
    } else {
      return "I understand. Can you provide more details so I can assist you better?";
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6 flex flex-col h-[calc(100vh-300px)]">
      <h2 className="text-xl font-semibold text-white mb-4">OMNIS Chat Assistant</h2>
      
      <ScrollArea className="flex-1 mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start ${msg.sender === "user" ? "justify-end" : ""}`}>
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#6b99d6]/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-[#6b99d6]" />
                </div>
              )}
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.sender === "ai" 
                    ? "bg-gray-800/50 text-[#a8c6f0]" 
                    : "bg-[#6b99d6]/20 text-white ml-auto"
                }`}
              >
                {msg.content}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-3 flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#6b99d6]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <Sparkles className="h-4 w-4 text-[#6b99d6]" />
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-[#a8c6f0] max-w-[80%]">
                <div className="flex space-x-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>•</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="flex space-x-2">
        <Input 
          className="flex-1 bg-gray-800/50 border-gray-700 text-white focus:ring-[#6b99d6] focus:border-[#6b99d6]"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          className="bg-[#6b99d6] hover:bg-[#5c88c5]"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === "" || isTyping}
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </Card>
  );
}
