<template>
    <NuxtLayout name="default">
        <q-page>
            <div class="padding-16 container">
                <div class="content">
                    <h2>{{ textName || '[Untitled]' }}</h2>
                    <q-input class="input" v-model="textName" label="Name" />
                    <q-input class="input" v-model="textDescription" type="textarea" label="Description" />
                </div>
                <aside class="aside">
                    <q-btn color="white" text-color="black" label="Save survey" @click="addNewSurvey" />
                </aside>
            </div>
        </q-page>
    </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from "~/components/BaseButton";
import ListItemSurveyDesign from "~/components/ListItemSurveyDesign";
import { formatDate } from "~/utils/formatData"
import { useSurveyStore } from "~/stores/survey"

// Make sure the user is authenticated or trigger the reroute to login
definePageMeta({ middleware: 'authorization' })

/**
 * All `/api/**` are proxies pointing to the local or production server of the backend.
 */

const url = "/api/surveys/"
const surveyStore = useSurveyStore()
const { data: surveys } = await useAsyncData(() => $cmsApi(url));
var expire_date = new Date();
var current_date = new Date();
const textName = ref(null)
const textDescription = ref(null)

// set default expire date 100 days after current day
expire_date.setDate(expire_date.getDate() + 100);
current_date.setDate(current_date.getDate());

// Add a new survey using the surveyStore, based on what is entered in the field.
const addNewSurvey = async () => {
    await surveyStore.createSurvey(textName.value, textDescription.value, current_date, expire_date)
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
