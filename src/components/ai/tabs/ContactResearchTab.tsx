
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";

export function ContactResearchTab() {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Contact Intelligence</h2>
      <p className="text-[#a8c6f0] mb-6">
        Enrich your contact database with AI-powered research. Discover valuable insights about 
        your contacts to personalize your approach.
      </p>
      <div className="space-y-4">
        <input 
          type="text" 
          className="w-full bg-gray-800/50 border-gray-700 rounded-md p-3 text-white focus:ring-[#6b99d6] focus:border-[#6b99d6]"
          placeholder="Search contacts to research..."
        />
        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#6b99d6] hover:bg-[#5c88c5]">
            <Search className="h-4 w-4 mr-2" />
            Research Selected Contacts
          </Button>
          <Button variant="outline" className="border-[#6b99d6] text-[#6b99d6] hover:bg-[#6b99d6]/10">
            <Users className="h-4 w-4 mr-2" />
            Batch Enrichment
          </Button>
        </div>
      </div>
    </Card>
  );
}
