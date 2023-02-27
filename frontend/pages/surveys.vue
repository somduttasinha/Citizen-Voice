<template>
    <NuxtLayout name="default">
        <div class="padding-16">
            <h2>Surveys</h2>
            <div class="row v-col-gutter-sm">
                <v-card v-for="survey in surveys"  :title="survey.name" :text="survey.description" variant="outlined">
                        <div class=" text-caption">
                            <span>Publish date: {{ formatDate(survey.publish_date) }}</span><br />
                            <span>Expire date: {{ formatDate(survey.expire_date) }}</span>
                        </div>
                        <v-card-actions style="padding-left: 0" margin="0" class="item-end v-mt-auto">
                            <v-btn :to="`/survey/${survey.id}`" color="primary">
                                <i class="fa-solid fa-play"></i>
                                Start survey
                            </v-btn>
                        </v-card-actions>

                    <!-- <v-card-section class="col flex flex-center">
                        <v-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </v-card-section> -->
                </v-card>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { formatDate } from "~/utils/formatData"
/**
 * All `/api/**` are proxies pointing to the local or production server of the backend.
 */
const url = "/api/surveys/"
const { data: surveys } = await useAsyncData(() => $cmsApi(url));
</script>
<style lang="scss">
.my-card {
    margin: 10px 15px
}

.padding-16 {
    padding: 16px;
}
</style>
