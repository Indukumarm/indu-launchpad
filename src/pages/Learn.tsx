import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo3DWatermark } from "@/components/Logo3DWatermark";
import { SearchInput } from "@/components/learn/SearchInput";
import { FilterChips } from "@/components/learn/FilterChips";
import { SortSelect } from "@/components/learn/SortSelect";
import { TopicCard } from "@/components/learn/TopicCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, X } from "lucide-react";
import { getAllTopics, type TopicFrontmatter } from "@/lib/mdx-loader";

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [topics, setTopics] = useState<TopicFrontmatter[]>([]);

  useEffect(() => {
    getAllTopics().then(setTopics);
  }, []);

  const domains = Array.from(new Set(topics.map((t) => t.domain)));
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const formats = ["Guide", "Diagram", "Checklist"];
  const times = ["≤5m", "5–15m", "15m+"];

  const filteredAndSortedTopics = useMemo(() => {
    let filtered = topics;

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.summary.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Domain filter
    if (selectedDomains.length > 0) {
      filtered = filtered.filter((t) => selectedDomains.includes(t.domain));
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((t) => selectedLevels.includes(t.level));
    }

    // Format filter - skip since we don't have this metadata in frontmatter
    // All topics are guides with various content types inside

    // Time filter
    if (selectedTimes.length > 0) {
      filtered = filtered.filter((t) => {
        const time = parseInt(t.timeToRead);
        return selectedTimes.some((range) => {
          if (range === "≤5m") return time <= 5;
          if (range === "5–15m") return time > 5 && time <= 15;
          if (range === "15m+") return time > 15;
          return false;
        });
      });
    }

    // Sort
    if (sortBy === "shortest") {
      filtered.sort(
        (a, b) => parseInt(a.timeToRead) - parseInt(b.timeToRead)
      );
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.updated || "2025-01-01");
        const dateB = new Date(b.updated || "2025-01-01");
        return dateB.getTime() - dateA.getTime();
      });
    }

    return filtered;
  }, [
    topics,
    searchQuery,
    selectedDomains,
    selectedLevels,
    selectedTimes,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedDomains([]);
    setSelectedLevels([]);
    setSelectedFormats([]);
    setSelectedTimes([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDomains.length > 0 ||
    selectedLevels.length > 0 ||
    selectedFormats.length > 0 ||
    selectedTimes.length > 0;

  return (
    <>
      <Helmet>
        <title>Learn — DevOps, Cloud & Release Management | Indukumar Mallampali</title>
        <meta
          name="description"
          content="Explore comprehensive guides on DevOps, Cloud infrastructure, Release Management, and ITIL practices. Learn CI/CD, Kubernetes, GitHub Actions, and more."
        />
        <link rel="canonical" href="https://www.indumallampali.com/learn" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Learn — DevOps & Cloud Engineering",
            description:
              "Educational resources on DevOps, Cloud, and Release Management",
            url: "https://www.indumallampali.com/learn",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Logo3DWatermark />

        <main className="container mx-auto px-4 py-16 pt-[calc(var(--header-h)+1rem)]">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practical guides on DevOps, Cloud infrastructure, and Release
              Management — from CI/CD pipelines to Kubernetes deployments.
            </p>
          </section>

          {/* Search & Filter Controls */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      •
                    </span>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-6 p-6 border rounded-lg bg-card space-y-6">
                <FilterChips
                  label="Domain"
                  options={domains}
                  selected={selectedDomains}
                  onChange={setSelectedDomains}
                />

                <FilterChips
                  label="Level"
                  options={levels}
                  selected={selectedLevels}
                  onChange={setSelectedLevels}
                />

                <FilterChips
                  label="Time to Read"
                  options={times}
                  selected={selectedTimes}
                  onChange={setSelectedTimes}
                />

                <div>
                  <h3 className="text-sm font-semibold mb-3">Sort By</h3>
                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>
              </div>
            )}
          </div>

          {/* Topics Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredAndSortedTopics.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredAndSortedTopics.length} topic
                  {filteredAndSortedTopics.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedTopics.map((topic, index) => (
                    <TopicCard key={topic.slug} topic={topic} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No topics found matching your filters.
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Learn;
