<template>
    <v-container fluid @input="event => updateAnswer(event)">
  <!--    <p>{{ selected }}</p>-->
       <!-- TODO: use v-for to loop through the choices -->
      <v-checkbox
        v-model="selected"
        :label="question.choices"
        value="Choice 1"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="Option 2"
        value="Option 2"
      ></v-checkbox>
    </v-container>
  <!--  <h2>{{selected}}</h2>-->
  </template>
  
  <script>
  export default {
    name: "AnswerTypeSelectMultiple",
  }
  </script>
  
  <script setup>
  const emit = defineEmits(['updateAnswer'])
  const answers = ref([])
  const selected = ref([])
  const props = defineProps({
    question_index: Number,
    question: Object,
    answer: Object,
  })

  const choice = "Choice 1"

  function updateAnswer(event) {
    props.answer.text = selected.value
    emit('updateAnswer', props.answer, props.question_index)
  }
  </script>
  <style scoped>
  </style>
  