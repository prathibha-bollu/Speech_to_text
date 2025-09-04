import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './Speech_to_text', // important if you want to deploy on GitHub Pages or a subfolder
});
