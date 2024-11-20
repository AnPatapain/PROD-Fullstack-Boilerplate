/* vite.config.ts
 * This configuration file is for Vite, a fast build tool and development server for modern web projects.
 * Documentation: https://vitejs.dev/config/
 *
 * Author: Ke An Nguyen
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',       // Specifies the output directory for the built files.
  },
  server: {
    port: 3000,             // Vite server listens on port 3000
    open: false,            // Auto open browser when the server starts.
    host: '0.0.0.0',        // Bind the host to 0.0.0.0 to allows the connection from every local IPv4
  },
  resolve:{
    alias:{
      '@frontend': path.resolve(__dirname, './src'),
    },
  },
});
