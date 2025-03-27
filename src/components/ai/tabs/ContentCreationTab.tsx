
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContentCreationTab() {
  return (
    <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">AI Content Creation</h2>
      <p className="text-[#a8c6f0] mb-6">
        Create high-quality content for various purposes. From email drafts to social media posts, 
        OMNIS helps you craft compelling content quickly.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-lg font-medium text-white">Email Templates</h3>
            <p className="text-[#a8c6f0] mt-2">Create personalized email templates for different segments.</p>
            <Button className="mt-4 w-full bg-[#6b99d6] hover:bg-[#5c88c5]">Create</Button>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-lg font-medium text-white">Social Media</h3>
            <p className="text-[#a8c6f0] mt-2">Generate engaging posts for your social media channels.</p>
            <Button className="mt-4 w-full bg-[#6b99d6] hover:bg-[#5c88c5]">Create</Button>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-lg font-medium text-white">Blog Articles</h3>
            <p className="text-[#a8c6f0] mt-2">Draft well-researched and SEO-optimized blog content.</p>
            <Button className="mt-4 w-full bg-[#6b99d6] hover:bg-[#5c88c5]">Create</Button>
          </Card>
        </div>
      </div>
    </Card>
  );
}
