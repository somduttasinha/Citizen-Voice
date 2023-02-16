<template>
    <NuxtLayout name="default">
        <div class="padding-16">
            <v-container>
                <div class="flex flex-row">
                    <h2 class="inline-block">Surveys</h2>
                    <v-btn variant="outlined" href="/design/surveys/create">Add
                        survey</v-btn>
                </div>

                <v-card>
                    <v-list>
                        <v-hover v-slot="{ isHovering }" open-delay="200">
                            <v-list-item :link="true" :href="`design/surveys/${item.id}`"
                                :class="{ 'text-red': isHovering }" v-for="(item, i) in surveys" :key="i" :value="item"
                                active-color="primary">
                                <template v-slot:append>
                                    <v-icon icon="mdi-delete"></v-icon>
                                    <v-icon icon="mdi-dots-vertical"></v-icon>
                                </template>
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-file"></v-icon>
                                </template>

                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item>
                        </v-hover>
                    </v-list>

                    <v-list :items="surveys">

                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-list>
                </v-card>

                <v-list :items="items" item-title="name" item-value="id"></v-list>
                <!-- <q-list bordered class="rounded-borders custom-width-60-pc" style="max-width: 800px">
                        <list-item-survey-design v-for="survey in surveys" :survey_object="survey">
                        </list-item-survey-design>
                    </q-list> -->
                <!-- <q-input v-model="textName" label="Name" />
                    <q-input v-model="textDescription" label="Description" />
                    <q-btn class="h-min" color="white" text-color="black" label="Add survey" @click="addNewSurvey" /> -->
                <pre>{{ surveys }}</pre>
            </v-container>
        </div>
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

.custom-width-60-pc {
    width: 60%;
}

.padding-16 {
    padding: 16px;
}

.button {
    margin-left: 24px;
}
</style>
