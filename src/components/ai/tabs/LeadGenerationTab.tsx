
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Sparkles } from "lucide-react";

export function LeadGenerationTab() {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">AI-Powered Lead Generation</h2>
      <p className="text-[#a8c6f0] mb-6">
        Discover potential leads tailored to your business needs. OMNIS analyzes your existing contacts and 
        industry trends to suggest high-quality prospects.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
          <h3 className="text-lg font-medium text-white">Audience Analysis</h3>
          <p className="text-[#a8c6f0] mt-2">Identify your ideal customer profile based on your best existing clients.</p>
          <Button className="mt-4 bg-[#6b99d6] hover:bg-[#5c88c5]">
            <Sparkles className="h-4 w-4 mr-2" />
            Analyze Audience
          </Button>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
          <h3 className="text-lg font-medium text-white">Find New Leads</h3>
          <p className="text-[#a8c6f0] mt-2">Generate a list of potential leads matching your target criteria.</p>
          <Button className="mt-4 bg-[#6b99d6] hover:bg-[#5c88c5]">
            <UserPlus className="h-4 w-4 mr-2" />
            Generate Leads
          </Button>
        </Card>
      </div>
    </Card>
  );
}
