import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Contact, ContactTag, Industry } from "@/lib/types";
import { sampleContacts } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Tag, 
  X, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  ArrowUpDown,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Reusing the dashboard's color palette
const colorPalette = [
  "#6b99d6", // Primary
  "#8bb1e8", // Light
  "#4d7bb8", // Dark
  "#a8c6f0", // Very light
  "#5c88c5", // Mid-dark
  "#799ed9"  // Mid-light
];

const popularTags: ContactTag[] = [
  "founder", 
  "investor", 
  "developer", 
  "designer", 
  "important", 
  "follow-up"
];

const industries: Industry[] = [
  "technology",
  "finance",
  "healthcare",
  "education",
  "marketing"
];

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<ContactTag[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "date" | "match">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleAddContact = (contact: Contact) => {
    setContacts((prev) => [contact, ...prev]);
  };

  const toggleTag = (tag: ContactTag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedIndustry(null);
  };

  const toggleIndustry = (industry: Industry) => {
    if (selectedIndustry === industry) {
      setSelectedIndustry(null);
    } else {
      setSelectedIndustry(industry);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => contact.tags?.includes(tag));

    const matchesIndustry =
      !selectedIndustry || contact.industry === selectedIndustry;

    return matchesSearch && matchesTags && matchesIndustry;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "match") {
      const matchA = a.matchScore || 0;
      const matchB = b.matchScore || 0;
      return sortOrder === "asc"
        ? matchA - matchB
        : matchB - matchA;
    }
    return 0;
  });

  return (
    <div 
      className="flex min-h-screen flex-col bg-black font-sans antialiased"
      style={{
        backgroundImage: `url('/bg-geometry.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.4)' // 60% transparency
      }}
    >
      <Navbar />
      <main className="flex-1 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Contacts</h1>
              <p className="text-[#a8c6f0] mt-2 text-lg opacity-80">
                Manage your professional network
              </p>
            </div>
            <ContactForm onAddContact={handleAddContact} />
          </div>

          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a8c6f0]" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/70 border-[#6b99d6]/20 text-white placeholder-[#a8c6f0]/80 focus:ring-[#6b99d6]"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-gray-900/70 border-[#6b99d6]/20 text-[#a8c6f0] hover:bg-[#6b99d6]/20 hover:text-white">
                      <Filter className="h-4 w-4" />
                      Filter
                      {(selectedTags.length > 0 || selectedIndustry) && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-[#6b99d6] text-white">
                          {selectedTags.length + (selectedIndustry ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] bg-gray-900/90 border-[#6b99d6]/20 text-white">
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2 text-[#a8c6f0]">Industry</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {industries.map((industry) => (
                          <Badge
                            key={industry}
                            variant={selectedIndustry === industry ? "default" : "outline"}
                            className={`cursor-pointer capitalize ${
                              selectedIndustry === industry 
                                ? "bg-[#6b99d6] text-white" 
                                : "text-[#a8c6f0] border-[#6b99d6]/40 hover:bg-[#6b99d6]/20"
                            }`}
                            onClick={() => toggleIndustry(industry)}
                          >
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm font-medium mb-2 text-[#a8c6f0]">Popular Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {popularTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              selectedTags.includes(tag) 
                                ? "bg-[#6b99d6] text-white" 
                                : "text-[#a8c6f0] border-[#6b99d6]/40 hover:bg-[#6b99d6]/20"
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {(selectedTags.length > 0 || selectedIndustry) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-4 w-full text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20"
                          onClick={clearFilters}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-gray-900/70 border-[#6b99d6]/20 text-[#a8c6f0] hover:bg-[#6b99d6]/20 hover:text-white">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900/90 border-[#6b99d6]/20 text-white">
                    <DropdownMenuItem 
                      className={`${sortBy === "name" ? "bg-[#6b99d6]/20" : ""} text-[#a8c6f0] hover:bg-[#6b99d6]/30`}
                      onClick={() => {
                        setSortBy("name");
                        if (sortBy === "name") toggleSortOrder();
                      }}
                    >
                      Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`${sortBy === "date" ? "bg-[#6b99d6]/20" : ""} text-[#a8c6f0] hover:bg-[#6b99d6]/30`}
                      onClick={() => {
                        setSortBy("date");
                        if (sortBy === "date") toggleSortOrder();
                      }}
                    >
                      Date Added {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`${sortBy === "match" ? "bg-[#6b99d6]/20" : ""} text-[#a8c6f0] hover:bg-[#6b99d6]/30`}
                      onClick={() => {
                        setSortBy("match");
                        if (sortBy === "match") toggleSortOrder();
                      }}
                    >
                      Match Score {sortBy === "match" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex rounded-md border border-[#6b99d6]/20 overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none bg-gray-900/70 text-[#a8c6f0] hover:bg-[#6b99d6]/20 hover:text-white ${viewMode === "grid" ? "bg-[#6b99d6]/20" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none bg-gray-900/70 text-[#a8c6f0] hover:bg-[#6b99d6]/20 hover:text-white ${viewMode === "list" ? "bg-[#6b99d6]/20" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {(selectedTags.length > 0 || selectedIndustry) && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-[#a8c6f0]" />
                <span className="text-sm text-[#a8c6f0] opacity-80">Active filters:</span>
                {selectedIndustry && (
                  <Badge variant="outline" className="gap-1 capitalize bg-[#6b99d6]/20 text-[#a8c6f0] border-[#6b99d6]/40">
                    {selectedIndustry}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedIndustry(null)}
                    />
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1 bg-[#6b99d6]/20 text-[#a8c6f0] border-[#6b99d6]/40">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-[#a8c6f0] opacity-80">
              Showing <span className="font-medium text-white">{filteredContacts.length}</span>{" "}
              {filteredContacts.length === 1 ? "contact" : "contacts"}
            </p>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-900/70 backdrop-blur-md rounded-lg border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10">
              <div className="h-20 w-20 rounded-full bg-[#6b99d6]/10 flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-[#a8c6f0]/60" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No contacts found</h3>
              <p className="text-[#a8c6f0] opacity-80 max-w-md">
                {searchQuery || selectedTags.length > 0 || selectedIndustry
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Get started by adding your first contact."}
              </p>
              {(searchQuery || selectedTags.length > 0 || selectedIndustry) && (
                <Button
                  variant="outline"
                  className="mt-4 bg-gray-900/70 border-[#6b99d6]/20 text-[#a8c6f0] hover:bg-[#6b99d6]/20 hover:text-white"
                  onClick={() => {
                    setSearchQuery("");
                    clearFilters();
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContacts.map((contact) => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  compact={viewMode === "grid"}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;
