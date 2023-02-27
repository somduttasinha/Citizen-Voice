<template>
    <ValidationProvider>
        <Wrapper :type="type">
            <v-textarea v-model="value" label="Text of the question" variant="outlined"></v-textarea>
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