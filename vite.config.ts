import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/frontend'
  },
  server: {
    port: 3000,
    open: true,
    https: {
      key: './scripts/tls-dev/private.key',
      cert: './scripts/tls-dev/certificate.crt'
    }
  }
})
