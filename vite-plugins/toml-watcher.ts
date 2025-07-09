import type { Plugin } from 'vite';
import { spawn } from 'child_process';
import { resolve } from 'path';

export function tomlWatcher(): Plugin {
	let isGenerating = false;
	let server: any = null;
	let reloadTimeout: NodeJS.Timeout | null = null;

	return {
		name: 'toml-watcher',

		buildStart() {
			this.addWatchFile('content/home.toml');
			this.addWatchFile('content/skills.toml');
		},

		configureServer(viteServer) {
			server = viteServer;

			// Add generated files to Vite's watcher
			const generatedFiles = ['src/lib/generated/icons.ts'];

			generatedFiles.forEach((file) => {
				viteServer.watcher.add(file);
			});

			viteServer.watcher.on('change', (filePath) => {
				// Only handle relative paths to avoid duplicates
				if (!filePath.startsWith('/') && generatedFiles.some((f) => filePath.endsWith(f))) {
					console.log(`🔄 Generated file changed: ${filePath}`);

					// Invalidate the module (need absolute path for module graph)
					const absolutePath = resolve(filePath);
					const module = server.moduleGraph.getModuleById(absolutePath);
					if (module) {
						server.moduleGraph.invalidateModule(module);
						console.log(`🗑️ Invalidated module: ${filePath}`);
					}

					// Debounce reload to handle multiple file changes at once
					if (reloadTimeout) {
						clearTimeout(reloadTimeout);
					}

					reloadTimeout = setTimeout(() => {
						server.ws.send({ type: 'full-reload' });
						reloadTimeout = null;
					}, 50);
				}
			});
		},

		async handleHotUpdate({ file }) {
			if (file.endsWith('home.toml') || file.endsWith('skills.toml') && !isGenerating) {
				isGenerating = true;
				console.log('🔄 TOML changed, regenerating icons...');

				try {
					await new Promise<void>((resolve, reject) => {
						const child = spawn('tsx', ['scripts/generate.ts'], {
							stdio: 'inherit'
						});

						child.on('close', (code) => {
							isGenerating = false;
							if (code === 0) {
								console.log('✅ Icons regenerated successfully');
								resolve();
							} else {
								reject(new Error(`Generation failed with code ${code}`));
							}
						});

						child.on('error', (error) => {
							isGenerating = false;
							reject(error);
						});
					});

					// Don't trigger reload here - let the file watcher handle it
				} catch (error) {
					console.error('❌ Failed to regenerate icons:', error);
					isGenerating = false;
				}

				return [];
			}

			// Don't trigger HMR for generated files - file watcher handles this
			if (file.includes('src/lib/generated/')) {
				return [];
			}
		}
	};
}
