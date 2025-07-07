import { readFileSync } from 'fs';
import { generateLogosModule } from './generate-logos';
import { generateIconsModule } from './generate-icons';
import { HomeConfigSchema } from '../src/lib/types';
import TOML from '@iarna/toml';

function generateModule() {
	try {
		const tomlContent = readFileSync('content/home.toml', 'utf8');
		const parsed = TOML.parse(tomlContent);
		const config = HomeConfigSchema.parse(parsed);

		const logoNames = [
			...new Set(
				config.contacts.map((contact) => contact.logo).filter((logo) => typeof logo === 'string')
			)
		];

		const iconNames = [
			...new Set(
				config.contacts.map((contact) => contact.icon).filter((icon) => typeof icon == 'string')
			)
		];

		if (logoNames.length !== 0) {
			generateLogosModule(logoNames);
		}

        if (iconNames.length !== 0){
            generateIconsModule(iconNames);
        }

	} catch (error) {
		console.error('Failed to parse toml files:', error);
		process.exit(1);
	}
}

generateModule();
