import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
  isDark?: boolean;
}

export const MermaidDiagram = ({ chart, isDark }: MermaidDiagramProps) => {
  // Guard browser-only APIs
  if (typeof window === "undefined") {
    return null;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const renderDiagram = async () => {
      try {
        // Dynamically import mermaid only on client
        const mermaid = (await import("mermaid")).default;

        if (!mounted) return;

        // Get domain accent color from CSS variable
        const accentColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--domain-accent')
          .trim();
        const hslAccent = accentColor ? `hsl(${accentColor})` : '#00ACC1';

        mermaid.initialize({
          startOnLoad: true,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "system-ui, -apple-system, sans-serif",
          themeVariables: {
            primaryColor: hslAccent,
            primaryTextColor: isDark ? '#fff' : '#000',
            primaryBorderColor: hslAccent,
            lineColor: hslAccent,
            secondaryColor: isDark ? '#1e293b' : '#f1f5f9',
            tertiaryColor: isDark ? '#0f172a' : '#e2e8f0',
          },
        });

        if (containerRef.current && mounted) {
          containerRef.current.innerHTML = chart;
          await mermaid.run({ nodes: [containerRef.current] });
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [chart, isDark]);

  if (error) {
    return (
      <div className="mermaid-container max-w-full overflow-x-auto py-6 my-8 bg-muted/30 rounded-lg border border-destructive/20">
        <div className="flex items-center justify-center gap-2 text-muted-foreground px-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <span>
            Diagram error
            {import.meta.env.DEV && `: ${error}`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid-container max-w-full overflow-x-auto py-6 my-8 bg-muted/30 rounded-lg border border-[hsl(var(--domain-accent))]/20">
      {isLoading && (
        <div className="flex justify-center px-4 py-8 text-muted-foreground animate-pulse">
          Loading diagram...
        </div>
      )}
      <div 
        ref={containerRef} 
        className="mermaid flex justify-center px-4"
        style={{ display: isLoading ? 'none' : 'flex' }}
      />
    </div>
  );
};
