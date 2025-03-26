
import { Contact } from "./types";

export const sampleContacts: Contact[] = [
  {
    id: "c1",
    name: "Alex Morgan",
    jobTitle: "CEO & Founder",
    company: "TechVision AI",
    email: "alex@techvision.ai",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Serial entrepreneur building AI solutions for enterprise clients. Previously founded and sold DataSync to Google.",
    industry: "technology",
    skills: ["AI/ML", "Leadership", "Product Strategy", "Fundraising"],
    socials: [
      {
        platform: "linkedin",
        handle: "alexmorgan",
        url: "https://linkedin.com/in/alexmorgan",
        followers: 15320
      },
      {
        platform: "twitter",
        handle: "@alexmorgan",
        url: "https://twitter.com/alexmorgan",
        followers: 32100
      }
    ],
    tags: ["founder", "technology", "investor", "important"],
    notes: "Met at TechCrunch Disrupt. Interested in co-investment opportunities.",
    lastContacted: new Date("2023-09-15"),
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-09-15"),
    aiConfidence: 92,
    matchScore: 87,
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "c2",
    name: "Sarah Chen",
    jobTitle: "Lead Product Designer",
    company: "Designify",
    email: "sarah@designify.co",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    bio: "Award-winning product designer with experience at top tech companies. Passionate about creating intuitive and accessible user experiences.",
    industry: "technology",
    skills: ["UI/UX", "Design Systems", "User Research", "Prototyping"],
    socials: [
      {
        platform: "linkedin",
        handle: "sarahchen",
        url: "https://linkedin.com/in/sarahchen",
        followers: 8750
      },
      {
        platform: "instagram",
        handle: "@sarahchendesigns",
        url: "https://instagram.com/sarahchendesigns",
        followers: 21500
      }
    ],
    tags: ["designer", "technology", "follow-up"],
    notes: "Looking for freelance opportunities. Has availability starting next month.",
    lastContacted: new Date("2023-10-05"),
    createdAt: new Date("2023-06-22"),
    updatedAt: new Date("2023-10-05"),
    aiConfidence: 85,
    matchScore: 72,
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: "c3",
    name: "Marcus Johnson",
    jobTitle: "Investment Partner",
    company: "Sequoia Capital",
    email: "marcus@sequoiacap.com",
    phone: "+1 (555) 234-5678",
    location: "Menlo Park, CA",
    bio: "Venture capitalist with focus on early-stage B2B SaaS and AI/ML startups. Previously led product at Salesforce.",
    industry: "finance",
    skills: ["Venture Capital", "Deal Sourcing", "Due Diligence", "Board Advisor"],
    socials: [
      {
        platform: "linkedin",
        handle: "marcusjohnson",
        url: "https://linkedin.com/in/marcusjohnson",
        followers: 12400
      },
      {
        platform: "twitter",
        handle: "@mjohnsonvc",
        url: "https://twitter.com/mjohnsonvc",
        followers: 18700
      }
    ],
    tags: ["investor", "finance", "important"],
    notes: "Looking for AI/ML startups in healthcare and fintech. $5-10M check sizes for Series A.",
    lastContacted: new Date("2023-11-20"),
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-11-20"),
    aiConfidence: 89,
    matchScore: 91,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: "c4",
    name: "Priya Patel",
    jobTitle: "Senior Software Engineer",
    company: "Netflix",
    email: "priya@netflix.com",
    phone: "+1 (555) 345-6789",
    location: "Los Angeles, CA",
    bio: "Full-stack engineer specializing in scalable distributed systems and microservices architecture.",
    industry: "technology",
    skills: ["React", "Node.js", "Microservices", "AWS", "System Design"],
    socials: [
      {
        platform: "linkedin",
        handle: "priyapatel",
        url: "https://linkedin.com/in/priyapatel",
        followers: 6300
      },
      {
        platform: "github",
        handle: "priyacodes",
        url: "https://github.com/priyacodes",
        followers: 4200
      }
    ],
    tags: ["developer", "technology", "follow-up"],
    notes: "Expert in streaming architecture. Open to advising roles.",
    lastContacted: new Date("2023-10-15"),
    createdAt: new Date("2023-07-18"),
    updatedAt: new Date("2023-10-15"),
    aiConfidence: 78,
    matchScore: 64,
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: "c5",
    name: "David Kim",
    jobTitle: "Chief Marketing Officer",
    company: "GrowthX",
    email: "david@growthx.io",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    bio: "Growth marketing expert with experience scaling B2B and D2C brands from zero to $100M+ ARR.",
    industry: "marketing",
    skills: ["Growth Strategy", "Paid Acquisition", "Conversion Optimization", "Brand Development"],
    socials: [
      {
        platform: "linkedin",
        handle: "davidkim",
        url: "https://linkedin.com/in/davidkim",
        followers: 9800
      },
      {
        platform: "twitter",
        handle: "@davidkimgrowth",
        url: "https://twitter.com/davidkimgrowth",
        followers: 27500
      }
    ],
    tags: ["marketer", "lead", "follow-up"],
    notes: "Looking for consulting opportunities with early-stage startups.",
    lastContacted: new Date("2023-11-05"),
    createdAt: new Date("2023-08-30"),
    updatedAt: new Date("2023-11-05"),
    aiConfidence: 81,
    matchScore: 76,
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];

export const industryCounts = {
  technology: 42,
  finance: 18,
  healthcare: 15,
  marketing: 12,
  education: 8,
  other: 15
};

export const tagCounts = {
  founder: 28,
  investor: 22,
  developer: 35,
  designer: 19,
  marketer: 17,
  "follow-up": 31,
  important: 24,
  lead: 15,
  partner: 12,
  other: 23
};

export const matchSuggestions = [
  {
    contact1: "c1",
    contact2: "c3",
    score: 87,
    reason: "Both interested in AI investments and technology partnerships"
  },
  {
    contact1: "c2",
    contact2: "c4",
    score: 72,
    reason: "Design and engineering collaboration potential for product development"
  },
  {
    contact1: "c5",
    contact2: "c1",
    score: 79,
    reason: "Marketing expertise could help scale TechVision AI's customer acquisition"
  }
];
