
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

export function IdeaGenerationTab() {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Creative Idea Generation</h2>
      <p className="text-[#a8c6f0] mb-6">
        Spark innovation with AI-powered brainstorming. Generate fresh ideas for marketing campaigns, 
        product features, or business strategies.
      </p>
      <div className="space-y-4">
        <textarea 
          className="w-full h-32 bg-gray-800/50 border-gray-700 rounded-md p-3 text-white resize-none focus:ring-[#6b99d6] focus:border-[#6b99d6]"
          placeholder="Enter a brief description of what you need ideas for..."
        ></textarea>
        <Button className="w-full sm:w-auto bg-[#6b99d6] hover:bg-[#5c88c5]">
          <Lightbulb className="h-4 w-4 mr-2" />
          Generate Ideas
        </Button>
      </div>
    </Card>
  );
}
