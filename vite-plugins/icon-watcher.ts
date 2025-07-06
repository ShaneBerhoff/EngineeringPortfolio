import type { Plugin } from 'vite';
import { spawn } from 'child_process';

export function iconWatcher(): Plugin {
  let isGenerating = false;
  
  return {
    name: 'icon-watcher',
    buildStart() {
      this.addWatchFile('content/home.toml');
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('home.toml') && !isGenerating) {
        isGenerating = true;
        console.log('TOML changed, regenerating icons...');
        
        const child = spawn('node', ['scripts/generate-icons.js'], { 
          stdio: 'inherit' 
        });
        
        child.on('close', (code) => {
          isGenerating = false;
          if (code === 0) {
            server.ws.send({
              type: 'full-reload'
            });
          }
        });
        
        return [];
      }
      
      if (file.includes('src/lib/generated/')) {
        return [];
      }
    }
  };
}