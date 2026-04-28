import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
// https://astro.build/config
export default defineConfig({
  // Replace with your production URL before deploy (canonical, og:url, hreflang absolutes).
  site: 'https://aena-redesign.vercel.app/',
  integrations: [svelte()],
});