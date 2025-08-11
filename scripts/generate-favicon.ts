import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const outputPath = 'static/favicon.svg';

/**
 * Converts iconify format to collection/name for API: "devicon:python" -> ["devicon", "python"]
 */
function parseIconifyName(iconifyName: string): [string, string] {
	const [collection, name] = iconifyName.split(':');
	if (!collection || !name) {
		throw new Error(
			`Invalid iconify name format: ${iconifyName}. Expected format: "collection:name"`
		);
	}
	return [collection, name];
}

/**
 * Fetches SVG content from Iconify API
 */
async function fetchIconSvg(collection: string, name: string): Promise<string> {
	const url = `https://api.iconify.design/${collection}/${name}.svg`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch icon: ${response.status} ${response.statusText}`);
		}

		const svgContent = await response.text();
		if (!svgContent.startsWith('<svg')) {
			throw new Error('Invalid SVG content received from Iconify API');
		}

		return svgContent;
	} catch (error) {
		throw new Error(`Failed to fetch icon ${collection}:${name} from Iconify API: ${error}`);
	}
}

/**
 * Optimizes SVG for favicon use
 */
function optimizeSvgForFavicon(svgContent: string): string {
	let optimized = svgContent;

	// Ensure the SVG has proper attributes for favicon use
	if (!optimized.includes('xmlns=')) {
		optimized = optimized.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
	}

	return optimized;
}

/**
 * Generates SVG favicon file from iconify icon name
 */
export async function generateFavicon(iconifyName: string): Promise<void> {
	try {
		console.log(`🚀 Generating favicon for icon: ${iconifyName}...`);

		const [collection, name] = parseIconifyName(iconifyName);
		console.log(`📡 Fetching ${collection}/${name} from Iconify API...`);

		const svgContent = await fetchIconSvg(collection, name);
		const optimizedSvg = optimizeSvgForFavicon(svgContent);

		// Ensure static directory exists
		const outputDir = dirname(outputPath);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		// Write the favicon file
		writeFileSync(outputPath, optimizedSvg);

		console.log(`✅ Generated favicon: ${outputPath}`);
		console.log(`📋 Icon: ${iconifyName} (${collection}/${name})`);
	} catch (error) {
		console.error('❌ Failed to generate favicon:', error);
		process.exit(1);
	}
}
