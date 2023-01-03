// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { quasar } from "@quasar/vite-plugin"

const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
    build: {
        transpile: ["quasar"],
    },
    css: [
        "@quasar/extras/roboto-font/roboto-font.css",
        "@quasar/extras/material-icons/material-icons.css",
        // "@quasar/extras/fontawesome-v6/fontawesome-v6.css",
        "~/assets/styles/quasar.sass",
    ],
    imports: {
        dirs: [
            // Scan top-level modules      
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension      
            'composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all modules within given directory      
            'composables/**'
        ]
    },
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
        '@vueuse/nuxt', '@nuxtjs-alt/proxy', '@pinia/nuxt',
    ],
    runtimeConfig: {
        cookieName: process.env.COOKIE_NAME || '__session',
        cookieSecret: process.env.COOKIE_SECRET || 'secret',
        cookieExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_DAY.toString(), 10), // 1 day
        cookieRememberMeExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days
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
            '^/api/*/.*': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
            },
        },
        fetch: true
    },
})

// auth: {
//     strategies: {
//       local: {
//         endpoints: {
//           login: {
//             url: 'token/login/',
//             method: 'post',
//             propertyName: 'auth_token',
//           },
//           logout: { url: 'token/logout/', method: 'post' },
//           user: {
//             url: 'accounts/data/',
//             method: 'get',
//             propertyName: false,
//           },
//         },
//         tokenType: 'Token',
//         tokenName: 'Authorization',
//       },
//       redirect: {
//         login: '/login',
//         home: '/',
//       },
//     },