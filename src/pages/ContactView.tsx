
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ContactDetail } from "@/components/ContactDetail";
import { sampleContacts } from "@/lib/sample-data";
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

const ContactView = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch contact
    const timer = setTimeout(() => {
      const foundContact = sampleContacts.find((c) => c.id === id);
      setContact(foundContact || null);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/20">
          <div className="container py-8 px-4 md:px-6">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Contact Details</h1>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading contact information...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/20">
          <div className="container py-8 px-4 md:px-6">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Contact Not Found</h1>
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Contact not found</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find the contact you're looking for. It may have been deleted or you might have followed an invalid link.
              </p>
              <Link to="/contacts">
                <Button>View All Contacts</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container py-8 px-4 md:px-6">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Contact Details</h1>
          </div>
          <ContactDetail contact={contact} />
        </div>
      </main>
    </div>
  );
};

export default ContactView;
