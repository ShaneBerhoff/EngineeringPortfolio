import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const outputPath = 'src/lib/generated/icons.ts';

/**
 * Converts kebab-case to PascalCase: "brick-wall-fire" -> "BrickWallFire"
 */
function kebabToPascalCase(kebab: string): string {
	return kebab
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export function generateIconsModule(iconNames: string[]) {
	try {
		// Convert kebab-case to PascalCase component names
		const componentNames = iconNames.map(kebabToPascalCase);

		const moduleContent = `${componentNames.map((component) => `import { ${component} } from '@lucide/svelte';`).join('\n')}

export const iconMap = {
${iconNames.map((icon, index) => `  '${icon}': ${componentNames[index]},`).join('\n')}
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string) {
  return iconMap[name as IconName];
}
`;

		const outputDir = dirname(outputPath);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		writeFileSync(outputPath, moduleContent);
		console.log(`✓ Generated icons: ${iconNames.join(', ')}`);
		console.log(`✓ Component names: ${componentNames.join(', ')}`);
	} catch (error) {
		console.error('Failed to generate icons:', error);
		process.exit(1);
	}
}
