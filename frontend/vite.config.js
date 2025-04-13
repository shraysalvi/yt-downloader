import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),   tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000',
        ws: true,
      },
      '/api': {
        target: import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
      '/download': {
        target: import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
