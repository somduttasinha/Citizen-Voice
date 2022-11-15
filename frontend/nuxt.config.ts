// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { quasar } from "@quasar/vite-plugin"

export default defineNuxtConfig({
    ssr: false,
    build: {
        transpile: ['quasar']
    },
    plugins: [
        '~/plugins/quasar.client.js'
    ],
    css: [
        '@quasar/extras/roboto-font/roboto-font.css',
        '@quasar/extras/material-icons/material-icons.css',
        '~/assets/styles/quasar.sass'
    ],
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        plugins: [
            /* vue({
              template: { transformAssetUrls }
            }), */
            quasar({
                sassVariables: "~/assets/styles/quasar.variables.sass",
            }),
        ],

    },

})