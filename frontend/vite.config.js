import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  plugins: [react(), tailwindcss(), removeConsole()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:8000',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/download': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
