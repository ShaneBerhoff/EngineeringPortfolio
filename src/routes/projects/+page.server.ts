import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { ProjectsConfigSchema } from '$lib/types';

export function load() {
    const tomlContent = readFileSync('content/projects.toml', 'utf8');
    const parsed = TOML.parse(tomlContent);
    const config = ProjectsConfigSchema.parse(parsed);

    return config;
}
