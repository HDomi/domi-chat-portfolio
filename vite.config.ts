import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/domi-chat-portfolio/',
  resolve: {
    alias: {
      '@': '/src',
      '@p': '/public',
    },
  },
})
