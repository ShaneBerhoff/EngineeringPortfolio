export const prerender = true
import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { SiteConfigSchema } from '$lib/types';

export function load() {
    const tomlContent = readFileSync('content/site.toml', 'utf8');
    const parsed = TOML.parse(tomlContent);
    const config = SiteConfigSchema.parse(parsed);

    return config;
}
