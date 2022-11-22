<template>
    <NuxtLayout name="default">
        <div class="row q-col-gutter-sm">
            <q-card class="my-card col" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                        <div class="text-h5 q-mt-sm q-mb-xs">Survey title</div>
                        <div class="text-caption ">
                            Survey description
                        </div>
                        <div class=" text-caption">
                            <span class="">Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                            <span>Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                        </div>
                        <q-card-actions>
                            <q-btn color="primary">
                                Start survey
                            </q-btn>

                        </q-card-actions>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </q-card-section>
                </q-card-section>
            </q-card>
            <q-card class="my-card col q-px-xs" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                        <div class="text-h5 q-mt-sm q-mb-xs">Survey title</div>
                        <div class="text-caption ">
                            Survey description
                        </div>
                        <div class=" text-caption">
                            <span class="">Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                            <span>Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                        </div>
                        <q-card-actions>
                            <q-btn color="primary">
                                Start survey
                            </q-btn>

                        </q-card-actions>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </q-card-section>
                </q-card-section>


            </q-card>
            <q-card class="my-card col q-px-xs" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                        <div class="text-h5 q-mt-sm q-mb-xs">Survey title</div>
                        <div class="text-caption ">
                            Survey description
                        </div>
                        <div class=" text-caption">
                            <span class="">Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                            <span>Publish Date: Nov. 15, 2022, 1:26 p.m.</span>
                        </div>
                        <q-card-actions>
                            <q-btn color="primary">
                                Start survey
                            </q-btn>

                        </q-card-actions>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </q-card-section>
                </q-card-section>


            </q-card>
        </div>
        <pre>{{ data }}</pre>

    </NuxtLayout>
</template>

<script setup>
// TODO: Get surveys
const url = "http://127.0.0.1:8000/api/surveys/"

</script>


<style lang="scss" scoped>
.my-card {
    margin: 10px 15px
}
</style>