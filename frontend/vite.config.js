import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config() // Loads .env into process.env

const SOCKET_URL = process.env.VITE_SOCKET_URL || 'http://localhost:8000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: SOCKET_URL,
        ws: true,
      },
      '/api': {
        target: SOCKET_URL,
        changeOrigin: true,
      },
      '/download': {
        target: SOCKET_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
