import { z } from 'zod';

const NavItemSchema = z.object({
	enabled: z.boolean(),
	name: z.string(),
	icon: z.string().optional()
});

export const SiteConfigSchema = z.object({
	navigation: z.object({
		profile: NavItemSchema,
		projects: NavItemSchema,
		experience: NavItemSchema,
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
const ContentTypeSchema = z.enum(['title', 'text', 'image', 'model']);
const ProjectCellContentSchema = z.object({
	rows: z.number().min(1).max(10),
	cols: z.number().min(1).max(10),
	type: ContentTypeSchema,
	content: z.string(),
	text_color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional(),
	bg_color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional()
});
const ProjectSchema = z.object({
	type: ProjectTypeSchema,
	total_rows: z.number(),
	total_cols: z.number(),
	bg_color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional(),
	border_color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional(),
	shadow_color: z
		.string()
		.regex(hexColorRegex, 'Color must be a valid hex color (e.g., #ff0000 or #f00)')
		.optional(),
	grid_item: z.array(ProjectCellContentSchema)
});
export const ProjectsConfigSchema = z.object({
	projects: z.array(ProjectSchema)
});
export type ContentType = z.infer<typeof ContentTypeSchema>;
export type ProjectConfig = z.infer<typeof ProjectSchema>;
export type ProjectsConfig = z.infer<typeof ProjectsConfigSchema>;

export const ResumeConfigSchema = z.object({
	title: z.string(),
	url: z.string()
});
export type ResumeConfig = z.infer<typeof ResumeConfigSchema>;

const ExperienceSectionSchema = z.object({
	company: z.string(),
	position: z.string(),
	timeline: z.string(),
	projects: z.array(ProjectSchema)
});
export const ExperienceConfigSchema = z.object({
	experience: z.array(ExperienceSectionSchema)
});
export type ExperienceConfig = z.infer<typeof ExperienceConfigSchema>;
