
import React from "react";
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <div className="flex items-center gap-3">
    <div className="bg-slate-800 rounded-md p-2">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

interface AgentStatsProps {
  conversations?: number;
  avgDuration?: string;
  users?: number;
  successRate?: string;
  className?: string;
}

export function AgentStats({
  conversations = 0,
  avgDuration = "0:00",
  users = 0,
  successRate = "0%",
  className = ""
}: AgentStatsProps) {
  return (
    <Card className={`bg-slate-800 border-slate-700 ${className}`}>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <StatItem 
          icon={<MessageSquare className="h-5 w-5 text-[#6b99d6]" />} 
          label="Conversations" 
          value={conversations} 
        />
        <StatItem 
          icon={<Clock className="h-5 w-5 text-[#6b99d6]" />} 
          label="Avg. Duration" 
          value={avgDuration} 
        />
        <StatItem 
          icon={<Users className="h-5 w-5 text-[#6b99d6]" />} 
          label="Users" 
          value={users} 
        />
        <StatItem 
          icon={<TrendingUp className="h-5 w-5 text-[#6b99d6]" />} 
          label="Success Rate" 
          value={successRate} 
        />
      </CardContent>
    </Card>
  );
}
