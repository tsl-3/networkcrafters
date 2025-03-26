
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Demo auth - in a real app, this would be replaced with actual authentication
      document.cookie = "auth_token=demo; path=/; max-age=86400";
      toast({
        title: "Login successful",
        description: "Welcome to Initium",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black">
      {/* Background with dark blue and uploaded image with transparency */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-100"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/bg-curve-wall.jpg')" }}
        ></div>
      </div>

      {/* Logo positioned at top center */}
      <div className="absolute top-8 z-10">
        <div className="flex items-center justify-center">
          <img src="/placeholder.svg" alt="Logo" className="h-auto w-[600px]" />
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 z-10 glass-card bg-background/70 backdrop-blur-sm border-gray-800">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-muted/50 border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-muted/50 border-input"
              />
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Index;
