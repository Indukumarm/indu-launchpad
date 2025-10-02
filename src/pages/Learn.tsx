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
import topicsData from "@/data/learn-topics.json";

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

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const topics: Topic[] = topicsData as Topic[];

  const domains = Array.from(new Set(topics.map((t) => t.domain)));
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const formats = ["Guide", "Diagram", "Checklist"];
  const times = ["≤5m", "5–15m", "15m+"];

  const filteredAndSortedTopics = useMemo(() => {
    let filtered = topics;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(query) ||
          topic.summary.toLowerCase().includes(query) ||
          topic.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Domain filter
    if (selectedDomains.length > 0) {
      filtered = filtered.filter((topic) => selectedDomains.includes(topic.domain));
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((topic) => selectedLevels.includes(topic.level));
    }

    // Format filter
    if (selectedFormats.length > 0) {
      filtered = filtered.filter((topic) => {
        if (selectedFormats.includes("Diagram") && topic.visualize.type === "mermaid") return true;
        if (selectedFormats.includes("Checklist") && topic.visualize.type === "checklist")
          return true;
        if (selectedFormats.includes("Guide")) return true;
        return false;
      });
    }

    // Time filter
    if (selectedTimes.length > 0) {
      filtered = filtered.filter((topic) => {
        const time = parseInt(topic.timeToRead);
        if (selectedTimes.includes("≤5m") && time <= 5) return true;
        if (selectedTimes.includes("5–15m") && time > 5 && time <= 15) return true;
        if (selectedTimes.includes("15m+") && time > 15) return true;
        return false;
      });
    }

    // Sorting
    if (sortBy === "shortest") {
      filtered.sort((a, b) => parseInt(a.timeToRead) - parseInt(b.timeToRead));
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    return filtered;
  }, [
    topics,
    searchQuery,
    selectedDomains,
    selectedLevels,
    selectedFormats,
    selectedTimes,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedDomains([]);
    setSelectedLevels([]);
    setSelectedFormats([]);
    setSelectedTimes([]);
    setSortBy("relevance");
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
        <title>Learn DevOps, Cloud & Release | Indukumar Mallampali</title>
        <meta
          name="description"
          content="One place to learn DevOps, Cloud, Release Management, Project Management, ITIL — with clear explanations and visual diagrams."
        />
        <link rel="canonical" href="https://indumallampali.com/learn" />
      </Helmet>

      <div className="min-h-screen relative">
        <Logo3DWatermark />
        <div className="relative z-10">
          <Header />
          <main id="content" className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <div className="mb-12 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <a href="/" className="hover:text-foreground transition-colors">
                    Home
                  </a>
                  <span>›</span>
                  <span className="text-foreground">Learn</span>
                </div>
                <div className="flex items-center gap-4">
                  <BookOpen className="h-10 w-10 text-primary" />
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Learning Hub</h1>
                    <p className="text-lg text-muted-foreground">
                      Master DevOps, Cloud, Release Management, Project Management, and ITIL — with
                      clear explanations and visual diagrams.
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <SearchInput value={searchQuery} onChange={setSearchQuery} />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          !
                        </span>
                      )}
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {showFilters && (
                  <div className="p-6 border rounded-lg bg-card space-y-4">
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
                      label="Format"
                      options={formats}
                      selected={selectedFormats}
                      onChange={setSelectedFormats}
                    />
                    <FilterChips
                      label="Est. Time"
                      options={times}
                      selected={selectedTimes}
                      onChange={setSelectedTimes}
                    />
                    <SortSelect value={sortBy} onChange={setSortBy} />
                  </div>
                )}
              </div>

              {/* Results */}
              {filteredAndSortedTopics.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    No topics match your filters.
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredAndSortedTopics.length} topic
                    {filteredAndSortedTopics.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedTopics.map((topic, index) => (
                      <TopicCard key={topic.slug} topic={topic} index={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Learn;
