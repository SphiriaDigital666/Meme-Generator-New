/* import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  inject({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  test: {
    environment: "jsdom",
  },
}) */


import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject';
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    react(),

    inject({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    

  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
})
