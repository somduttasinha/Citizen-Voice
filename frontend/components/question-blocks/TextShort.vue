<template>
    <Wrapper :type="question_type">
        <v-text-field v-model="value" label="Label"></v-text-field>
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