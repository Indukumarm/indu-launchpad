import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Download } from "lucide-react";

const RESUME_URL = "/Indukumar-Mallampali-Resume.pdf";
const LOGO_3D_URL = ""; // Optional: Add .glb model URL here

export const Hero = () => {
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

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12"
    >
      <div className="max-w-4xl w-full text-center animate-fade-in-up">
        {LOGO_3D_URL && (
          <div className="mb-8 flex justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: `<model-viewer src="${LOGO_3D_URL}" alt="Indukumar Mallampali Logo" camera-controls style="width: 200px; height: 200px;"></model-viewer>`
              }}
            />
          </div>
        )}

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-accent font-medium">
            Lead DevOps & Release Engineering
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            I ship reliable releases—safely, repeatably, and fast.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I design auditable CI/CD and release processes for complex, regulated
            systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              onClick={handleResumeClick}
              asChild={!!RESUME_URL && !RESUME_URL.includes("example.com")}
            >
              <a 
                href={RESUME_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Download résumé PDF"
                className="flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Résumé
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                Contact Me
                <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Open to Lead DevOps & Release Engineering roles.
          </p>
        </div>
      </div>
    </section>
  );
};
