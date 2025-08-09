import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { ExperienceConfigSchema } from '$lib/types';

export function load() {
    const tomlContent = readFileSync('content/experience.toml', 'utf8');
    const parsed = TOML.parse(tomlContent);
    const config = ExperienceConfigSchema.parse(parsed);

    return config;
}
