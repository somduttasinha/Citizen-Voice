import { defineNuxtPlugin } from '#app'
import * as components from "quasar"

export default defineNuxtPlugin(nuxtApp => {
    const quasarUserOptions = {
        components,
        plugins: {}
    }

    nuxtApp.vueApp.use(components.Quasar, quasarUserOptions)
})

