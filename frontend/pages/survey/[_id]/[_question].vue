<template>
    <NuxtLayout name="default">
        <div class="q-pa-md row items-start q-gutter-md">

            <q-card class="my-card">
              <q-card-section>
                <div class="text-h1 q-mt-sm q-mb-xs">Question {{ $route.params._question }}</div>
              </q-card-section>
            </q-card>

            <q-card class="my-card">
              <q-card-section>
                <div class="text-h4 q-mt-sm q-mb-xs">{{ question.text }}</div>
              </q-card-section>
            </q-card>

        </div>


        <!-- Navigation -->
        <div class="q-pa-md row">
          <q-btn @click="prevQuestion" color="primary">
              <i class="fa-solid fa-arrow-left"></i>
              <!-- <span class="q-pa-sm">Previous</span> -->
          </q-btn>
          <q-space />
          <q-btn @click="nextQuestion" color="primary">
              <i class="fa-solid fa-arrow-right"></i>
              <!-- <span class="q-pa-sm">Next</span> -->
          </q-btn>
        </div>

    </NuxtLayout>
</template>


<script setup>

</script>

<script setup>
  import { ref } from "vue"
  import {navigateTo} from "nuxt/app";
  /**
   * All `/api/**` are proxies pointing to the local or production server of the backend.
   */
  const survey_url = "/api/surveys/"
  const question_url = "/api/questions/"
  const data = ref([])
  const route = useRoute()

  const { data: survey } = await useAsyncData(() => $fetch(survey_url + route.params._id));

  // TODO: use an API to get n'th question of the selected survey
  // for demo only, I will use (5 + question id).
  let demo_question = parseInt(route.params._question, 10) + 5
  let { data: question } = await useAsyncData(() => $fetch(question_url + demo_question));

  const prevQuestion = async () => {
    demo_question = demo_question - 1;
    console.log(demo_question)
  }

  const nextQuestion = async () => {
    demo_question = demo_question + 1;
    console.log(demo_question)
    // return navigateTo('/survey/' + route.params._id + '/' + (parseInt(route.params._question, 10) + 1))
  }


</script>

<style lang="scss" scoped>

</style>
