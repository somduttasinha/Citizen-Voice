<template>
    <NuxtLayout name="default">
        <div class="padding-16">
            <!-- <p>Counter: {{this.$store.state.counter}}</p>-->
            <h2 v-if="survey">{{ survey.name }}</h2>

            <p v-if="survey">{{ survey.description }} </p>
            <!-- <p v-if="survey">Publish date: {{ formatDate(survey.publish_date) }}</p> -->
            <p v-if="survey">Expire date: {{ formatDate(survey.expire_date) }}</p>

            <v-btn @click="createResponse" color="secondary">
                <i class="fa-solid fa-play"></i>
                <span class="q-pa-sm">Start survey</span>
            </v-btn>

            <!--{{ $route.params.id }}
                <pre>{{ survey }}</pre> -->
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref } from "vue"
import { navigateTo } from "nuxt/app";
import { useStoreResponse } from '~/stores/response'

const storeResponse = useStoreResponse()
const survey_url = "/api/surveys/"
const create_response_url = "/api/responses/"
const origin_url = "http://localhost:3000"
const data = ref([])
const route = useRoute()

console.log('survey id on route //>', route.params._id)

const survey = await storeResponse.getSurvey({ id: route.params._id })

const createResponse = async () => {
    // Make a POST request to your Django API endpoint to create a new Response object
    const _response = await storeResponse.createResponse({surveyId: route.params._id})


    if (_response) { // THIS ENSURES  respondentId is available
        // Navigate to the /survey/${survey.id}/1 page after the response is created

        // Find how to retrieve and set the interviewerId to the stor
        console.log('successfull creating response//>', _response)
        return navigateTo('/survey/' + route.params._id + '/1')
    }
    else {
        console.log('createResponse did not return anything//>')
        // return navigateTo('/survey/' + route.params._id)
    }
}

</script>

