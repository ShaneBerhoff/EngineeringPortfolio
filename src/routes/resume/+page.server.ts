import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { ResumeConfigSchema } from '$lib/types';

export function load() {
    const tomlContent = readFileSync('content/resume.toml', 'utf8');
    const parsed = TOML.parse(tomlContent);
    const config = ResumeConfigSchema.parse(parsed);

    return config;
}
