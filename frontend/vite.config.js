import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = env.VITE_API_URL || 'http://localhost:5000';
  const USE_SSL = env.VITE_USE_SSL === 'true';

  return {
    plugins: [react(), tailwindcss(), removeConsole()],
    server: {
      port: 5173,
      proxy: {
        '/socket.io': {
          target: API_URL,
          ws: true,
          secure: USE_SSL,
        },
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: USE_SSL,
        },
        '/download': {
          target: API_URL,
          changeOrigin: true,
          secure: USE_SSL,
        },
      },
    },
  }
})
