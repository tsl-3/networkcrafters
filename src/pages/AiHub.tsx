
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  UserPlus,
  Lightbulb,
  MessageSquare,
  Search,
  FileText,
  Users,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AiHub() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-950">
      <Navbar />
      <main className="container flex-1 py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#6b99d6]/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#6b99d6]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">OMNIS Hub</h1>
              <p className="text-[#a8c6f0]">Your AI-powered assistant for all business needs</p>
            </div>
          </div>

          <Tabs defaultValue="lead-generation" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-gray-800/50 p-1">
              <TabsTrigger value="lead-generation" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Lead Generation</span>
                <span className="sm:hidden">Leads</span>
              </TabsTrigger>
              <TabsTrigger value="idea-generation" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <Lightbulb className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Idea Generation</span>
                <span className="sm:hidden">Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="research" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <Search className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Research</span>
                <span className="sm:hidden">Research</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Content Creation</span>
                <span className="sm:hidden">Content</span>
              </TabsTrigger>
              <TabsTrigger value="contact-research" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Contact Research</span>
                <span className="sm:hidden">Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-[#6b99d6] data-[state=active]:text-white">
                <Workflow className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Marketing Workflow</span>
                <span className="sm:hidden">Workflow</span>
              </TabsTrigger>
            </TabsList>

            {/* Lead Generation Tab Content */}
            <TabsContent value="lead-generation" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
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
            </TabsContent>

            {/* Idea Generation Tab Content */}
            <TabsContent value="idea-generation" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
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
            </TabsContent>

            {/* Chat Tab Content */}
            <TabsContent value="chat" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm flex flex-col h-[calc(100vh-300px)]">
                <h2 className="text-xl font-semibold text-white mb-4">OMNIS Chat Assistant</h2>
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6b99d6]/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-[#6b99d6]" />
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-[#a8c6f0] max-w-[80%]">
                      Hello! I'm OMNIS, your AI assistant. How can I help you today?
                    </div>
                  </div>
                  {/* Chat messages would be dynamically added here */}
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    className="flex-1 bg-gray-800/50 border-gray-700 rounded-md p-3 text-white focus:ring-[#6b99d6] focus:border-[#6b99d6]"
                    placeholder="Type your message here..."
                  />
                  <Button className="bg-[#6b99d6] hover:bg-[#5c88c5]">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Research Tab Content */}
            <TabsContent value="research" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-4">Deep Research & Analysis</h2>
                <p className="text-[#a8c6f0] mb-6">
                  Get comprehensive insights on any topic, company, or industry. OMNIS combines data from multiple 
                  sources to provide you with in-depth analysis.
                </p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    className="w-full bg-gray-800/50 border-gray-700 rounded-md p-3 text-white focus:ring-[#6b99d6] focus:border-[#6b99d6]"
                    placeholder="Enter a topic, company, or industry to research..."
                  />
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[#6b99d6] hover:bg-[#5c88c5]">
                      <Search className="h-4 w-4 mr-2" />
                      Research Topic
                    </Button>
                    <Button variant="outline" className="border-[#6b99d6] text-[#6b99d6] hover:bg-[#6b99d6]/10">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Content Creation Tab Content */}
            <TabsContent value="content" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
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
            </TabsContent>

            {/* Contact Research Tab Content */}
            <TabsContent value="contact-research" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
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
            </TabsContent>

            {/* Marketing Workflow Tab Content */}
            <TabsContent value="workflow" className="mt-6 space-y-6">
              <Card className="bg-gray-800/30 border-gray-700 p-6 backdrop-blur-sm">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
