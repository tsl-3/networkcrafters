import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AiTabNavigationProps {
  activeTab: string;
}

export function AiTabNavigation({ activeTab }: AiTabNavigationProps) {
  return (
    <TabsList className="bg-gray-800/50 p-1">
      <TabsTrigger 
        value="lead-generation" 
        className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white transition-all duration-300 hover:bg-gray-700/50"
      >
        Lead Generation
      </TabsTrigger>
    </TabsList>
  );
}
