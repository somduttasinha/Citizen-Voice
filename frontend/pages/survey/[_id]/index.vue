<template>
    <NuxtLayout name="default">
        <div class="padding-16">
            <h2>{{ survey.name }}</h2>

            <!-- <p>Counter: {{this.$store.state.counter}}</p>-->
            <p>{{ survey.description }} </p>
            <p>Publish date: {{ formatDate(survey.publish_date) }}</p>
            <p>Expire date: {{ formatDate(survey.expire_date) }}</p>
            <v-btn @click="createResponse" color="primary">
                <i class="fa-solid fa-play"></i>
                <span class="q-pa-sm">Start survey</span>
            </v-btn>

            <!--{{ $route.params.id }}
                <pre>{{ survey }}</pre>-->
        </div>
    </NuxtLayout>
</template>


<script setup>

</script>

<script setup>
  import { ref } from "vue"
  import {navigateTo} from "nuxt/app";
  import { mapMutations } from 'vuex'
  // import { store } from './store'

  /**
   * All `/api/**` are proxies pointing to the local or production server of the backend.
   */
  const survey_url = "/api/surveys/"
  const create_response_url = "/api/responses/"
  const origin_url = "http://localhost:3000"
  const data = ref([])
  const route = useRoute()

  const { data: survey } = await useAsyncData(() => $fetch(survey_url + route.params._id));

  const createResponse = async () => {
    // Make a POST request to your Django API endpoint to create a new Response object
    console.log("function called")
    const csrfResponse = await fetch('/api/csrf/', {
      mode: 'cors',
      headers: {
        Origin: origin_url
      }
    })
    const csrfJson = await csrfResponse.json()
    const csrfToken = csrfJson.csrf_token
    // console.log(csrfToken)

    // Make a POST request to the endpoint
    const response = await fetch(create_response_url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        Origin: origin_url
      },
      // Pass the data for the new Response object as the request body
      // TODO: have the respondent set to the logged in user
      body: JSON.stringify({
        survey: survey_url + route.params._id + "/",
        interview_uuid: "123",
        respondent: "/api/users/1/"
      })
    })

    const responseJson = await response.json()
    console.log(responseJson)
    console.log("function ended")

    // const response_state = this.$store.state.response

    // Navigate to the /survey/${survey.id}/1 page after the response is created
    return navigateTo('/survey/' + route.params._id + '/1')
  }

</script>

