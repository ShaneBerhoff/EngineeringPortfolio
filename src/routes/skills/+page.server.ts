import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { SkillsConfigSchema } from '$lib/types';

export function load() {
    const tomlContent = readFileSync('content/skills.toml', 'utf8');
    const parsed = TOML.parse(tomlContent);
    const config = SkillsConfigSchema.parse(parsed);

    return config;
}
