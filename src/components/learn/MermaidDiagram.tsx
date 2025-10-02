import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  isDark?: boolean;
}

export const MermaidDiagram = ({ chart, isDark }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (containerRef.current) {
      containerRef.current.innerHTML = chart;
      mermaid.run({ nodes: [containerRef.current] });
    }
  }, [chart, isDark]);

  return (
    <div className="mermaid-container max-w-full overflow-x-auto py-6 my-8 bg-muted/30 rounded-lg border border-[hsl(var(--domain-accent))]/20">
      <div ref={containerRef} className="mermaid flex justify-center px-4" />
    </div>
  );
};
