
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { 
  CheckCircle, 
  Database, 
  Users, 
  Sparkles, 
  BarChart, 
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Contact Management",
    description: "Store and organize all your professional connections in one place with detailed profiles."
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: "AI Data Enrichment",
    description: "Automatically enhance contact profiles with information scraped from social media."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Smart Matchmaking",
    description: "Discover potential collaboration opportunities based on skills and interests."
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: "Network Analytics",
    description: "Gain insights about your professional network with visual analytics."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Message Generation",
    description: "Create personalized outreach messages powered by AI for better engagement."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Follow-up Reminders",
    description: "Never miss an important follow-up with automated reminders and workflows."
  }
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                Revolutionize how you manage your professional network with our AI-powered tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-background rounded-xl p-6 border glass-card card-hover" 
                  style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f46e5,#3b82f6)] opacity-30 blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Network?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start building a smarter contact list today with AI-powered insights and automatic data enrichment.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/contacts">
                  <Button className="h-11 px-6 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="h-11 px-6 rounded-lg">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-4 md:mb-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <span className="text-lg">Rolodex AI</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Rolodex AI. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
