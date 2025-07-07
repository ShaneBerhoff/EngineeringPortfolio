import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const outputPath = 'src/lib/generated/logos.ts';

/**
 * Converts slug to component name: "github" -> "SiGithub"
 */
function slugToComponentName(slug: string): string {
	const pascalCase = slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
	return `Si${pascalCase}`;
}

export function generateLogosModule(slugs: string[]) {
	try {
		// Convert slugs to component names
		const componentNames = slugs.map(slugToComponentName);

		const moduleContent = `${componentNames.map((component) => `import { ${component} } from '@icons-pack/svelte-simple-icons';`).join('\n')}

export const logoMap = {
${slugs.map((slug, index) => `  '${slug}': ${componentNames[index]},`).join('\n')}
} as const;

export type LogoName = keyof typeof logoMap;

export function getLogo(name: string) {
  return logoMap[name as LogoName];
}
`;

		const outputDir = dirname(outputPath);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		writeFileSync(outputPath, moduleContent);
		console.log(`✓ Generated logos: ${slugs.join(', ')}`);
		console.log(`✓ Component names: ${componentNames.join(', ')}`);
	} catch (error) {
		console.error('Failed to generate logos:', error);
		process.exit(1);
	}
}
