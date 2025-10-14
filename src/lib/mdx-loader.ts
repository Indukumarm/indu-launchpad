// MDX loader utility for learning topics
import { validateAllTopics, validateTopic } from "./topic-schema";

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

  const topics = Object.values(modules).map((module) => module.frontmatter);
  
  // Validate topics in development
  if (import.meta.env.DEV) {
    validateAllTopics(topics);
  }

  return topics;
}

// Get single topic by slug
export async function getTopicBySlug(slug: string): Promise<TopicModule | null> {
  // Normalize slug to lowercase kebab-case
  const normalizedSlug = slug.toLowerCase().trim();
  
  const modules = import.meta.glob('/src/content/learn/*/index.mdx');
  
  for (const path in modules) {
    if (path.toLowerCase().endsWith(`/${normalizedSlug}/index.mdx`)) {
      try {
        const loaded = (await modules[path]!()) as unknown as TopicModule;
        
        // Validate the loaded topic in development
        if (import.meta.env.DEV) {
          const validation = validateTopic(loaded.frontmatter, normalizedSlug);
          if (!validation.valid) {
            console.error(`❌ Topic validation failed for "${normalizedSlug}":`, validation.errors);
          }
        }
        
        return loaded;
      } catch (error) {
        console.error(`❌ Failed to import topic "${normalizedSlug}" from ${path}:`, error);
        return null;
      }
    }
  }
  
  console.warn(`⚠️ Topic not found for slug: "${normalizedSlug}"`);
  return null;
}
