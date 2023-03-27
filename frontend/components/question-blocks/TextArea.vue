<template>
    <Wrapper :type="question_type">
        <v-textarea v-model="value" label="Text of the question" variant="outlined"></v-textarea>
    </Wrapper>
</template>

<script setup>
import Wrapper from "./Wrapper.vue"
defineProps({
    question_type: String,
    title: String
})
const value = ref("")
</script>

