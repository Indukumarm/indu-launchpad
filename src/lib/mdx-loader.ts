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
  const modules = import.meta.glob('/src/content/learn/*/index.mdx');
  for (const path in modules) {
    if (path.endsWith(`/${slug}/index.mdx`)) {
      try {
        const loaded = (await modules[path]!()) as unknown as TopicModule;
        return loaded;
      } catch (error) {
        console.error(`Failed to dynamically import topic: ${slug} at ${path}`, error);
        return null;
      }
    }
  }
  console.warn(`Topic not found for slug: ${slug}`);
  return null;
}
