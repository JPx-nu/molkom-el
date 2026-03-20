import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    metaDescription: z.string(),
    icon: z.string(),
    image: z.string().optional(),
    order: z.number(),
    segment: z.enum(['private', 'b2b', 'both']),
    tags: z.array(z.string()),
    variant: z.enum(['default', 'lagspanning', 'elkraft', 'entreprenad', 'utbildningar', 'maskinuthyrning']),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    secondaryCTA: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
    capabilities: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    courses: z.array(z.object({
      name: z.string(),
      duration: z.string(),
      language: z.string(),
    })).optional(),
    equipment: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

export const collections = { services };
