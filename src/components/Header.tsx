import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Tooling", href: "#tooling" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL = "/Indukumar-Mallampali-Resume.pdf";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!RESUME_URL || RESUME_URL.includes("example.com")) {
      e.preventDefault();
      toast({
        title: "Resume link not set yet",
        description: "The resume PDF is not available at this time.",
        variant: "destructive",
      });
      return;
    }
    (window as any).dataLayer?.push({ event: "resume_download" });
  };

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <div className="text-lg font-semibold tracking-tight">
              Indukumar Mallampali
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="sm"
                className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleResumeClick}
                asChild={!!RESUME_URL && !RESUME_URL.includes("example.com")}
              >
                <a 
                  href={RESUME_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Download résumé PDF"
                >
                  Download Résumé
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <ul className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left text-sm py-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleResumeClick}
                  asChild={!!RESUME_URL && !RESUME_URL.includes("example.com")}
                >
                  <a 
                    href={RESUME_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Download résumé PDF"
                  >
                    Download Résumé
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};
