/* vite.config.ts
 * This configuration file is for Vite, a fast build tool and development server for modern web projects.
 * Author: Ke An Nguyen
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

// Documentation: https://vitejs.dev/config/
// This configuration sets up Vite with React support and custom build and server options.

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: './dist',       // Specifies the output directory for the built files.
  },
  server: {
    port: 3000,             // Vite server listens on port 3000
    open: false,            // Auto open browser when the server starts.
    host: '0.0.0.0',        // Bind the host to 0.0.0.0 to allows the connection from every local IPv4
  },
  resolve: {
    alias: {
      '@app/shared': resolve(__dirname, '../shared/src'),
      '@app/models': resolve(__dirname, '../models/src'),
    }
  }
});
