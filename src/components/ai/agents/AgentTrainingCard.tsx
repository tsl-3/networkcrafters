
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Upload } from "lucide-react";

interface AgentTrainingCardProps {
  title: string;
  description?: string;
  progress?: number;
  isComplete?: boolean;
  onTrain?: () => void;
  className?: string;
}

export function AgentTrainingCard({
  title,
  description,
  progress = 0,
  isComplete = false,
  onTrain,
  className = ""
}: AgentTrainingCardProps) {
  return (
    <Card className={`bg-slate-800 border-slate-700 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {title}
          {isComplete && (
            <BadgeCheck className="h-5 w-5 text-green-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-sm text-slate-400 mb-4">{description}</p>
        )}
        
        {!isComplete ? (
          <>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between text-xs text-slate-400 mb-4">
              <span>{progress}% Complete</span>
              {progress > 0 && <span>{progress === 100 ? "Finalizing..." : "Training..."}</span>}
            </div>
            <Button 
              onClick={onTrain} 
              className="w-full bg-[#6b99d6] hover:bg-[#6b99d6]/90"
              disabled={progress > 0 && progress < 100}
            >
              <Upload className="h-4 w-4 mr-2" />
              {progress > 0 ? "Training in progress" : "Start Training"}
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2 text-green-500">
            <BadgeCheck className="h-4 w-4" />
            <span className="text-sm">Training complete</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
