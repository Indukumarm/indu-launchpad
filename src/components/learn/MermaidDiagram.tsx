import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  isDark?: boolean;
}

export const MermaidDiagram = ({ chart, isDark }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "system-ui, -apple-system, sans-serif",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = chart;
      mermaid.run({ nodes: [containerRef.current] });
    }
  }, [chart, isDark]);

  return (
    <div className="mermaid-container max-w-full overflow-x-auto py-4">
      <div ref={containerRef} className="mermaid flex justify-center" />
    </div>
  );
};
