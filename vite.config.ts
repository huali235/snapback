import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, cpSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy static extension files after build
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    writeBundle() {
      const distDir = path.join(__dirname, 'dist');

      // Copy manifest.json
      copyFileSync(
        path.join(__dirname, 'manifest.json'),
        path.join(distDir, 'manifest.json')
      );

      // Copy icons directory
      if (existsSync(path.join(__dirname, 'icons'))) {
        cpSync(
          path.join(__dirname, 'icons'),
          path.join(distDir, 'icons'),
          { recursive: true }
        );
      }

      // Copy assets directory
      if (existsSync(path.join(__dirname, 'assets'))) {
        cpSync(
          path.join(__dirname, 'assets'),
          path.join(distDir, 'assets'),
          { recursive: true }
        );
      }

      console.log('✓ Extension files copied');
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyExtensionFiles(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/content/index.tsx'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        // This is the key: inline all dependencies into each output file
        inlineDynamicImports: false,
      },
    },
  },
});
