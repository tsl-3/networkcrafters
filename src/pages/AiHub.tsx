
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AiTabNavigation } from "@/components/ai/AiTabNavigation";
import { AiHubHeader } from "@/components/ai/AiHubHeader";
import { LeadGenerationTab } from "@/components/ai/tabs/LeadGenerationTab";
import { IdeaGenerationTab } from "@/components/ai/tabs/IdeaGenerationTab";
import { ChatTab } from "@/components/ai/tabs/ChatTab";
import { ResearchTab } from "@/components/ai/tabs/ResearchTab";
import { ContentCreationTab } from "@/components/ai/tabs/ContentCreationTab";
import { ContactResearchTab } from "@/components/ai/tabs/ContactResearchTab";
import { WorkflowTab } from "@/components/ai/tabs/WorkflowTab";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

export default function AiHub() {
  const [activeTab, setActiveTab] = useState("lead-generation");
  
  return (
    <div 
      className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-950"
      style={{
        backgroundImage: 'url(/bg-curve-wall.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(17, 24, 39, 0.85)', /* Dark blue with 85% opacity */
      }}
    >
      <Navbar />
      <main className="container flex-1 py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-6 animate-fade-in">
          <AiHubHeader />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <AiTabNavigation activeTab={activeTab} />
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
      </main>
    </div>
  );
}
