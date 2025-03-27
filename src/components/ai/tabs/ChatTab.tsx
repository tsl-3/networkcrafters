
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";

export function ChatTab() {
  const [message, setMessage] = useState("");
  
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6 flex flex-col h-[calc(100vh-300px)]">
      <h2 className="text-xl font-semibold text-white mb-4">OMNIS Chat Assistant</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#6b99d6]/20 flex items-center justify-center mr-3 flex-shrink-0">
            <Sparkles className="h-4 w-4 text-[#6b99d6]" />
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-[#a8c6f0] max-w-[80%]">
            Hello! I'm OMNIS, your AI assistant. How can I help you today?
          </div>
        </div>
        {/* Chat messages would be dynamically added here */}
      </div>
      <div className="flex space-x-2">
        <input 
          type="text" 
          className="flex-1 bg-gray-800/50 border-gray-700 rounded-md p-3 text-white focus:ring-[#6b99d6] focus:border-[#6b99d6]"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="bg-[#6b99d6] hover:bg-[#5c88c5]">
          <MessageSquare className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </Card>
  );
}
