
export interface AgentStats {
  conversations: number;
  avgDuration: string;
  users: number;
  successRate: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  stats?: AgentStats;
}

export interface AgentConfig {
  id: string;
  memory: {
    enabled: boolean;
    contextWindow: number;
  };
  voice: {
    enabled: boolean;
    voiceId: string;
    speed: number;
  };
  model: string;
  knowledgeBase: {
    enabled: boolean;
    documents: Array<{
      id: string;
      name: string;
      type: string;
    }>;
  };
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft" | "archived";
}
