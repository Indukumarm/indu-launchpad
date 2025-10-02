import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { TopicFrontmatter } from "@/lib/mdx-loader";

interface TopicCardProps {
  topic: TopicFrontmatter;
  index: number;
}

export const TopicCard = ({ topic, index }: TopicCardProps) => {
  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      DevOps: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      Cloud: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
      Release: "bg-green-500/10 text-green-700 dark:text-green-300",
      PM: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
      ITIL: "bg-red-500/10 text-red-700 dark:text-red-300",
      Insurance: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
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
      <Link to={`/learn/${topic.slug}`}>
        <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge className={getDomainColor(topic.domain)}>{topic.domain}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{topic.timeToRead}</span>
              </div>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {topic.title}
            </CardTitle>
            <CardDescription>{topic.summary}</CardDescription>
            <div className="flex flex-wrap gap-1 mt-2">
              {topic.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {topic.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{topic.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{topic.level}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Read more
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
