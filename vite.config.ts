import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { tomlWatcher } from './vite-plugins/toml-watcher';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		tomlWatcher(),
		tailwindcss(),
		sveltekit(),
		Icons({
			autoInstall: true,
			compiler: 'svelte',
		})
	]
});
