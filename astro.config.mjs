// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [expressiveCode({})],
})
