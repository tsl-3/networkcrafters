
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative overflow-hidden bg-background py-20 sm:py-32 isolate">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f46e5,#3b82f6)] opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Your Network, <br className="sm:hidden" />
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Manage your professional connections with AI-driven insights. 
              Automatically enhance contact profiles and discover collaboration opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contacts">
              <Button className="h-11 px-6 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:translate-y-[-2px]" onClick={handleGetStarted}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="h-11 px-6 rounded-lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="relative mx-auto overflow-hidden rounded-xl border bg-background shadow-xl dark:border-gray-800 max-w-4xl glass-card">
            <div className="bg-muted/30 dark:bg-muted/10 px-3 py-2 border-b flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground/70">AI-powered Network Management</div>
            </div>
            <div className="p-4 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-lg p-4 card-hover relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary/10 text-xs px-2 py-1 rounded-bl-lg">
                      {i === 1 ? '92% match' : i === 2 ? '87% match' : '76% match'}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-muted/50"></div>
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-muted/50 rounded"></div>
                        <div className="h-2 w-20 bg-muted/30 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-muted/30 rounded"></div>
                      <div className="h-2 w-5/6 bg-muted/30 rounded"></div>
                      <div className="h-2 w-4/6 bg-muted/30 rounded"></div>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      <div className="h-5 w-10 rounded-full bg-muted/50"></div>
                      <div className="h-5 w-12 rounded-full bg-muted/50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
