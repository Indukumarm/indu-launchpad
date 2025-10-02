import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo3DWatermark } from "@/components/Logo3DWatermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MermaidDiagram } from "@/components/learn/MermaidDiagram";
import { CodeBlock } from "@/components/learn/CodeBlock";
import { Checklist } from "@/components/learn/Checklist";
import { Clock, ChevronLeft, ChevronRight, Share2, ExternalLink, ArrowLeft } from "lucide-react";
import topicsData from "@/data/learn-topics.json";
import { toast } from "@/hooks/use-toast";

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

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const topics: Topic[] = topicsData as Topic[];
  const currentIndex = topics.findIndex((t) => t.slug === slug);
  const topic = topics[currentIndex];

  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  useEffect(() => {
    if (!topic) {
      navigate("/learn");
      return;
    }

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
  }, [topic, navigate]);

  if (!topic) return null;

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

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Topic URL copied to clipboard.",
    });
  };

  return (
    <>
      <Helmet>
        <title>{topic.title} — Learn | Indukumar Mallampali</title>
        <meta name="description" content={topic.summary} />
        <link rel="canonical" href={`https://indumallampali.com/learn/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: topic.title,
            description: topic.summary,
            author: {
              "@type": "Person",
              name: "Indukumar Mallampali",
            },
            keywords: topic.tags.join(", "),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen relative">
        <Logo3DWatermark />
        <div className="relative z-10">
          <Header />
          <main id="content" className="pt-24 pb-16">
            <article className="max-w-3xl mx-auto px-6">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-3 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span>›</span>
                <Link to="/learn" className="hover:text-foreground transition-colors">
                  Learn
                </Link>
                <span>›</span>
                <span className="text-foreground">{topic.title}</span>
              </nav>

              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getDomainColor(topic.domain)}>{topic.domain}</Badge>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {topic.timeToRead}
                  </span>
                  <span>•</span>
                  <span>{topic.level}</span>
                </div>

                <p className="text-lg text-muted-foreground mb-4">{topic.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              <Separator className="my-8" />

              {/* Explain Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Explanation</h2>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: topic.explain.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </section>

              {/* Visualize Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Visual Guide</h2>
                <div className="bg-card border rounded-lg p-6">
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
                </div>
              </section>

              {/* Further Reading */}
              {topic.links && topic.links.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Further Reading</h2>
                  <div className="space-y-2">
                    {topic.links.map((link) => (
                      <Button
                        key={link.url}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </section>
              )}

              <Separator className="my-8" />

              {/* Navigation */}
              <nav className="space-y-4" aria-label="Topic navigation">
                <Button variant="outline" asChild className="gap-2">
                  <Link to="/learn">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Learning Hub
                  </Link>
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prevTopic && (
                    <Button variant="outline" asChild className="justify-start gap-2">
                      <Link to={`/learn/${prevTopic.slug}`}>
                        <ChevronLeft className="h-4 w-4" />
                        <div className="text-left overflow-hidden">
                          <div className="text-xs text-muted-foreground">Previous</div>
                          <div className="truncate">{prevTopic.title}</div>
                        </div>
                      </Link>
                    </Button>
                  )}
                  {nextTopic && (
                    <Button
                      variant="outline"
                      asChild
                      className={`justify-end gap-2 ${!prevTopic ? "md:col-start-2" : ""}`}
                    >
                      <Link to={`/learn/${nextTopic.slug}`}>
                        <div className="text-right overflow-hidden">
                          <div className="text-xs text-muted-foreground">Next</div>
                          <div className="truncate">{nextTopic.title}</div>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </article>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TopicDetail;
