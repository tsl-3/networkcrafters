
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AgentToggle } from "@/components/ai/agents/AgentToggle";
import { AgentStats } from "@/components/ai/agents/AgentStats";
import { useAgents } from "@/hooks/useAgents";
import { useToast } from "@/hooks/use-toast";

export function AgentsDashboardTab() {
  const { agents, isLoading, error, toggleAgentStatus } = useAgents();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Handle toggle
  const handleToggle = async (id: string, isActive: boolean) => {
    const result = await toggleAgentStatus(id, isActive);
    
    if (result) {
      toast({
        title: `Agent ${isActive ? "activated" : "deactivated"}`,
        description: `The agent status was successfully updated.`
      });
    } else {
      toast({
        title: "Update failed",
        description: "There was an error updating the agent status.",
        variant: "destructive"
      });
    }
  };
  
  // Filter agents by search term
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search agents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900/70 border-gray-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#6b99d6] hover:bg-[#6b99d6]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-900/50 border-gray-800 animate-pulse">
              <CardContent className="h-40"></CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">Error loading agents. Please try again.</p>
          </CardContent>
        </Card>
      ) : filteredAgents.length === 0 ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-8 text-center">
            {searchTerm ? (
              <>
                <p className="text-lg mb-2">No agents found</p>
                <p className="text-gray-400">No agents match your search criteria</p>
              </>
            ) : (
              <>
                <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">No agents created yet</p>
                <p className="text-gray-400 mb-4">Create your first agent to get started</p>
                <Button className="bg-[#6b99d6] hover:bg-[#6b99d6]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Agent
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="bg-gray-900/50 border-gray-800 hover:border-[#6b99d6]/50 transition-colors">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <AgentToggle 
                    isActive={agent.isActive} 
                    onToggle={(active) => handleToggle(agent.id, active)} 
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">{agent.description}</p>
              </CardHeader>
              <CardContent className="p-4">
                <AgentStats 
                  conversations={agent.stats?.conversations}
                  avgDuration={agent.stats?.avgDuration}
                  users={agent.stats?.users}
                  successRate={agent.stats?.successRate}
                />
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 border border-gray-700 hover:bg-gray-800 hover:text-[#6b99d6]"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
