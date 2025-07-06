import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { HomeConfigSchema } from '$lib/types';
import { isValidIcon } from '$lib/generated/icons';

export function load() {
	const tomlContent = readFileSync('content/home.toml', 'utf8');
	const parsed = TOML.parse(tomlContent);
	const config = HomeConfigSchema.parse(parsed);

	for (const contact of config.contacts) {
		if (!isValidIcon(contact.logo)) {
			throw new Error(`Invalid icon "${contact.logo}" for contact "${contact.name}"`);
		}
	}

	return {
		name: config.name,
		description: config.description,
		contacts: config.contacts
	};
}
