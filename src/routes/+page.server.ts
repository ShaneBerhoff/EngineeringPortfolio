import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { HomeConfigSchema } from '$lib/types';

export const prerender = true;
export function load() {
	const tomlContent = readFileSync('content/home.toml', 'utf8');
	const parsed = TOML.parse(tomlContent);

	return HomeConfigSchema.parse(parsed);
}
