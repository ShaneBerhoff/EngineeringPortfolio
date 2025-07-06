import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import TOML from '@iarna/toml';

const outputPath = 'src/lib/generated/icons.ts';

function generateIconModule() {
  try {
    const tomlContent = readFileSync('content/home.toml', 'utf8');
    const config = TOML.parse(tomlContent);
    
    if (!config.contacts || !Array.isArray(config.contacts)) {
      throw new Error('No contacts found in home.toml');
    }
    
    const iconNames = [
      ...new Set(
        config.contacts
          .map(contact => contact.logo)
          .filter(logo => typeof logo === 'string' && logo.startsWith('Si'))
      )
    ];
    
    if (iconNames.length === 0) {
      throw new Error('No valid Simple Icons found in config');
    }
    
    const moduleContent = `${iconNames.map(icon => `import { ${icon} } from '@icons-pack/svelte-simple-icons';`).join('\n')}

export const iconMap = {
${iconNames.map(icon => `  '${icon}': ${icon},`).join('\n')}
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string) {
  return iconMap[name as IconName] || null;
}

export function isValidIcon(name: string): name is IconName {
  return name in iconMap;
}
`;
    
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    writeFileSync(outputPath, moduleContent);
    console.log(`✓ Generated icons: ${iconNames.join(', ')}`);
    
  } catch (error) {
    console.error('Failed to generate icons:', error);
    process.exit(1);
  }
}

generateIconModule();