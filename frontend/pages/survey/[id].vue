<template>
    <NuxtLayout name="default">
        <div>
            {{ $route.params.id }}

            <pre>{{ survey }}</pre>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref } from "vue"
/**
 * All `/api/**` are proxies pointing to the local or production server of the backend.
 */
const url = "/api/surveys/"
const data = ref([])
const route = useRoute()

const { data: survey } = await useAsyncData(() => $fetch(url + route.params.id));

</script>

<style lang="scss" scoped>

</style>