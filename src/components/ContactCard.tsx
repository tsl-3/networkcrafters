
import { Contact, ContactTag } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, MapPin, Phone, Briefcase, Linkedin, Twitter, Instagram, Facebook, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ContactCardProps {
  contact: Contact;
  compact?: boolean;
}

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
      return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
    case "twitter":
      return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
    case "instagram":
      return <Instagram className="h-4 w-4 text-[#E1306C]" />;
    case "facebook":
      return <Facebook className="h-4 w-4 text-[#4267B2]" />;
    case "github":
      return <Github className="h-4 w-4" />;
    default:
      return null;
  }
};

export function ContactCard({ contact, compact = false }: ContactCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (compact) {
    return (
      <Card className="overflow-hidden h-full card-hover border border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={contact.imageUrl} alt={contact.name} />
              <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              {contact.jobTitle && (
                <p className="text-xs text-muted-foreground">
                  {contact.jobTitle}{contact.company ? ` at ${contact.company}` : ""}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {contact.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag as ContactTag)}`}>
                {tag}
              </Badge>
            ))}
            {(contact.tags?.length || 0) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{(contact.tags?.length || 0) - 2} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <Link to={`/contacts/${contact.id}`} className="w-full">
            <Button
              variant="ghost"
              className="w-full rounded-t-none h-9 bg-muted/30 hover:bg-muted/50 flex gap-2 items-center justify-center text-xs"
            >
              View Contact
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full card-hover border border-border/50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={contact.imageUrl} alt={contact.name} />
              <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{contact.name}</h3>
              {contact.jobTitle && (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {contact.jobTitle}{contact.company ? ` at ${contact.company}` : ""}
                </p>
              )}
              {contact.lastContacted && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  Last contacted {formatDistanceToNow(new Date(contact.lastContacted), { addSuffix: true })}
                </p>
              )}
            </div>
          </div>
          {contact.aiConfidence && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {contact.aiConfidence}% AI confidence
            </div>
          )}
        </div>

        {contact.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{contact.bio}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {contact.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{contact.location}</span>
            </div>
          )}
          {contact.industry && (
            <div className="flex items-center gap-2 text-sm capitalize">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{contact.industry}</span>
            </div>
          )}
        </div>

        {contact.socials && contact.socials.length > 0 && (
          <div className="flex gap-2 mb-4">
            {contact.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors"
                title={`${social.platform}: ${social.handle}`}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {contact.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className={`${getTagColor(tag as ContactTag)}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Link to={`/contacts/${contact.id}`} className="w-full">
          <Button
            variant="ghost"
            className="w-full rounded-t-none h-10 bg-muted/30 hover:bg-muted/50"
          >
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
