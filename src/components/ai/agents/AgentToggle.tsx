
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface AgentToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
  showStatus?: boolean;
}

export function AgentToggle({ isActive, onToggle, showStatus = true }: AgentToggleProps) {
  const [isPending, setIsPending] = useState(false);
  
  const handleToggle = (checked: boolean) => {
    setIsPending(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      onToggle(checked);
      setIsPending(false);
    }, 500);
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={isPending}
        className="data-[state=checked]:bg-[#6b99d6]"
      />
      {showStatus && (
        <Badge 
          variant={isActive ? "default" : "outline"} 
          className={isActive ? "bg-[#6b99d6] text-white" : "text-slate-400 border-slate-400"}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      )}
    </div>
  );
}
