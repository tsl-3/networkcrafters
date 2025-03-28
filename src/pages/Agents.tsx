
import React from "react";
import { AgentsDashboardTab } from "@/components/ai/tabs/AgentsDashboardTab";
import { AiHubHeader } from "@/components/ai/AiHubHeader";
import { Navbar } from "@/components/Navbar";

export function Agents() {
  return (
    <div className="min-h-screen bg-[#131417] text-white">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <AiHubHeader />
          <AgentsDashboardTab />
        </div>
      </div>
    </div>
  );
}

export default Agents;
