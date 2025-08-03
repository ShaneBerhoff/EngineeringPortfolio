import { z } from 'zod';

const NavItemSchema = z.object({
	enabled: z.boolean(),
	name: z.string(),
	icon: z.string().optional()
});

export const SiteConfigSchema = z.object({
	name: z.string(),
	icon: z.string().optional(),
	navigation: z.object({
		projects: NavItemSchema,
		work: NavItemSchema,
		skills: NavItemSchema,
		resume: NavItemSchema
	})
});
export type SiteConfig = z.infer<typeof SiteConfigSchema>;

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

const ProjectTypeSchema = z.enum(['large', 'small']);
const ProjectStyleSchema = z.enum(['grid', 'horizontal', 'vertical']);
const ContentTypeSchema = z.enum(['text', 'image', 'model']);
const ProjectContentSchema = z.object({
	type: ContentTypeSchema,
	content: z.string()
});
const ProjectSchema = z.object({
	type: ProjectTypeSchema,
	style: ProjectStyleSchema,
	title: z.string(),
	top_left: ProjectContentSchema.optional(),
	bottom_left: ProjectContentSchema.optional(),
	top_middle: ProjectContentSchema.optional(),
	bottom_middle: ProjectContentSchema.optional(),
	top_right: ProjectContentSchema.optional(),
	bottom_right: ProjectContentSchema.optional()
});
export const ProjectsConfigSchema = z.object({
	projects: z.array(ProjectSchema)
})
export type ProjectConfig = z.infer<typeof ProjectSchema>;
export type ProjectsConfig = z.infer<typeof ProjectsConfigSchema>;
