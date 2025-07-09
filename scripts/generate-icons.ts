import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const outputPath = 'src/lib/generated/icons.ts';

/**
 * Converts iconify format to unplugin format: "devicon:python" -> "devicon/python"
 */
function iconifyToUnplugin(iconifyName: string): string {
	return iconifyName.replace(':', '/');
}

/**
 * Converts icon path to valid PascalCase component name
 * "material-symbols/alternate-email" -> "MaterialSymbolsAlternateEmail"
 */
function iconPathToComponentName(iconPath: string): string {
	return iconPath
		.split('/')
		.map((part) =>
			part
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join('')
		)
		.join('');
}

export function generateIconsModule(iconNames: string[]): void {
	try {
		console.log(`🎨 Generating icons module with ${iconNames.length} icons...`);

		// Convert iconify names to component data
		const iconData = iconNames.map((iconifyName) => {
			const unpluginPath = iconifyToUnplugin(iconifyName);
			const componentName = iconPathToComponentName(unpluginPath);

			console.log(`  ${iconifyName} → ${componentName}`);

			return {
				iconifyName, // "material-symbols:alternate-email"
				unpluginPath, // "material-symbols/alternate-email"
				componentName // "MaterialSymbolsAlternateEmail"
			};
		});

		// Generate imports
		const imports = iconData
			.map(
				({ componentName, unpluginPath }) =>
					`import ${componentName} from '~icons/${unpluginPath}';`
			)
			.join('\n');

		// Generate icon map entries
		const iconMapEntries = iconData
			.map(({ iconifyName, componentName }) => `  '${iconifyName}': ${componentName},`)
			.join('\n');

		// Create the module content
		const moduleContent = `// Auto-generated - Do not edit manually
${imports}

export const iconMap = {
${iconMapEntries}
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string) {
  return iconMap[name as IconName];
}
`;

		// Ensure output directory exists
		const outputDir = dirname(outputPath);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		// Write the file
		writeFileSync(outputPath, moduleContent);

		console.log(`✅ Generated ${outputPath}`);
		console.log(`✓ Icons: ${iconNames.join(', ')}`);
		console.log(`✓ Components: ${iconData.map((d) => d.componentName).join(', ')}`);
	} catch (error) {
		console.error('❌ Failed to generate icons:', error);
		process.exit(1);
	}
}
