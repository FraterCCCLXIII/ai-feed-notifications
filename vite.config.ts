import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 12000,
    strictPort: true,
    cors: {
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Frame-Options': 'ALLOWALL'
    },
    hmr: {
      clientPort: 443
    },
    fs: {
      strict: false
    },
    allowedHosts: [
      'work-1-sfrzpjdeisbwmmvu.prod-runtime.all-hands.dev',
      'work-2-sfrzpjdeisbwmmvu.prod-runtime.all-hands.dev',
      'localhost'
    ]
  },
  preview: {
    port: 12000,
    host: '0.0.0.0',
    allowedHosts: [
      'work-1-sfrzpjdeisbwmmvu.prod-runtime.all-hands.dev',
      'work-2-sfrzpjdeisbwmmvu.prod-runtime.all-hands.dev',
      'localhost'
    ]
  }
})
