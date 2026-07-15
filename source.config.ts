import { defineConfig, defineCollections } from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const blogs = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: pageSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()), // enforcing structured blog dates
    draft: z.boolean().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
