<template>
    <NuxtLayout name="default">
        <form class="mt-4 flex flex-row" @submit.prevent="addNewSurvey">
            <div class="content">
                <h2 class="mb-4 font-bold">{{ textName || '[ Untitled ]' }}</h2>
                <v-text-field name="title" v-model="textName" label="Title"></v-text-field>
                <v-textarea name="title" v-model="textDescription" type="textarea" label="Description"></v-textarea>
                <div class="">
                    <h3 class="mb-6">Questions</h3>

                    <div v-for="(item, i) in questions">
                        <component :is="item.comp" :type="item.type"></component>
                    </div>

                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn class="cursor-pointer" v-bind="props">
                                <v-icon>mdi-plus-circle</v-icon> Add Question
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item v-for="(item, i) in questionTypes" :key="i" :value="i" @click="addQuestion(item)">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>





                    <!-- <v-overlay v-model="overlay" contained class="align-center justify-center items-center">
                        <div class="max-w-2xl py-4 px-5 bg-white w-[80vw] h-[40vh]">
                            <div class="w-full flex justify-between">
                                <h3 class="text-2xl font-bold">Add Question</h3>
                                <v-btn size="22px" icon="mdi-close" @click="overlay = false">
                                </v-btn>
                            </div>
                            <div class="w-full mt-2">
                                <div v-for="question in questionTypes">
                                    <p></p>
                                    <img src="/assets/img/ui-placeholder.svg" alt="">
                                </div>
                            </div>
                        </div>

                    </v-overlay> -->
                </div>
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
import { TEXT, SHORT_TEXT } from "~/constants/questions"
import { TextArea, TextShort } from "@/components/questionBlocks"
// import BaseButton from "~/components/BaseButton";
import { useSurveyStore } from "~/stores/survey"
import * as R from 'ramda'

// Make sure the user is authenticated or trigger the reroute to login
definePageMeta({ middleware: 'authorization' })

const route = useRoute()
const overlay = ref(false)
// probably better to store this in the store
const questions = ref([])

const questionTypes = [
    {
        type: TEXT,
        title: "Text area",
        comp: TextArea
    },
    {
        type: SHORT_TEXT,
        title: "Text Short",
        comp: TextShort
    },
]

const surveyStore = useSurveyStore()
const { data: survey, refresh } = await surveyStore.getSurvey(route.params._id)

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
    } else {
        refresh()
    }

}

// Add Question handler
const addQuestion = (item) => {
    console.log('item //> ', item)
    questions.value.push(item)
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
