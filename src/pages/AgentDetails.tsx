
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAgentDetails } from "@/hooks/useAgentDetails";
import { AgentToggle } from "@/components/ai/agents/AgentToggle";
import { AgentStats } from "@/components/ai/agents/AgentStats";
import { AgentTrainingCard } from "@/components/ai/agents/AgentTrainingCard";
import { KnowledgeBaseCard } from "@/components/ai/agents/KnowledgeBaseCard";
import { PersonasCard } from "@/components/ai/agents/PersonasCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Settings, 
  MessageSquare, 
  Users, 
  Bot, 
  Zap, 
  Database,
  Save
} from "lucide-react";
import { Persona } from "@/types/agent";

export function AgentDetails() {
  const { id } = useParams();
  const { agent, isLoading, error, updateAgent, toggleAgentStatus } = useAgentDetails(id || "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Sample data for demonstration
  const sampleDocuments = [
    {
      id: "doc-1",
      name: "Product Manual.pdf",
      type: "PDF",
      size: "2.4MB"
    },
    {
      id: "doc-2",
      name: "FAQ Knowledge Base.docx",
      type: "DOCX",
      size: "1.1MB"
    }
  ];
  
  const samplePersonas = [
    {
      id: "persona-1",
      name: "Customer Support Rep",
      description: "Friendly and helpful support representative",
      status: "active" as const
    },
    {
      id: "persona-2",
      name: "Technical Expert",
      description: "Detailed technical knowledge specialist",
      status: "draft" as const
    }
  ];

  // Initialize form state when agent data is loaded
  React.useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description);
    }
  }, [agent]);

  const handleSaveChanges = async () => {
    if (!agent) return;
    
    const result = await updateAgent({ name, description });
    
    if (result) {
      setIsEditing(false);
      toast({
        title: "Changes saved",
        description: "Agent details were updated successfully."
      });
    } else {
      toast({
        title: "Failed to save",
        description: "There was an error updating the agent details.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (isActive: boolean) => {
    const result = await toggleAgentStatus(isActive);
    
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

  const handleStartTraining = () => {
    setTrainingProgress(10);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700/50 rounded w-1/4"></div>
          <div className="h-32 bg-gray-700/50 rounded"></div>
          <div className="h-64 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <p className="text-red-400 text-center">
              {error ? error.message : "Agent not found"}
            </p>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="border-gray-700" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="border-gray-700" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold bg-gray-900/70 border-gray-700"
              />
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-gray-400 bg-gray-900/70 border-gray-700"
                rows={2}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveChanges} className="bg-[#6b99d6] hover:bg-[#6b99d6]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="border-gray-700" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{agent.name}</h1>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 hover:bg-gray-800"
                  onClick={() => setIsEditing(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-400">{agent.description}</p>
            </>
          )}
        </div>
        <div>
          <AgentToggle 
            isActive={agent.isActive} 
            onToggle={handleToggleStatus} 
          />
        </div>
      </div>
      
      {agent.stats && (
        <AgentStats 
          conversations={agent.stats.conversations}
          avgDuration={agent.stats.avgDuration}
          users={agent.stats.users}
          successRate={agent.stats.successRate}
        />
      )}
      
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="bg-gray-800/50 p-1">
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger 
            value="conversations" 
            className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Conversations
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white"
          >
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AgentTrainingCard 
              title="Agent Training" 
              description="Train your agent with the latest data and improve its performance." 
              progress={trainingProgress} 
              isComplete={trainingProgress === 100}
              onTrain={handleStartTraining}
            />
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5 text-[#6b99d6]" />
                  Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Selected Model</p>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-[#6b99d6]" />
                        <p>GPT-4</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Memory</p>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-md p-2">
                      <p>Context Window</p>
                      <p className="text-[#6b99d6]">8,000 tokens</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-gray-700 hover:bg-gray-800"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Model Settings
                </Button>
              </CardContent>
            </Card>
            
            <KnowledgeBaseCard 
              title="Knowledge Base"
              documents={sampleDocuments}
              onAddDocument={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Document upload functionality is under development."
                });
              }}
            />
            
            <PersonasCard 
              title="Agent Personas"
              personas={samplePersonas}
              onAddPersona={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Persona creation functionality is under development."
                });
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="conversations" className="mt-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400 opacity-50" />
              <p className="text-lg mb-2">No conversations yet</p>
              <p className="text-gray-400">Your agent hasn't had any conversations</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400 opacity-50" />
              <p className="text-lg mb-2">No users yet</p>
              <p className="text-gray-400">Your agent hasn't interacted with any users</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AgentDetails;
