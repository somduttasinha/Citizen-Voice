// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { quasar } from "@quasar/vite-plugin"


export default defineNuxtConfig({
    build: {
        transpile: ["quasar"],
        loaders:  {
          vue: {
             prettify: false // this is to make the nuxt application run
          }
        },
        resolve: {
          extensions: ['.js', '.vue']
        }
    },
    app: {
        head: {
          title: "Citizen Voice",
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
               integrity:'sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=', crossorigin:''
            },
          ],
          script: [
            {
              src:"https://unpkg.com/leaflet@1.9.3/dist/leaflet.js",
              integrity:"sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=",
              crossorigin:""
            }
          ]
        }
    },
    css: [
        "@quasar/extras/roboto-font/roboto-font.css",
        "@quasar/extras/material-icons/material-icons.css",
        "@quasar/extras/fontawesome-v6/fontawesome-v6.css",
        "~/assets/styles/quasar.sass",
    ],
    plugins: [],
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
    modules: [
        '@vueuse/nuxt', '@nuxtjs-alt/proxy',
    ],
    runtimeConfig: {
        public: {
            baseAPI: process.env.BASE_API || 'http://localhost:3000',
            apiHostPayment: '',
        },
        paymentSecretKey: '',
    },
    proxy: {
        enableProxy: true,
        proxies: {
            // string shorthand
            '/foo': 'http://localhost:4567',
            // with options
            '^/api/.*': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
            },
        },
        fetch: true
    }
})
