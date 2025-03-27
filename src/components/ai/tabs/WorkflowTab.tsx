
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";

export function WorkflowTab() {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Automated Marketing Workflows</h2>
      <p className="text-[#a8c6f0] mb-6">
        Create intelligent marketing workflows to automate repetitive tasks. From follow-ups to 
        personalized outreach campaigns, OMNIS handles it all.
      </p>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-lg font-medium text-white">Follow-up Sequences</h3>
            <p className="text-[#a8c6f0] mt-2">Create smart follow-up sequences that adapt based on recipient engagement.</p>
            <Button className="mt-4 bg-[#6b99d6] hover:bg-[#5c88c5]">
              <Workflow className="h-4 w-4 mr-2" />
              Create Sequence
            </Button>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-lg font-medium text-white">Outreach Campaigns</h3>
            <p className="text-[#a8c6f0] mt-2">Design multi-channel outreach campaigns with personalized messaging.</p>
            <Button className="mt-4 bg-[#6b99d6] hover:bg-[#5c88c5]">
              <Workflow className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </Card>
        </div>
      </div>
    </Card>
  );
}
