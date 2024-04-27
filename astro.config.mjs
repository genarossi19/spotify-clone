import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), svelte()],
  //normalmente astro funciona en el cliente. Vamos a hacer que funcione en el servidor
  output: 'server'
});