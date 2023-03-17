<template>
    <NuxtLayout name="default">
        <div class="">
            <!-- Question card: number & text -->
            <v-card v-for="question in questions" class="my-card">
              <div class="text-h2 q-mt-sm q-mb-xs">Question {{ question.order }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{question.text}}</div>
            </v-card>
        </div>

        <div class="">
            <!-- Map card
          real v-if statement = (question.map_view != null || question.is_geospatial)-->
<!--            <v-card v-if="question.is_geospatial" style="min-width: 300px;" class="my-card col">-->
<!--                <div class="text-h5 q-mt-sm q-mb-xs">Map here</div>-->
<!--                <div id="map"></div>-->
<!--            </v-card>-->
        </div>


        <!-- Navigation -->
        <div class="q-pa-md row">
            <v-btn @click="prevQuestion" color="primary">
                <i class="fa-solid fa-arrow-left"></i>
              <span class="q-pa-sm">Previous Question</span>
            </v-btn>
            <v-space />
            <v-btn @click="nextQuestion" color="primary">
                <i class="fa-solid fa-arrow-right"></i>
              <span class="q-pa-sm">Next Question</span>
            </v-btn>
        </div>

    </NuxtLayout>
</template>


<script setup>
import { ref } from "vue"
import { navigateTo } from "nuxt/app";

/**
 * All `/api/**` are proxies pointing to the local or production server of the backend.
 */
const survey_url = "/api/surveys/"
const question_url = "/api/questions/"
const data = ref([])
const route = useRoute()
import {useSurveyStore} from "~/stores/survey.js";
const survey_store = useSurveyStore()
// const { data: survey } = await useAsyncData(() => $cmsApi(survey_url + route.params._id));
const { data : questions } = await survey_store.getQuestionsOfSurvey(route.params._id)
var current_question_index = 0
// TODO: use an API to get n'th question of the selected survey
// for demo only, I will use (5 + question id).
let demo_question = parseInt(route.params._question, 10) + 5
let { data: question } = await useAsyncData(() => $cmsApi(question_url + demo_question));


const prevQuestion = async () => {
// TODO: Implement
}

const nextQuestion = async () => {
// TODO: Implement
}

</script>

<style lang="scss">
#map {
    height: 180px;
}
</style>
