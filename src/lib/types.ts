import { z } from 'zod';

export interface SiteConfig {
	title: string;
}

export const HomeConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
});
// export type HomeConfig = z.infer<typeof HomeConfigSchema>;
