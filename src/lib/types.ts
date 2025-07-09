import { z } from 'zod';

// Hex color validation regex
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Contact schema
const ContactSchema = z.object({
	name: z.string(),
	link: z.string().url(),
	icon: z.string().optional(),
	color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional()
});
export const HomeConfigSchema = z.object({
	name: z.string(),
	description: z.string(),
	contacts: z.array(ContactSchema)
});
export type HomeConfig = z.infer<typeof HomeConfigSchema>;

const SkillSchema = z.object({
	name: z.string(),
	icon: z.string().optional(),
	color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional()
});

const SkillSectionSchema = z.object({
	name: z.string(),
	skills: z.array(SkillSchema)
});

export const SkillsConfigSchema = z.object({
	sections: z.array(SkillSectionSchema)
});
export type SkillsConfig = z.infer<typeof SkillsConfigSchema>;

// export interface SiteConfig {
// 	title: string;
// }
