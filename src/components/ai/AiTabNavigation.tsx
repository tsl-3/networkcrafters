import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Lightbulb, MessageSquare, Search, FileText, Users, Workflow } from "lucide-react";

interface AiTabNavigationProps {
  activeTab: string;
}

export function AiTabNavigation({ activeTab }: AiTabNavigationProps) {
  return (
    <div style={{ display: 'block', opacity: 1 }}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-gray-800/50 p-1">
        <TabsTrigger 
          value="lead-generation" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Lead Generation</span>
          <span className="sm:hidden">Leads</span>
        </TabsTrigger>
        <TabsTrigger 
          value="idea-generation" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Idea Generation</span>
          <span className="sm:hidden">Ideas</span>
        </TabsTrigger>
        <TabsTrigger 
          value="chat" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          <span>Chat</span>
        </TabsTrigger>
        <TabsTrigger 
          value="research" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Research</span>
          <span className="sm:hidden">Research</span>
        </TabsTrigger>
        <TabsTrigger 
          value="content" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <FileText className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Content Creation</span>
          <span className="sm:hidden">Content</span>
        </TabsTrigger>
        <TabsTrigger 
          value="contact-research" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <Users className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Contact Research</span>
          <span className="sm:hidden">Contacts</span>
        </TabsTrigger>
        <TabsTrigger 
          value="workflow" 
          className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
        >
          <Workflow className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Marketing Workflow</span>
          <span className="sm:hidden">Workflow</span>
        </TabsTrigger>
      </TabsList>
      <div className="text-white mt-2">Nav rendered at: {new Date().toLocaleTimeString()}</div>
    </div>
  );
}
