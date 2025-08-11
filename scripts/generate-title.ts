import { writeFileSync, readFileSync, existsSync } from 'fs';

const appHtmlPath = 'src/app.html';

/**
 * Updates just the title in app.html
 */
function updateTitle(title: string): void {
	if (!existsSync(appHtmlPath)) {
		throw new Error(`app.html not found at ${appHtmlPath}`);
	}

	let htmlContent = readFileSync(appHtmlPath, 'utf8');

	// Escape title to prevent XSS
	const escapedTitle = title
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

	// Update or add title
	const titleRegex = /<title[^>]*>.*?<\/title>/i;
	const newTitle = `<title>${escapedTitle}</title>`;

	if (titleRegex.test(htmlContent)) {
		htmlContent = htmlContent.replace(titleRegex, newTitle);
	} else {
		// Add title after opening <head> tag
		htmlContent = htmlContent.replace(/<head[^>]*>/i, `$&\n\t\t${newTitle}`);
	}

	writeFileSync(appHtmlPath, htmlContent);
}

/**
 * Updates the title in app.html
 */
export async function generateTitle(title: string): Promise<void> {
	try {
		console.log(`📝 Setting title: "${title}"`);

		updateTitle(title);

		console.log(`✅ Updated title: "${title}"`);
	} catch (error) {
		console.error('❌ Failed to update title:', error);
		process.exit(1);
	}
}
