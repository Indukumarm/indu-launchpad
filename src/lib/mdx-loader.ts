// MDX loader utility for learning topics
export interface TopicFrontmatter {
  title: string;
  slug: string;
  domain: string;
  level: string;
  timeToRead: string;
  tags: string[];
  summary: string;
  updated: string;
  sources?: { title: string; url: string }[];
}

export interface TopicModule {
  frontmatter: TopicFrontmatter;
  default: React.ComponentType;
}

// Get all topic modules
export async function getAllTopics(): Promise<TopicFrontmatter[]> {
  const modules = import.meta.glob<TopicModule>('/src/content/learn/*/index.mdx', {
    eager: true,
  });

  return Object.values(modules).map((module) => module.frontmatter);
}

// Get single topic by slug
export async function getTopicBySlug(slug: string): Promise<TopicModule | null> {
  try {
    const module = await import(`/src/content/learn/${slug}/index.mdx`);
    return module as TopicModule;
  } catch (error) {
    console.error(`Failed to load topic: ${slug}`, error);
    return null;
  }
}
