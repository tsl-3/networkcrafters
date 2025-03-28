
import { useState, useEffect } from "react";
import { Agent } from "@/types/agent";
import * as agentService from "@/services/agentService";

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await agentService.getAgents();
        setAgents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch agents"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Toggle agent status
  const toggleAgentStatus = async (id: string, isActive: boolean) => {
    try {
      const updatedAgent = await agentService.toggleAgentStatus(id, isActive);
      if (updatedAgent) {
        setAgents(agents.map(agent => 
          agent.id === id ? { ...agent, isActive } : agent
        ));
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update agent status"));
      return false;
    }
  };

  // Create new agent
  const createAgent = async (agent: Omit<Agent, "id" | "createdAt">) => {
    try {
      setIsLoading(true);
      const newAgent = await agentService.createAgent(agent);
      setAgents([...agents, newAgent]);
      return newAgent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create agent"));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update agent
  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    try {
      const updatedAgent = await agentService.updateAgent(id, updates);
      if (updatedAgent) {
        setAgents(agents.map(agent => 
          agent.id === id ? { ...agent, ...updates } : agent
        ));
      }
      return updatedAgent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update agent"));
      return null;
    }
  };

  // Delete agent
  const deleteAgent = async (id: string) => {
    try {
      const success = await agentService.deleteAgent(id);
      if (success) {
        setAgents(agents.filter(agent => agent.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete agent"));
      return false;
    }
  };

  return {
    agents,
    isLoading,
    error,
    toggleAgentStatus,
    createAgent,
    updateAgent,
    deleteAgent,
  };
}
