<template>
    <ValidationProvider>
        <Wrapper :type="type">
            <v-text-field v-model="value" label="Label"></v-text-field>
        </Wrapper>
    </ValidationProvider>
</template>


<script setup>
import Wrapper from "./Wrapper.vue"

defineProps({
    type: String,
    title: String
})
const value = ref("")
</script>