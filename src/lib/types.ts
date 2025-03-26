
export type SocialHandle = {
  platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'github' | 'other';
  handle: string;
  url: string;
  followers?: number;
};

export type ContactTag = 
  | 'investor' 
  | 'founder' 
  | 'developer' 
  | 'designer' 
  | 'marketer' 
  | 'sales' 
  | 'partner' 
  | 'client' 
  | 'mentor' 
  | 'mentee'
  | 'acquaintance'
  | 'friend'
  | 'important'
  | 'follow-up'
  | 'lead'
  | string;

export type Industry =
  | 'technology'
  | 'finance'
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'real estate'
  | 'entertainment'
  | 'hospitality'
  | 'consulting'
  | string;
  
export interface Contact {
  id: string;
  name: string;
  jobTitle?: string;
  company?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  industry?: Industry;
  skills?: string[];
  socials?: SocialHandle[];
  tags?: ContactTag[];
  notes?: string;
  lastContacted?: Date;
  createdAt: Date;
  updatedAt: Date;
  aiConfidence?: number;
  matchScore?: number;
  imageUrl?: string;
}
