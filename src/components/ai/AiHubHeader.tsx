
import { Sparkles } from "lucide-react";

export function AiHubHeader() {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-[#6b99d6]/20 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-[#6b99d6]" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">OMNIS Hub</h1>
        <p className="text-[#a8c6f0]">Your AI-powered assistant for all business needs</p>
      </div>
    </div>
  );
}
