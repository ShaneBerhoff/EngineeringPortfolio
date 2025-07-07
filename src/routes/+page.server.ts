import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { HomeConfigSchema } from '$lib/types';

export function load() {
	const tomlContent = readFileSync('content/home.toml', 'utf8');
	const parsed = TOML.parse(tomlContent);
	const config = HomeConfigSchema.parse(parsed);

	return {
		name: config.name,
		description: config.description,
		contacts: config.contacts
	};
}
