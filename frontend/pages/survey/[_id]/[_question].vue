<template>
    <NuxtLayout name="default">
        <div class="">
            <!-- Question card: number & text -->
            <v-card v-for="question in questions" class="my-card">
                <div class="text-h2 q-mt-sm q-mb-xs">Question {{ question.order }}, id: {{ question.id }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ question.text }}</div>

                <!-- Answer card-->
                <div class="my-card col">
                    <v-textarea name="title" v-model="answer_field" type="textarea" label="Give answer here"></v-textarea>
                </div>
            </v-card>

            <!-- TODO [manuel]: learn how to use v-cards -->


            <!-- <div class=""> -->
                <!-- Map card
          real v-if statement = (question.map_view != null || question.is_geospatial)-->
                <!--            <v-card v-if="question.is_geospatial" style="min-width: 300px;" class="my-card col">-->
                <!--                <div class="text-h5 q-mt-sm q-mb-xs">Map here</div>-->
                <!--                <div id="map"></div>-->
                <!--            </v-card>-->
            <!-- </div> -->

            <!-- <div class="my-card">
                <div class="text-h2 q-mt-sm q-mb-xs">Question (test) {{ $route.params._question }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ question.text }}</div>
            </div> -->
        </div>

        <div class="q-pa-md row items-start q-gutter-md">
            <!-- Map card -->
            <div v-show="(question.map_view != null || question.is_geospatial)" style="min-width: 600px;"
                class="my-card col">
                <div style="height:300px; width:600px">
                    <l-map ref="map" v-model:zoom="map_view.options.zoom" :center="map_view.options.center" :minZoom="1"
                        :maxZoom="18" @click="addCircle">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                            name="OpenStreetMap"></l-tile-layer>
                        <l-circle v-for="circle, index in map_view.options.points" :lat-lng="circle"
                            :radius="map_view.options.radius" :color="map_view.options.color"
                            :fillColor="map_view.options.fillColor"></l-circle>
                        <l-circle v-for="circle, index in circles" @click="removeCircle(index)" :lat-lng="circle"
                            :radius="map_view.options.radius" :color="map_view.options.color"
                            :fillColor="map_view.options.fillColor"></l-circle>
                        <l-control position="bottomleft">
                            <v-btn @click="resetMap">
                                Reset
                            </v-btn>
                        </l-control>
                    </l-map>
                </div>
            </div>

            <!-- Answer card
            <div class="my-card col">
                <v-textarea name="title" v-model="answer_field" type="textarea" label="Give answer here"></v-textarea>
            </div> -->


        </div>

        <!-- Navigation -->
        <div class="q-pa-md row">
            <v-btn @click="prevQuestion" color="primary">
                <i class="fa-solid fa-arrow-left"></i>
                <span class="q-pa-sm">Previous Question</span>
            </v-btn>
            <v-spacer> </v-spacer>
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
import { useSurveyStore } from "~/stores/survey.js";
import { useStoreResponse } from '~/stores/response'
// import leaflet from "leaflet"
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LCircle, LControl } from "@vue-leaflet/vue-leaflet";

const responseStore = useStoreResponse()
const question_url = "/api/questions/"
const mapview_url = "/api/map_views/"

const route = useRoute()
// Fixme: Cleanup these functions
const survey_store = useSurveyStore()
// const { data: survey } = await useAsyncData(() => $cmsApi(survey_url + route.params._id));
const { data: questions } = await survey_store.getQuestionsOfSurvey(route.params._id)
var current_question_index = 0

const survey = await responseStore.getSurvey(route.params._id)


// TODO: use an API to get n'th question of the selected survey
let demo_question = 1 // This is a hardcoded value for now
let { data: question } = await useAsyncData(() => $cmsApi(question_url + demo_question));
// TODO: get question.map_view once APIs are configured
const { data: map_view } = await useAsyncData(() => $cmsApi(mapview_url + 1)); // for demo only, I will use 5th

// to set up the map
// const center = ref([47.41322, -1.219482])
// const circleSettings = ref(
//   {circleColor: 'red', radius: 3000}
// )
const circles = ref([]) // this is what user will add
// L.latLng(47.414, -1.22),
// circleClickedAndRemoved is a boolean we use to keep track of whether a circle was just clicked
// if that is the case, we will not call the addCircle function
let circleClickedAndRemoved = false
let resetClicked = false


// to navigate from one question to the previous/next
const prevQuestion = async () => {
    // if this is not the first question:
    let question_to_navigate = (parseInt(route.params._question, 10) - 1)
    if (question_to_navigate != 0) {
        return navigateTo('/survey/' + route.params._id + '/' + question_to_navigate)
    } else {
        return navigateTo('/survey/' + route.params._id)
    }
}
const nextQuestion = async () => {
    // if this is not the last question:
    return navigateTo('/survey/' + route.params._id + '/' + (parseInt(route.params._question, 10) + 1))
}

// inspired by Roy J's solution on Stack Overflow:
// https://stackoverflow.com/questions/54499070/leaflet-and-vuejs-how-to-add-a-new-marker-onclick-in-the-map
const removeCircle = async (index) => {
    console.log("removeCircle function called")
    circles._value.splice(index, 1)
    circleClickedAndRemoved = true
}
const addCircle = async (event) => {
    if (circleClickedAndRemoved) {
        circleClickedAndRemoved = false
    } else if (resetClicked) {
        resetClicked = false
    } else {
        console.log("addCircle function called")
        circles._value.push(
            [event.latlng.lat, event.latlng.lng]
        )
    }
}
const resetMap = async () => {
    console.log("resetMap function called")
    circles._value.splice(0, circles._value.length)
    // TODO: reset map center and zoom level based on map_view
    resetClicked = true
}

</script>

<style lang="scss">
#map {
    height: 180px;
}
</style>
