import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Logo3D } from "@/components/Logo3D";

const navItems = [
  { label: "About", href: "#about", isHash: true },
  { label: "Experience", href: "#experience", isHash: true },
  { label: "Work", href: "#work", isHash: true },
  { label: "Tooling", href: "#tooling", isHash: true },
  { label: "Learn", href: "/learn", isHash: false },
  { label: "Contact", href: "#contact", isHash: true },
];

const RESUME_URL = "/Indukumar Mallampali_Resume.pdf";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const isLearnPage = location.pathname === "/learn";

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const handleNavClick = (href: string, isHash: boolean) => {
    setIsMobileMenuOpen(false);
    if (isHash) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
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

            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 flex-shrink-0">
                <Logo3D />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Indukumar Mallampali
              </span>
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = item.isHash
                  ? activeSection === item.href.substring(1) && !isLearnPage
                  : location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href, item.isHash)}
                      className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded ${
                        isActive
                          ? "text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
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
              {navItems.map((item) => {
                const isActive = item.isHash
                  ? activeSection === item.href.substring(1) && !isLearnPage
                  : location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href, item.isHash)}
                      className={`block w-full text-left text-sm py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded ${
                        isActive
                          ? "text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
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
