import { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo3DWatermark } from "@/components/Logo3DWatermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ChevronLeft, ChevronRight, Share2, ExternalLink, ArrowLeft, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAllTopics, getTopicBySlug, type TopicFrontmatter } from "@/lib/mdx-loader";
import { mdxComponents } from "@/components/learn/MDXComponents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [topic, setTopic] = useState<TopicFrontmatter | null>(null);
  const [TopicContent, setTopicContent] = useState<React.ComponentType | null>(null);
  const [allTopics, setAllTopics] = useState<TopicFrontmatter[]>([]);

  useEffect(() => {
    const loadTopic = async () => {
      if (!slug) {
        navigate("/learn");
        return;
      }

      const [topicModule, topics] = await Promise.all([
        getTopicBySlug(slug),
        getAllTopics(),
      ]);

      if (!topicModule) {
        navigate("/learn");
        return;
      }

      setTopic(topicModule.frontmatter);
      setTopicContent(() => topicModule.default);
      setAllTopics(topics);
    };

    loadTopic();
  }, [slug, navigate]);

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

  if (!topic || !TopicContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading topic...</div>
      </div>
    );
  }

  const currentIndex = allTopics.findIndex((t) => t.slug === slug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      DevOps: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
      Cloud: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
      Release: "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20",
      PM: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
      ITIL: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
      Insurance: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
    };
    return colors[domain] || "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20";
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
        <link rel="canonical" href={`https://www.indumallampali.com/learn/${slug}`} />
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
            datePublished: topic.updated,
            dateModified: topic.updated,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Logo3DWatermark />

        <main className="container max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/learn">Learn</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{topic.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <Badge className={getDomainColor(topic.domain)} variant="outline">
                  {topic.domain}
                </Badge>
                <h1 className="text-4xl font-bold mt-4 mb-3">{topic.title}</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                aria-label="Share topic"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {topic.timeToRead}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>{topic.level}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Updated {new Date(topic.updated).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {topic.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {topic.summary}
            </p>
          </header>

          <Separator className="my-8" />

          {/* MDX Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:mb-4
            prose-li:my-1
            prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-table:border prose-table:border-border
            prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:font-semibold
            prose-ul:list-disc prose-ol:list-decimal
            prose-img:rounded-lg prose-img:shadow-md">
            <MDXProvider components={mdxComponents}>
              <Suspense fallback={<div className="animate-pulse">Loading content...</div>}>
                {TopicContent && <TopicContent />}
              </Suspense>
            </MDXProvider>
          </article>

          {/* Further Reading */}
          {topic.sources && topic.sources.length > 0 && (
            <>
              <Separator className="my-12" />
              <section>
                <h2 className="text-2xl font-bold mb-4">Further Reading</h2>
                <div className="space-y-2">
                  {topic.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {source.title}
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Navigation */}
          <Separator className="my-12" />
          <nav className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Link to="/learn">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Learn
              </Button>
            </Link>

            <div className="flex gap-4">
              {prevTopic && (
                <Link to={`/learn/${prevTopic.slug}`}>
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                </Link>
              )}
              {nextTopic && (
                <Link to={`/learn/${nextTopic.slug}`}>
                  <Button variant="outline" className="gap-2">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TopicDetail;
