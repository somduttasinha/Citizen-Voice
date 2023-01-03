<template>
    <NuxtLayout name="default">
        <q-page style="display: flex;justify-content: center;align-items: center">
            <div class="padding-16">
                <center-div>

                </center-div>
            </div>
        </q-page>
    </NuxtLayout>
</template>

<script setup>
import CenterDiv from "../layouts/centerDiv";
import { useQuasar } from 'quasar'

// Make sure the user is authenticated or trigger the reroute to login
definePageMeta({ middleware: 'authorization' })

const $q = useQuasar()
const data = ref(null)
const email = ref(null)
const password = ref(null)

const url = "/api/auth/login/"

// const { me } = useAuth()

// me()

</script>

<style lang="scss" scoped>
.padding-16 {
    width: 100%;
    height: 100%;
    padding: 16px;
}

.custom-container {
    width: 100%;
    height: 100vh;
}

.custom-login-form {
    width: 33%;
    min-width: 100px;
}
</style>
