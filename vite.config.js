import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base if your repo name differs or use '/' for user site
export default defineConfig({
  plugins: [react()],
  base: '/aj_retro_portfolio/'
})
