<template>
    <NuxtLayout name="default">
        <form class="mt-4" @submit.prevent="addNewSurvey">
            <div class="content">
                <h2>{{ textName || '[ Untitled ]' }}</h2>
                <v-text-field name="title" v-model="textName" label="Title"></v-text-field>
                <v-textarea name="title" v-model="textDescription" type="textarea" label="Description"></v-textarea>
            </div>
            <aside class="aside">
                <VBtn variant="outlined" class="me-4" type="submit" @click="addNewSurvey">
                    Save survey
                </VBtn>
            </aside>
        </form>
    </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
// import BaseButton from "~/components/BaseButton";
import { useSurveyStore } from "~/stores/survey"
import * as R from 'ramda'
const route = useRoute()

const surveyStore = useSurveyStore()

const survey_url = 'api/surveys/'
const { data: survey, refresh } = await useAsyncData(() => $cmsApi(survey_url + route.params._id));

// Make sure the user is authenticated or trigger the reroute to login
definePageMeta({ middleware: 'authorization' })

var expire_date = new Date();
var current_date = new Date();

const textName = ref(R.pathOr('', ['value', 'name'], survey))
const textDescription = ref(R.pathOr('', ['value', 'description'], survey))

// set default expire date 100 days after current day
expire_date.setDate(expire_date.getDate() + 100);
current_date.setDate(current_date.getDate());

// Add a new survey using the surveyStore, based on what is entered in the field.
const addNewSurvey = async () => {
    const { id } = await surveyStore.createSurvey(textName.value, textDescription.value, current_date, expire_date)

    // Check if the id is already in the url parameter, if not redirect the page to that url
    if (id) {
        await navigateTo('/design/surveys/' + id)
    }  else {
        refresh()
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

.content {
    width: 100%;
}

.container {
    display: flex;
    max-width: 975px;
    margin: 0 auto;
    padding: 32px 16px;
}

.aside {
    min-width: 200px;
    padding-top: 24px;
    padding-left: 32px;
}

.custom-width-60-pc {
    width: 60%;
}

.input {
    margin-bottom: 24px;
}
</style>
