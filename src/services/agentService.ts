
// This is a mock service for agent functionality
// In a real application, this would connect to your backend API

import { Agent } from "@/types/agent";

// Sample agent data
const sampleAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    isActive: true,
    createdAt: "2023-10-15T10:30:00Z",
    stats: {
      conversations: 1245,
      avgDuration: "4:32",
      users: 420,
      successRate: "94.6%"
    }
  },
  {
    id: "agent-2",
    name: "Sales Assistant",
    description: "Helps customers find the right products and completes sales",
    isActive: true,
    createdAt: "2023-11-02T14:15:00Z",
    stats: {
      conversations: 986,
      avgDuration: "7:15",
      users: 315,
      successRate: "87.3%"
    }
  },
  {
    id: "agent-3",
    name: "HR Onboarding Bot",
    description: "Assists new employees with onboarding procedures",
    isActive: false,
    createdAt: "2023-12-05T09:45:00Z",
    stats: {
      conversations: 532,
      avgDuration: "12:40",
      users: 178,
      successRate: "92.8%"
    }
  }
];

// Get all agents
export async function getAgents(): Promise<Agent[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleAgents);
    }, 800);
  });
}

// Get agent by ID
export async function getAgentById(id: string): Promise<Agent | undefined> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const agent = sampleAgents.find(agent => agent.id === id);
      resolve(agent);
    }, 500);
  });
}

// Create new agent
export async function createAgent(agent: Omit<Agent, "id" | "createdAt">): Promise<Agent> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAgent: Agent = {
        id: `agent-${Math.floor(Math.random() * 10000)}`,
        ...agent,
        createdAt: new Date().toISOString(),
        stats: {
          conversations: 0,
          avgDuration: "0:00",
          users: 0,
          successRate: "0%"
        }
      };
      
      resolve(newAgent);
    }, 1000);
  });
}

// Update agent
export async function updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | undefined> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const agentIndex = sampleAgents.findIndex(agent => agent.id === id);
      if (agentIndex === -1) {
        resolve(undefined);
        return;
      }
      
      const updatedAgent = {
        ...sampleAgents[agentIndex],
        ...updates
      };
      
      resolve(updatedAgent);
    }, 800);
  });
}

// Delete agent
export async function deleteAgent(id: string): Promise<boolean> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 600);
  });
}

// Toggle agent status
export async function toggleAgentStatus(id: string, isActive: boolean): Promise<Agent | undefined> {
  return updateAgent(id, { isActive });
}
