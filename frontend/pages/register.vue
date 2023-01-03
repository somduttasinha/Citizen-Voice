<template>
    <NuxtLayout name="default">
        <q-page style="display: flex;justify-content: center;align-items: center">
            <div class="padding-16">
                <center-div>
                    <template v-slot:centered-component>
                        <div class="q-pa-md custom-login-form">

                            <q-form ref="myForm" class="q-gutter-md">
                                <h1 class="text-h6">Register</h1>

                                <q-input filled v-model="username" label="Username *" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Please type something']" />

                                <q-input filled v-model="email" label="Email *" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Please type something']" />

                                <q-input filled v-model="password" label="Password *" lazy-rules :rules="[
    val => val !== null && val !== '' || 'Please enter your password'
]" />

                            </q-form>
                            <div class="q-mt-md">
                                <q-btn label="Submit" @click="onSubmit" color="primary" />
                            </div>
                        </div>
                    </template>
                </center-div>
            </div>
        </q-page>
    </NuxtLayout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import CenterDiv from "../layouts/centerDiv";
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()
const $q = useQuasar()

const username = ref(null)
const email = ref(null)
const password = ref(null)

onMounted(async () => {
    /**
     * Just to make sure a user is not logged-in already
     */
    await userStore.logout()
})


const onSubmit = async () => {
    const { status, succes } = await userStore.registerUser({ username: username.value, email: email.value, password: password.value })

    if (status.succes) {
        userStore.succesNotification()
        // NICETOHAVE: It mees like with the route `redirectedFrom` api you can get the previous link, you can use this to pass in the navigateTo function
        // See: https://nuxt.com/docs/api/composables/use-route
        await navigateTo('/login')
    }
}
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
