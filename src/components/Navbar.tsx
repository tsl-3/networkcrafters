
import { Link, useLocation } from "react-router-dom";
import { Users, BarChart, Menu, X, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { path: "/contacts", label: "Contacts", icon: <Users className="h-4 w-4 mr-1" /> },
    { path: "/ai", label: "OMNIS", icon: <Sparkles className="h-4 w-4 mr-1" /> },
    { path: "/agents", label: "Agents", icon: <Bot className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header 
      className="sticky top-0 z-40 bg-gray-900/70 backdrop-blur-md border-b border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/placeholder.svg" 
            alt="Logo" 
            className="h-64 w-64 object-contain"
          />
        </Link>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center text-sm font-medium transition-colors ${
                isActive(item.path) 
                  ? "text-[#6b99d6]" 
                  : "text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20 px-2 py-1 rounded-md"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-gray-900/90 backdrop-blur-md z-50 md:hidden animate-fade-in">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-4 text-sm font-medium ${
                    isActive(item.path) 
                      ? "text-[#6b99d6]" 
                      : "text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20"
                  }`}
                  onClick={closeMenu}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
