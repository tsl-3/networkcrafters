
import { useState } from "react";
import { Contact, ContactTag } from "@/lib/types";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Edit, 
  MessageSquare,
  User,
  Linkedin,
  Twitter, 
  Instagram, 
  Facebook, 
  Github,
  CheckCircle2,
  Tag,
  Star,
  Clock,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { formatDistanceToNow, format } from "date-fns";

interface ContactDetailProps {
  contact: Contact;
}

// Same tag colors from ContactCard
const tagColors: Record<ContactTag, string> = {
  investor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  founder: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  developer: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  designer: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  marketer: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  sales: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  partner: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  client: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  mentor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  mentee: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  acquaintance: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  friend: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  important: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "follow-up": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  lead: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

const getTagColor = (tag: ContactTag) => {
  return tagColors[tag] || "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
};

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "linkedin":
      return <Linkedin className="h-5 w-5 text-[#0077B5]" />;
    case "twitter":
      return <Twitter className="h-5 w-5 text-[#1DA1F2]" />;
    case "instagram":
      return <Instagram className="h-5 w-5 text-[#E1306C]" />;
    case "facebook":
      return <Facebook className="h-5 w-5 text-[#4267B2]" />;
    case "github":
      return <Github className="h-5 w-5" />;
    default:
      return null;
  }
};

export function ContactDetail({ contact }: ContactDetailProps) {
  const [notes, setNotes] = useState(contact.notes || "");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };

  const generateMessage = () => {
    setIsGeneratingMessage(true);
    
    // Simulate AI generating a message
    setTimeout(() => {
      const templates = [
        `Hi ${contact.name},\n\nI hope this message finds you well. I noticed your impressive work at ${contact.company} in the ${contact.industry} industry. I'd love to connect and explore potential collaboration opportunities.\n\nBest regards,\n[Your Name]`,
        `Hello ${contact.name},\n\nI recently came across your profile and was impressed by your experience as ${contact.jobTitle} at ${contact.company}. I'm reaching out because I believe there might be synergies between our work. Would you be open to a brief conversation next week?\n\nLooking forward to hearing from you,\n[Your Name]`,
        `Dear ${contact.name},\n\nI'm writing to you based on our shared interest in ${contact.industry}. Your background in ${contact.skills?.join(", ") || "your field"} aligns perfectly with a project I'm currently developing. I'd be grateful for the opportunity to discuss this with you further.\n\nWarm regards,\n[Your Name]`
      ];
      
      setGeneratedMessage(templates[Math.floor(Math.random() * templates.length)]);
      setIsGeneratingMessage(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Message has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main contact info */}
        <div className="lg:w-2/3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-20 w-20 border">
                    <AvatarImage src={contact.imageUrl} alt={contact.name} />
                    <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-semibold">{contact.name}</h1>
                      {contact.matchScore && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {contact.matchScore}% match
                        </Badge>
                      )}
                    </div>
                    {contact.jobTitle && (
                      <p className="text-lg text-muted-foreground">
                        {contact.jobTitle}{contact.company ? ` at ${contact.company}` : ""}
                      </p>
                    )}
                    {contact.industry && (
                      <p className="text-sm text-muted-foreground capitalize flex items-center gap-1.5 mt-1">
                        <Briefcase className="h-4 w-4" />
                        {contact.industry}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>

              {contact.bio && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                  <p className="text-sm">{contact.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {contact.email && (
                  <div className="flex items-center gap-3 border rounded-md p-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Email</p>
                      <p className="text-sm">{contact.email}</p>
                    </div>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-3 border rounded-md p-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Phone</p>
                      <p className="text-sm">{contact.phone}</p>
                    </div>
                  </div>
                )}
                {contact.location && (
                  <div className="flex items-center gap-3 border rounded-md p-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Location</p>
                      <p className="text-sm">{contact.location}</p>
                    </div>
                  </div>
                )}
                {contact.lastContacted && (
                  <div className="flex items-center gap-3 border rounded-md p-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Last Contacted</p>
                      <p className="text-sm">
                        {formatDistanceToNow(new Date(contact.lastContacted), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {contact.skills && contact.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {contact.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {contact.tags && contact.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className={`${getTagColor(tag as ContactTag)}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  <Button size="sm" variant="outline" onClick={handleSaveNotes}>Save</Button>
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this contact here..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Social Profiles */}
          {contact.socials && contact.socials.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Social Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contact.socials.map((social) => (
                  <a 
                    key={social.platform} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getSocialIcon(social.platform)}
                      <div>
                        <p className="text-sm font-medium capitalize">{social.platform}</p>
                        <p className="text-xs text-muted-foreground">{social.handle}</p>
                      </div>
                    </div>
                    {social.followers && (
                      <Badge variant="secondary" className="text-xs">
                        {social.followers.toLocaleString()} followers
                      </Badge>
                    )}
                  </a>
                ))}
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          {contact.aiConfidence && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Confidence Score</p>
                      <p className="text-xs text-muted-foreground">Profile accuracy</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {contact.aiConfidence}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Automatic Tags</p>
                      <p className="text-xs text-muted-foreground">Based on profile analysis</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {(contact.tags?.length || 0)} tags
                  </Badge>
                </div>

                {contact.matchScore && (
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Match Score</p>
                        <p className="text-xs text-muted-foreground">Collaboration potential</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                      {contact.matchScore}%
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Follow-up Reminder</p>
                      <p className="text-xs text-muted-foreground">Suggested next action</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    In 7 days
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message Generation */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Generate Intro Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate Introduction Message</DialogTitle>
                <DialogDescription>
                  Let AI create a personalized message based on this contact's profile.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {isGeneratingMessage ? (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center text-muted-foreground">
                      Generating personalized message...
                    </p>
                  </div>
                ) : generatedMessage ? (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-muted/30">
                      <pre className="whitespace-pre-wrap text-sm font-sans">{generatedMessage}</pre>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This message was generated based on {contact.name}'s profile information. Feel free to edit it before sending.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <User className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Click the button below to generate a personalized introduction message for {contact.name}.
                    </p>
                    <Button onClick={generateMessage}>
                      Generate Message
                    </Button>
                  </div>
                )}
              </div>
              {generatedMessage && (
                <DialogFooter>
                  <Button variant="outline" onClick={() => setGeneratedMessage("")}>
                    Reset
                  </Button>
                  <Button onClick={() => copyToClipboard(generatedMessage)}>
                    Copy to Clipboard
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
