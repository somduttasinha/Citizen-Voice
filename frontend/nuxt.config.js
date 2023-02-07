// https://v3.nuxtjs.org/api/configuration/nuxt.config
import vuetify from "vite-plugin-vuetify";

const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
    mode: '',
    build: {
        transpile: ["vuetify", "vue-toastification/nuxt"],
        loaders: {
            vue: {
                prettify: false // this is to make the nuxt application run
            }
        }
    },
    app: {
        head: {
            title: "Citizen Voice",
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
                {
                    rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
                    integrity: 'sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=', crossorigin: ''
                },
            ],
            script: [
                {
                    src: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js",
                    integrity: "sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=",
                    crossorigin: ""
                }
            ]
        }
    },
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
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
    // plugins: [''],
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        ssr: {
            noExternal: ["vuetify", "vue-toastification"],
        },

    },
    modules: [
        '@vueuse/nuxt', '@pinia/nuxt', 'nuxt-api-party',
        // this adds the vuetify vite plugin
        // also produces type errors in the current beta release
        async (options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
        },
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
    // See: https://github.com/johannschopplich/nuxt-api-party
    apiParty: {
        endpoints: {
            'cms-api': { // Becomes `$cmsApi()`
                url: process.env.API_PARTY_CMS_URL,
            }
        }
    },
})

