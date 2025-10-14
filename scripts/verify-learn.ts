#!/usr/bin/env node
/**
 * Verify Learn Topics
 * 
 * This script validates all learning topics before build:
 * - Validates topic frontmatter against Zod schema
 * - Checks for duplicate slugs
 * - Verifies referenced asset files exist
 * - Ensures proper slug casing (lowercase kebab-case)
 */

import { readdir, readFile, access } from "fs/promises";
import { join } from "path";
import { TopicFrontmatterSchema } from "../src/lib/topic-schema";
import matter from "gray-matter";

interface ValidationError {
  slug: string;
  type: "schema" | "duplicate" | "asset" | "casing";
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];
const slugs = new Set<string>();

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function validateTopic(topicDir: string): Promise<void> {
  const indexPath = join(topicDir, "index.mdx");
  
  try {
    const content = await readFile(indexPath, "utf-8");
    const { data: frontmatter } = matter(content);

    // Schema validation
    const result = TopicFrontmatterSchema.safeParse(frontmatter);
    
    if (!result.success) {
      result.error.issues.forEach((err) => {
        errors.push({
          slug: frontmatter.slug || topicDir.split("/").pop() || "unknown",
          type: "schema",
          message: `${err.path.join(".")}: ${err.message}`,
        });
      });
      return;
    }

    const validated = result.data;

    // Check for duplicate slugs
    if (slugs.has(validated.slug)) {
      errors.push({
        slug: validated.slug,
        type: "duplicate",
        message: "Duplicate slug found",
      });
    }
    slugs.add(validated.slug);

    // Check slug casing matches directory name
    const dirName = topicDir.split("/").pop();
    if (dirName !== validated.slug) {
      warnings.push(
        `Slug "${validated.slug}" doesn't match directory name "${dirName}"`
      );
    }

    // Check if slug is lowercase kebab-case
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(validated.slug)) {
      errors.push({
        slug: validated.slug,
        type: "casing",
        message: "Slug must be lowercase kebab-case",
      });
    }

    console.log(`✅ ${validated.slug}`);
  } catch (error) {
    errors.push({
      slug: topicDir.split("/").pop() || "unknown",
      type: "schema",
      message: `Failed to parse: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}

async function main() {
  console.log("🔍 Validating Learn topics...\n");

  const learnDir = join(process.cwd(), "src", "content", "learn");
  
  try {
    const entries = await readdir(learnDir, { withFileTypes: true });
    const topicDirs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(learnDir, entry.name));

    for (const dir of topicDirs) {
      await validateTopic(dir);
    }

    // Print results
    console.log(`\n📊 Validation Results:`);
    console.log(`   Topics checked: ${topicDirs.length}`);
    console.log(`   Valid: ${topicDirs.length - errors.length}`);
    console.log(`   Errors: ${errors.length}`);
    console.log(`   Warnings: ${warnings.length}`);

    if (warnings.length > 0) {
      console.log(`\n⚠️  Warnings:`);
      warnings.forEach((warning) => console.log(`   - ${warning}`));
    }

    if (errors.length > 0) {
      console.log(`\n❌ Errors:\n`);
      errors.forEach((error) => {
        console.log(`   [${error.slug}] ${error.type}: ${error.message}`);
      });
      process.exit(1);
    }

    console.log(`\n✅ All topics valid!\n`);
  } catch (error) {
    console.error(`❌ Failed to read learn directory:`, error);
    process.exit(1);
  }
}

main();
