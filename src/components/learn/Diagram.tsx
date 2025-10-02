import { useState, useEffect } from "react";
import { MermaidDiagram } from "./MermaidDiagram";

interface DiagramProps {
  children: string;
}

export const Diagram = ({ children }: DiagramProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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
  }, []);

  return <MermaidDiagram chart={children.trim()} isDark={isDark} />;
};
