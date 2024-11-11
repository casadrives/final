import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-mapbox': ['mapbox-gl'],
          'vendor-utils': ['jspdf', 'jspdf-autotable'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  define: {
    'process.env.VITE_MAPBOX_TOKEN': JSON.stringify(process.env.VITE_MAPBOX_TOKEN),
    'process.env.VITE_MAPBOX_STYLE': JSON.stringify(process.env.VITE_MAPBOX_STYLE),
  }
});