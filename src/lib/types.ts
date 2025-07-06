import { z } from 'zod';

export interface SiteConfig {
	title: string;
}

export const HomeConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string(),
  icon: z.string(),
});
// export type HomeConfig = z.infer<typeof HomeConfigSchema>;
