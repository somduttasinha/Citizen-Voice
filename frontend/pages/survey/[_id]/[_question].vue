<template>
    <NuxtLayout name="default">


        <div class="q-pa-md row items-start q-gutter-md">
          <!-- Question card: number & text -->
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h2 q-mt-sm q-mb-xs">Question {{ $route.params._question }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ question.text }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-pa-md row items-start q-gutter-md">
          <!-- Map card -->
          <q-card v-show="(question.map_view != null || question.is_geospatial)"
                  style="min-width: 600px;" class="my-card col">
            <q-card-section>
                <div style="height:300px; width:600px">
                  <l-map ref="map" v-model:zoom="zoom" :center="center" :minZoom="1" :maxZoom="18" @click="addCircle">
                    <l-tile-layer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      layer-type="base"
                      name="OpenStreetMap"
                    ></l-tile-layer>
                    <l-circle v-for="circle, index in circles" @click="removeCircle(index)"
                              :lat-lng="circle"
                              :radius="circleSettings.radius"
                              :color="circleSettings.circleColor"
                    ></l-circle>
                  </l-map>
                </div>
            </q-card-section>
          </q-card>

          <!-- Answer card-->
          <q-card style="min-width: 300px;" class="my-card col">
            <q-card-section>

              <p> Answer here </p>
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

  import { ref } from "vue"
  import {navigateTo} from "nuxt/app";
  import leaflet from "leaflet"
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LCircle} from "@vue-leaflet/vue-leaflet";

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

  // to set up the map
  // these values will be replaced as soon as API for map_view is configured
  const zoom = ref(4)
  const center = ref([47.41322, -1.219482])
  const circleSettings = ref(
    {circleColor: 'red', radius: 3000}
  )
  const circles = ref([
        L.latLng(47.412, -1.218),
        L.latLng(47.413220, -1.219482),
        L.latLng(47.414, -1.22),
      ])
  // circleClickedAndRemoved is a boolean we use to keep track of whether a circle was just clicked
  // if that is the case, we will not call the addCircle function
  let circleClickedAndRemoved = false

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
    if(circleClickedAndRemoved) {
      circleClickedAndRemoved = false
    } else{
      console.log("addCircle function called")
      circles._value.push(
        L.latLng(event.latlng.lat, event.latlng.lng)
      )
    }
  }

</script>

<style lang="scss">
#map { height: 180px; }
</style>
