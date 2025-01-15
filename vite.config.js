import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mi-portafolio-personal/',  // Asegúrate de poner el nombre de tu repositorio aquí
  plugins: [react()],
})
