
import { Link, useLocation } from "react-router-dom";
import { Users, Home, BarChart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
   # { path: "/", label: "Home", icon: <Home className="h-4 w-4 mr-1" /> },
    { path: "/dashboard", label: "Dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { path: "/contacts", label: "Contacts", icon: <Users className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground" onClick={closeMenu}>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary">
            <span className="text-white text-sm font-bold">R</span>
          </div>
          <span className="text-lg">Rolodex AI</span>
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center ${
                isActive(item.path) ? "nav-link-active" : "nav-link"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle & CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button className="bg-primary hover:bg-primary/90 rounded-lg text-white">
            Try OMNIS
          </Button>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-background z-50 animate-fade-in md:hidden">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-4 ${
                    isActive(item.path)
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                  onClick={closeMenu}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between p-4 border-t">
                <ThemeToggle />
                <Button className="bg-primary hover:bg-primary/90 rounded-lg text-white">
                  Try OMNIS
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
