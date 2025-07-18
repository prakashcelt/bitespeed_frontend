import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          reactflow: ['reactflow']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0'
  }
})
