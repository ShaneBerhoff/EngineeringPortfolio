import { readFileSync } from 'fs';
import { generateIconsModule } from './generate-icons';
import { SiteConfigSchema, HomeConfigSchema, SkillsConfigSchema } from '../src/lib/types';
import TOML from '@iarna/toml';

function generateModule() {
	try {
		const siteData = SiteConfigSchema.parse(TOML.parse(readFileSync('content/site.toml', 'utf8')));
		const homeData = HomeConfigSchema.parse(TOML.parse(readFileSync('content/home.toml', 'utf8')));
		const skillData = SkillsConfigSchema.parse(
			TOML.parse(readFileSync('content/skills.toml', 'utf8'))
		);

		const allIcons = new Set<string>();
		
		if (siteData.icon){
			allIcons.add(siteData.icon)
		}
		Object.values(siteData.navigation)
			.filter((navItem) => navItem.enabled)
			.forEach((navItem) => {
				if (navItem.icon) {
					allIcons.add(navItem.icon);
				}
			});

		homeData.contacts.forEach((contact) => {
			if (contact.icon) {
				allIcons.add(contact.icon);
			}
		});

		skillData.sections.forEach((section) => {
			section.skills.forEach((skill) => {
				if (skill.icon) {
					allIcons.add(skill.icon);
				}
			});
		});

		if (allIcons.size !== 0) {
			generateIconsModule([...allIcons]);
		}
	} catch (error) {
		console.error('Failed to parse toml files:', error);
		process.exit(1);
	}
}

generateModule();
