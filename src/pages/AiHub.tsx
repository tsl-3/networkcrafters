
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AiHubHeader } from "@/components/ai/AiHubHeader";
import { AiTabNavigation } from "@/components/ai/AiTabNavigation";
import { LeadGenerationTab } from "@/components/ai/tabs/LeadGenerationTab";
import { IdeaGenerationTab } from "@/components/ai/tabs/IdeaGenerationTab";
import { ChatTab } from "@/components/ai/tabs/ChatTab";
import { ResearchTab } from "@/components/ai/tabs/ResearchTab";
import { ContentCreationTab } from "@/components/ai/tabs/ContentCreationTab";
import { ContactResearchTab } from "@/components/ai/tabs/ContactResearchTab";
import { WorkflowTab } from "@/components/ai/tabs/WorkflowTab";
import { Navbar } from "@/components/Navbar";

export default function AiHub() {
  const [activeTab, setActiveTab] = useState("lead-generation");

  return (
    <div className="min-h-screen bg-[#131417] text-white">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <AiHubHeader />
          
          <Tabs 
            defaultValue="lead-generation" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <div className="overflow-auto">
              <AiTabNavigation activeTab={activeTab} />
            </div>

            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full bg-gray-800/50 border-gray-700">
                    Select AI Tool
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 border-gray-800">
                  <div className="flex flex-col space-y-2 mt-4">
                    {[
                      { value: "lead-generation", label: "Lead Generation", icon: "UserPlus" },
                      { value: "idea-generation", label: "Idea Generation", icon: "Lightbulb" },
                      { value: "chat", label: "Chat", icon: "MessageSquare" },
                      { value: "research", label: "Research", icon: "Search" },
                      { value: "content", label: "Content Creation", icon: "FileText" },
                      { value: "contact-research", label: "Contact Research", icon: "Users" },
                      { value: "workflow", label: "Marketing Workflow", icon: "Workflow" }
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={activeTab === item.value ? "bg-[#6b99d6]" : ""}
                        onClick={() => setActiveTab(item.value)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <TabsContent value="lead-generation">
              <LeadGenerationTab />
            </TabsContent>
            
            <TabsContent value="idea-generation">
              <IdeaGenerationTab />
            </TabsContent>
            
            <TabsContent value="chat">
              <ChatTab />
            </TabsContent>
            
            <TabsContent value="research">
              <ResearchTab />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentCreationTab />
            </TabsContent>
            
            <TabsContent value="contact-research">
              <ContactResearchTab />
            </TabsContent>
            
            <TabsContent value="workflow">
              <WorkflowTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
