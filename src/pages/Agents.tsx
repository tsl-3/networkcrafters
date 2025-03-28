
import React from "react";
import { AgentsDashboardTab } from "@/components/ai/tabs/AgentsDashboardTab";
import { AiHubHeader } from "@/components/ai/AiHubHeader";

export function Agents() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <AiHubHeader />
      <AgentsDashboardTab />
    </div>
  );
}

export default Agents;
