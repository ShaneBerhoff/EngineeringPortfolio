import { z } from 'zod';

// Hex color validation regex
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Contact schema
const ContactSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  logo: z.string(),
  color: z.string().regex(hexColorRegex, "Color must be a valid hex color (e.g., #ff0000 or #f00)"),
});
export const HomeConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  contacts: z.array(ContactSchema),
});

// export interface SiteConfig {
// 	title: string;
// }
