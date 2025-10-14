import { useState, useEffect } from "react";
import { MermaidDiagram } from "./MermaidDiagram";
import { AlertCircle } from "lucide-react";

interface DiagramProps {
  children: string;
}

const DiagramPlaceholder = ({ error }: { error?: string }) => (
  <div className="mermaid-container max-w-full overflow-x-auto py-6 my-8 bg-muted/30 rounded-lg border border-destructive/20">
    <div className="flex items-center justify-center gap-2 text-muted-foreground px-4">
      <AlertCircle className="h-5 w-5 text-destructive" />
      <span>Diagram unavailable{error && import.meta.env.DEV && `: ${error}`}</span>
    </div>
  </div>
);

export const Diagram = ({ children }: DiagramProps) => {
  // Guard browser-only APIs
  if (typeof window === "undefined") {
    return null;
  }

  const [isDark, setIsDark] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    try {
      const checkTheme = () => {
        setIsDark(document.documentElement.classList.contains("dark"));
      };
      checkTheme();

      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    } catch (error) {
      console.error("Diagram theme observer error:", error);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }, []);

  if (hasError) {
    return <DiagramPlaceholder error={errorMessage} />;
  }

  try {
    return <MermaidDiagram chart={children.trim()} isDark={isDark} />;
  } catch (error) {
    console.error("Diagram render error:", error);
    return <DiagramPlaceholder error={error instanceof Error ? error.message : "Render failed"} />;
  }
};
