import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { iconWatcher } from './vite-plugins/icon-watcher';

export default defineConfig({
	plugins: [iconWatcher(), tailwindcss(), sveltekit()]
});
