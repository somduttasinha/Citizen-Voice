<template>
    <div>
        {{ $route.params.id }}

        <pre>{{ data }}</pre>
    </div>
</template>

<script setup>
import { ref } from "vue"
const url = "http://127.0.0.1:8000/api/surveys/"
const data = ref([])
const route = useRoute();

async function getData() {
    const grabData = await fetch(url + route.params.id)
    const json = await grabData.json()
    data.value = json
}

await getData()

</script>

<style lang="scss" scoped>

</style>