import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ExternalLink } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";
import { CodeBlock } from "./CodeBlock";
import { Checklist } from "./Checklist";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Topic {
  title: string;
  slug: string;
  domain: string;
  level: string;
  timeToRead: string;
  tags: string[];
  summary: string;
  explain: string;
  visualize: {
    type: "mermaid" | "code" | "checklist";
    value?: string;
    language?: string;
    items?: string[];
  };
  links?: Array<{ label: string; url: string }>;
}

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export const TopicCard = ({ topic, index }: TopicCardProps) => {
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

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      DevOps: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      Cloud: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
      Release: "bg-green-500/10 text-green-700 dark:text-green-300",
      PM: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
      ITIL: "bg-red-500/10 text-red-700 dark:text-red-300",
    };
    return colors[domain] || "bg-gray-500/10 text-gray-700 dark:text-gray-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={getDomainColor(topic.domain)}>{topic.domain}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{topic.timeToRead}</span>
            </div>
          </div>
          <CardTitle className="text-xl">{topic.title}</CardTitle>
          <CardDescription>{topic.summary}</CardDescription>
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="explain" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="explain">Explain</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
            </TabsList>
            <TabsContent value="explain" className="space-y-4">
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: topic.explain.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
              {topic.links && topic.links.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium">Further Reading:</p>
                  {topic.links.map((link) => (
                    <Button
                      key={link.url}
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      asChild
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="visualize">
              {topic.visualize.type === "mermaid" && topic.visualize.value && (
                <MermaidDiagram chart={topic.visualize.value} isDark={isDark} />
              )}
              {topic.visualize.type === "code" && topic.visualize.value && (
                <CodeBlock
                  code={topic.visualize.value}
                  language={topic.visualize.language || "text"}
                  isDark={isDark}
                />
              )}
              {topic.visualize.type === "checklist" && topic.visualize.items && (
                <Checklist items={topic.visualize.items} topicSlug={topic.slug} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
