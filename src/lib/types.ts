import { z } from 'zod';

// Hex color validation regex
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Contact schema
const ContactSchema = z
	.object({
		name: z.string(),
		link: z.string().url(),
		logo: z.string().optional(),
		icon: z.string().optional(),
		color: z
			.string()
			.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
	})
	.refine((data) => (data.logo && !data.icon) || (!data.logo && data.icon), {
		message: 'Either logo or icon must be provided, but not both',
		path: ['logo', 'icon']
	});
export const HomeConfigSchema = z.object({
	name: z.string(),
	description: z.string(),
	contacts: z.array(ContactSchema)
});
export type HomeConfig = z.infer<typeof HomeConfigSchema>;

// export interface SiteConfig {
// 	title: string;
// }
