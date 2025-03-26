
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

  // Filter and sort contacts
  const filteredContacts = contacts.filter((contact) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => contact.tags?.includes(tag));

    // Filter by industry
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container py-8 px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
              <p className="text-muted-foreground mt-1">
                Manage your professional network
              </p>
            </div>
            <ContactForm onAddContact={handleAddContact} />
          </div>

          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                      {(selectedTags.length > 0 || selectedIndustry) && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-white">
                          {selectedTags.length + (selectedIndustry ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Industry</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {industries.map((industry) => (
                          <Badge
                            key={industry}
                            variant={selectedIndustry === industry ? "default" : "outline"}
                            className="cursor-pointer capitalize"
                            onClick={() => toggleIndustry(industry)}
                          >
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm font-medium mb-2">Popular Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {popularTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
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
                          className="mt-4 w-full"
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
                    <Button variant="outline" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className={sortBy === "name" ? "bg-muted" : ""}
                      onClick={() => {
                        setSortBy("name");
                        if (sortBy === "name") toggleSortOrder();
                      }}
                    >
                      Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortBy === "date" ? "bg-muted" : ""}
                      onClick={() => {
                        setSortBy("date");
                        if (sortBy === "date") toggleSortOrder();
                      }}
                    >
                      Date Added {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortBy === "match" ? "bg-muted" : ""}
                      onClick={() => {
                        setSortBy("match");
                        if (sortBy === "match") toggleSortOrder();
                      }}
                    >
                      Match Score {sortBy === "match" && (sortOrder === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex rounded-md border overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${
                      viewMode === "grid" ? "bg-muted" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${
                      viewMode === "list" ? "bg-muted" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active filters display */}
            {(selectedTags.length > 0 || selectedIndustry) && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedIndustry && (
                  <Badge variant="outline" className="gap-1 capitalize">
                    {selectedIndustry}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedIndustry(null)}
                    />
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1">
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
                  className="h-7 text-xs"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Contact count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredContacts.length}</span>{" "}
              {filteredContacts.length === 1 ? "contact" : "contacts"}
            </p>
          </div>

          {/* Contacts list/grid */}
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-medium mb-2">No contacts found</h3>
              <p className="text-muted-foreground max-w-md">
                {searchQuery || selectedTags.length > 0 || selectedIndustry
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Get started by adding your first contact."}
              </p>
              {(searchQuery || selectedTags.length > 0 || selectedIndustry) && (
                <Button
                  variant="outline"
                  className="mt-4"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
