import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { tomlWatcher } from './vite-plugins/toml-watcher';

export default defineConfig({
	plugins: [tomlWatcher(), tailwindcss(), sveltekit()]
});
