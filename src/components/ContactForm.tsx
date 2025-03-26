
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Linkedin, Twitter, Instagram, Facebook, AlertCircle, Loader2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  onAddContact?: (contact: Contact) => void;
}

export function ContactForm({ onAddContact }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuccess, setAiSuccess] = useState<boolean | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    linkedin: false,
    twitter: false,
    instagram: false,
    facebook: false,
  });
  const [handles, setHandles] = useState({
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });
  const [manualFormData, setManualFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    bio: "",
  });

  const { toast } = useToast();

  const handlePlatformChange = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms({
      ...selectedPlatforms,
      [platform]: !selectedPlatforms[platform],
    });
  };

  const handleHandleChange = (platform: keyof typeof handles, value: string) => {
    setHandles({
      ...handles,
      [platform]: value,
    });
  };

  const handleManualFormChange = (field: keyof typeof manualFormData, value: string) => {
    setManualFormData({
      ...manualFormData,
      [field]: value,
    });
  };

  const processAIContact = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Check if any platforms were selected and handles provided
      const hasValidInput = Object.entries(selectedPlatforms).some(
        ([platform, isSelected]) => isSelected && handles[platform as keyof typeof handles]
      );
      
      if (hasValidInput) {
        setAiSuccess(true);
        // Simulate successful processing
        setTimeout(() => {
          closeDialogAndReset();
          
          // Create a mock contact from the AI process
          const newContact: Contact = {
            id: `c${Math.floor(Math.random() * 10000)}`,
            name: "AI Generated Contact",
            jobTitle: "Generated Position",
            company: "Generated Company",
            email: `contact${Math.floor(Math.random() * 1000)}@example.com`,
            bio: "This contact was generated using AI from social media profiles.",
            createdAt: new Date(),
            updatedAt: new Date(),
            aiConfidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
            tags: ["ai-generated", "follow-up"],
            socials: Object.entries(selectedPlatforms)
              .filter(([_, isSelected]) => isSelected)
              .map(([platform]) => ({
                platform: platform as any,
                handle: handles[platform as keyof typeof handles],
                url: `https://${platform}.com/${handles[platform as keyof typeof handles].replace('@', '')}`,
              })),
          };
          
          if (onAddContact) {
            onAddContact(newContact);
          }
          
          toast({
            title: "Contact Added Successfully",
            description: "AI has created a new contact from social profiles.",
          });
        }, 2000);
      } else {
        setAiSuccess(false);
      }
    }, 2000);
  };

  const addManualContact = () => {
    if (!manualFormData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter at least a name for the contact.",
        variant: "destructive",
      });
      return;
    }

    // Create a contact from manual form
    const newContact: Contact = {
      id: `c${Math.floor(Math.random() * 10000)}`,
      name: manualFormData.name,
      jobTitle: manualFormData.jobTitle,
      company: manualFormData.company,
      email: manualFormData.email,
      phone: manualFormData.phone,
      bio: manualFormData.bio,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["manually-added"],
    };

    if (onAddContact) {
      onAddContact(newContact);
    }

    toast({
      title: "Contact Added",
      description: "The contact has been added successfully.",
    });

    closeDialogAndReset();
  };

  const closeDialogAndReset = () => {
    setIsOpen(false);
    // Reset form after a delay to allow the dialog close animation to complete
    setTimeout(() => {
      setSelectedPlatforms({
        linkedin: false,
        twitter: false,
        instagram: false,
        facebook: false,
      });
      setHandles({
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
      });
      setManualFormData({
        name: "",
        jobTitle: "",
        company: "",
        email: "",
        phone: "",
        bio: "",
      });
      setAiSuccess(null);
      setIsLoading(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Create a new contact manually or let AI build a profile from social media.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ai" className="mt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="ai">Try OMNIS Free</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="py-4">
            {aiSuccess === true ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium text-center">Contact Created Successfully</h3>
                <p className="text-center text-muted-foreground">
                  AI has successfully created a contact from the provided social profiles.
                </p>
              </div>
            ) : aiSuccess === false ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-medium text-center">Insufficient Data</h3>
                <p className="text-center text-muted-foreground">
                  Please select at least one social platform and provide a valid handle.
                </p>
                <Button variant="outline" onClick={() => setAiSuccess(null)}>
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Select social media platforms and enter profile handles or URLs to let AI create a detailed contact profile.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="linkedin" 
                        checked={selectedPlatforms.linkedin}
                        onCheckedChange={() => handlePlatformChange('linkedin')}
                      />
                      <Label htmlFor="linkedin" className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                        LinkedIn
                      </Label>
                    </div>
                    {selectedPlatforms.linkedin && (
                      <div className="pl-6">
                        <Input 
                          placeholder="linkedin.com/in/username" 
                          value={handles.linkedin}
                          onChange={(e) => handleHandleChange('linkedin', e.target.value)}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="twitter" 
                        checked={selectedPlatforms.twitter}
                        onCheckedChange={() => handlePlatformChange('twitter')}
                      />
                      <Label htmlFor="twitter" className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                        Twitter/X
                      </Label>
                    </div>
                    {selectedPlatforms.twitter && (
                      <div className="pl-6">
                        <Input 
                          placeholder="@username or twitter.com/username" 
                          value={handles.twitter}
                          onChange={(e) => handleHandleChange('twitter', e.target.value)}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="instagram" 
                        checked={selectedPlatforms.instagram}
                        onCheckedChange={() => handlePlatformChange('instagram')}
                      />
                      <Label htmlFor="instagram" className="flex items-center">
                        <Instagram className="h-4 w-4 mr-2 text-[#E1306C]" />
                        Instagram
                      </Label>
                    </div>
                    {selectedPlatforms.instagram && (
                      <div className="pl-6">
                        <Input 
                          placeholder="@username or instagram.com/username" 
                          value={handles.instagram}
                          onChange={(e) => handleHandleChange('instagram', e.target.value)}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="facebook" 
                        checked={selectedPlatforms.facebook}
                        onCheckedChange={() => handlePlatformChange('facebook')}
                      />
                      <Label htmlFor="facebook" className="flex items-center">
                        <Facebook className="h-4 w-4 mr-2 text-[#4267B2]" />
                        Facebook
                      </Label>
                    </div>
                    {selectedPlatforms.facebook && (
                      <div className="pl-6">
                        <Input 
                          placeholder="facebook.com/username" 
                          value={handles.facebook}
                          onChange={(e) => handleHandleChange('facebook', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={processAIContact} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Create Contact with OMNIS AI"
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  OMNIS will attempt to extract public data with at least 60% confidence.
                </p>
              </>
            )}
          </TabsContent>

          <TabsContent value="manual" className="py-4 space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Full name" 
                  value={manualFormData.name}
                  onChange={(e) => handleManualFormChange('name', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    placeholder="Job title" 
                    value={manualFormData.jobTitle}
                    onChange={(e) => handleManualFormChange('jobTitle', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    placeholder="Company" 
                    value={manualFormData.company}
                    onChange={(e) => handleManualFormChange('company', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email address" 
                    value={manualFormData.email}
                    onChange={(e) => handleManualFormChange('email', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="Phone number" 
                    value={manualFormData.phone}
                    onChange={(e) => handleManualFormChange('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio/Notes</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Brief description or notes about this contact" 
                  value={manualFormData.bio}
                  onChange={(e) => handleManualFormChange('bio', e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={addManualContact}>Add Contact</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
