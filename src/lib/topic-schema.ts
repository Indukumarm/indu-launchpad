import { z } from "zod";

// Zod schema for topic frontmatter validation
export const TopicFrontmatterSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case")
    .min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  updated: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Updated must be a valid ISO date string",
  }),
  timeToRead: z.string().regex(/^\d+m$/, "timeToRead must be in format like '10m'"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  domain: z.string().min(1, "Domain is required"),
  tags: z.array(z.string()).default([]),
  sources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
});

export type ValidatedTopicFrontmatter = z.infer<typeof TopicFrontmatterSchema>;

/**
 * Validates topic frontmatter and returns detailed errors
 */
export function validateTopic(
  topic: unknown,
  context?: string
): { valid: boolean; errors?: string[] } {
  const result = TopicFrontmatterSchema.safeParse(topic);
  
  if (result.success) {
    return { valid: true };
  }

  const errors = result.error.issues.map((err) => {
    const path = err.path.join(".");
    return `${context ? `[${context}] ` : ""}${path}: ${err.message}`;
  });

  return { valid: false, errors };
}

/**
 * Validates all topics and logs errors in development
 */
export function validateAllTopics(topics: unknown[]): boolean {
  if (import.meta.env.PROD) {
    // Skip validation in production to avoid bundle size
    return true;
  }

  let hasErrors = false;
  
  topics.forEach((topic, index) => {
    const topicData = topic as any;
    const result = validateTopic(topic, topicData?.slug || `topic-${index}`);
    
    if (!result.valid) {
      hasErrors = true;
      console.error(`❌ Topic validation failed:`, result.errors);
    }
  });

  if (!hasErrors) {
    console.log(`✅ All ${topics.length} topics validated successfully`);
  }

  return !hasErrors;
}
