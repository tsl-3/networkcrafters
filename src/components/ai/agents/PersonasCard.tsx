
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, User, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Persona {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft" | "archived";
}

interface PersonasCardProps {
  title: string;
  personas: Persona[];
  onAddPersona?: () => void;
  onEditPersona?: (id: string) => void;
  className?: string;
}

export function PersonasCard({
  title,
  personas = [],
  onAddPersona,
  onEditPersona,
  className = ""
}: PersonasCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "archived":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <Card className={`bg-slate-800 border-slate-700 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button 
          onClick={onAddPersona} 
          variant="outline" 
          size="sm" 
          className="h-8 border-slate-700 bg-slate-800 hover:bg-slate-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Persona
        </Button>
      </CardHeader>
      <CardContent>
        {personas.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No personas created yet</p>
            <p className="text-sm">Create personas to define your agent's behavior</p>
          </div>
        ) : (
          <div className="space-y-3">
            {personas.map((persona) => (
              <div key={persona.id} className="flex items-center justify-between p-2 bg-slate-700 rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-[#6b99d6]/20 text-[#6b99d6]">
                    <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{persona.name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{persona.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-xs py-0 h-5 ${getStatusColor(persona.status)}`}
                    >
                      {persona.status.charAt(0).toUpperCase() + persona.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {onEditPersona && (
                  <Button 
                    onClick={() => onEditPersona(persona.id)} 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit persona</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
