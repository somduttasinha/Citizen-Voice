<template>
    <NuxtLayout name="default">
        <client-only placeholder="Loading...">
            <form class="mt-4 flex flex-row" @submit.prevent="saveSurvey">
                <div class="content">
                    <h2 class="mb-4 font-bold">{{ textName || '[ Untitled ]' }}</h2>
                    <v-text-field name="title" v-model="textName" label="Title"></v-text-field>
                    <v-textarea name="title" variant="outlined" v-model="textDescription" type="textarea"
                        label="Description"></v-textarea>
                    <div class="">
                        <h3 class="mb-6">Questions</h3>

                        <h3>Draggable {{ draggingInfo }}</h3>

                        <!-- Modulair question types -->
                        <!-- <pre>{{ R.find(R.propEq('question_type', item.question_type), questionTypes).comp }}</pre> -->
                        <!-- <draggable v-model="currentQuestions" tag="ul"  class="list-group" handle=".handle" item-key="order">
                            <template #item="{ item, index }">
                                <pre>{{ questionTypes[item.question_type] }}</pre>

                                <component v-if="questionTypes[item.question_type]" :is="questionTypes[item.question_type]"
                                    :type="item.question_type"></component>
                            </template>
                        </draggable> -->
                        
                        <!-- <div> -->
                        <!-- <component v-if="questionTypes[element.question_type]" :is="questionTypes[element.question_type]"
                            :type="element.question_type"></component> -->
                        <!-- </div> -->
                        <draggable v-model="currentQuestions" item-key="id">
                            <template #item="{ element }">
                                <div>{{ element.text }}</div>
                            </template>
                        </draggable>


                        <!-- <div v-for="(item, i) in ">
                            <component :is="item.comp" :type="item.type"></component>
                        </div> -->

                        <pre>{{ JSON.stringify(currentQuestions, 0 ,4 ) }}</pre>

                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn class="cursor-pointer" v-bind="props">
                                    <v-icon>mdi-plus-circle</v-icon> Add Question
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item v-for="(item, i) in questionTypes" :key="i" :value="i"
                                    @click="addQuestion(item)">
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
                    <VBtn variant="outlined" class="me-4" type="submit" @click="saveSurvey">
                        Save survey
                    </VBtn>
                </aside>
            </form>
        </client-only>
    </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { TEXT, SHORT_TEXT } from "~/constants/questions"
import { TextArea, TextShort } from "@/components/question-blocks"
// import BaseButton from "~/components/BaseButton";
import { useSurveyStore } from "~/stores/survey"
import { useQuestionDesignStore } from "~/stores/questionDesign"
import * as R from 'ramda'

// Make sure the user is authenticated or trigger the reroute to login
definePageMeta({ middleware: 'authorization' })

/**
 * States
 */

const dragging = ref(false)
const route = useRoute()


const draggingInfo = computed(() => {
    return dragging.value ? "under drag" : "";
});


// const questionTypes = [

//     {
//         question_type: TEXT,
//         title: "Text area",
//         comp: shallowRef(TextArea)
//     },
//     {
//         question_type: SHORT_TEXT,
//         title: "Text Short",
//         comp: shallowRef(TextShort)
//     },
// ]

const questionTypes = {
    [TEXT]: TextArea,
}

/**
 * Survey
 */

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
const saveSurvey = async () => {
    const { id } = await surveyStore.createSurvey(textName.value, textDescription.value, current_date, expire_date)

    // Check if the id is already in the url parameter, if not redirect the page to that url
    if (id) {
        await navigateTo('/design/surveys/' + id)
    } else {
        refresh()
    }

}

/**
 * Questions
 */
const questionStore = useQuestionDesignStore()
// Get and set the questions
await questionStore.setOrderedQuestionBySurvey(3)
const { currentQuestions } = storeToRefs(questionStore)

console.log('currentQuestions //> ', currentQuestions)

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
