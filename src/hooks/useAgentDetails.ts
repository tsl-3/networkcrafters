
import { useState, useEffect } from "react";
import { Agent } from "@/types/agent";
import * as agentService from "@/services/agentService";

export function useAgentDetails(agentId: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch agent details
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!agentId) {
          setAgent(null);
          return;
        }
        
        const data = await agentService.getAgentById(agentId);
        setAgent(data || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch agent details"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agentId]);

  // Update agent
  const updateAgent = async (updates: Partial<Agent>) => {
    if (!agent) return null;
    
    try {
      const updatedAgent = await agentService.updateAgent(agent.id, updates);
      if (updatedAgent) {
        setAgent({ ...agent, ...updates });
      }
      return updatedAgent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update agent"));
      return null;
    }
  };

  // Toggle agent status
  const toggleAgentStatus = async (isActive: boolean) => {
    if (!agent) return false;
    
    try {
      const updatedAgent = await agentService.toggleAgentStatus(agent.id, isActive);
      if (updatedAgent) {
        setAgent({ ...agent, isActive });
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update agent status"));
      return false;
    }
  };

  return {
    agent,
    isLoading,
    error,
    updateAgent,
    toggleAgentStatus
  };
}
