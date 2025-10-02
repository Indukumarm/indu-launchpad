import { useState, useEffect } from "react";
import { MermaidDiagram } from "./MermaidDiagram";
import { CodeBlock } from "./CodeBlock";
import { Diagram } from "./Diagram";
import { LottieAnimation } from "./LottieAnimation";

// Custom components for MDX content
export const mdxComponents = {
  // Code blocks with syntax highlighting
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => {
    const childProps = (children as any)?.props;
    
    if (childProps?.className?.includes("language-")) {
      const language = childProps.className.replace("language-", "");
      const code = childProps.children;
      
      return <CodeBlock code={code} language={language} />;
    }
    
    return <pre {...props}>{children}</pre>;
  },

  // Mermaid diagrams
  code: ({ children, className, ...props }: React.HTMLProps<HTMLElement>) => {
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

    // Handle mermaid diagrams
    if (className === "language-mermaid") {
      return <MermaidDiagram chart={children as string} isDark={isDark} />;
    }

    // Regular inline code
    return <code className={className} {...props}>{children}</code>;
  },

  // Enhanced headings with anchor links
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = typeof children === "string" 
      ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") 
      : undefined;
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = typeof children === "string" 
      ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") 
      : undefined;
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },

  // Enhance tables with better styling
  table: ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table {...props}>{children}</table>
    </div>
  ),

  // Enhance blockquotes
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/30 rounded-r" 
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Diagram component for Mermaid charts
  Diagram,
  
  // Lottie animation component
  LottieAnimation,
};
