<template>
  <NuxtLayout name="default">
    <q-page>
      <div class="padding-16">
        <h2>My Surveys</h2>
        <div class="custom-sub-container">
          <q-list bordered class="rounded-borders custom-width-60-pc" style="max-width: 800px">
            <!--          <q-item-label header>Google Inbox style</q-item-label>-->
            <list-item-survey-design v-for="survey in surveys" :survey_object="survey"> </list-item-survey-design>
            <!--          <q-separator/>-->
          </q-list>
          <q-input v-model="textName" label="Name" />
          <q-input v-model="textDescription" label="Description" />
          <q-btn color="white" text-color="black" label="Add survey" @click="AddSurvey" />
        </div>
      </div>
    </q-page>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from "../components/BaseButton";
import ListItemSurveyDesign from "../components/ListItemSurveyDesign";
import { formatDate } from "~/utils/formatData"
/**
 * All `/api/**` are proxies pointing to the local or production server of the backend.
 */
const url = "/api/surveys/"
const { data: surveys } = await useAsyncData(() => $fetch(url));

</script>

<script submit>
const add_url = "/api/newsurvey/";

// Get the CSRF token in the cookie stored in the browser
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

export default {
  data() {
    return {
      textName: '',
      textDescription: '',
    }
  },
  methods: {
    AddSurvey() {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        body: JSON.stringify({
          name: this.textName,
          description: this.textDescription,
          // Dummy variables for time for now
          publish_date: "2029-06-15T13:45:30",
          expire_date: "2039-06-15T13:45:30"
        })
      };
      fetch(add_url, requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-bg-white {
  background-color: #fff;
}

.custom-list-item {
  //min-height: 50vh;
  height: calc(100vh/3);
  background: #fff;
  overflow: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
  /* make scrollbar transparent */
}

.custom-scroll {
  position: relative;
  max-height: 100%;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
  /* make scrollbar transparent */
}

.custom-bg-red {
  min-width: 100%;
  min-height: 100%;
  background: #b02a37;
}

.custom-sub-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}

.custom-width-60-pc {
  width: 60%;
}

.padding-16 {
  padding: 16px;
}
</style>
