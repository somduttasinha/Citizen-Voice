<template>
    <NuxtPage />
</template>

<script setup>
import { useGlobalStore } from "~/stores/global"
import { useQuasar } from 'quasar'

const $q = useQuasar()
const global = useGlobalStore()

onMounted(() => {
    /**
     * Store Quasar Notify globally to use in the User store
     */
    global.setQNotify($q.notify)
})
</script>