<template>
    <NuxtLayout name="default">
        <q-page style="display: flex;justify-content: center;align-items: center">
            <div class="padding-16">
                <center-div>
                    <template v-slot:centered-component>
                        <div class="q-pa-md custom-login-form">

                            <q-form ref="myForm" class="q-gutter-md">

                                <q-input filled v-model="email" label="Email *" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Please type something']" />

                                <q-input filled v-model="password" label="Password *" lazy-rules :rules="[
                                    val => val !== null && val !== '' || 'Please enter your password'
                                ]" />

                            </q-form>
                            <div class="q-mt-md">
                                <q-btn label="Submit" @click="onSubmit" color="primary" />
                                <q-btn label="Reset" @click="onReset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </div>
                    </template>
                </center-div>
            </div>
        </q-page>
    </NuxtLayout>
</template>

<script setup>
import CenterDiv from "../layouts/centerDiv";
import { useQuasar } from 'quasar'

const $q = useQuasar()
const data = ref(null)
const email = ref(null)
const password = ref(null)


const url = "/api/auth/login/"

const onSubmit = async () => {
    let formData = new FormData();
    formData.append('password', password.value);
    formData.append('email', email.value);

    const { data: login } = await useAsyncData(() => $fetch(url, {
        method: "post",
        body: formData
    }));

    if (login?.value?.token) {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Logged-in'
        })
        // Store auth token in local storage
        localStorage.setItem('token', login.value.token)
    } else {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong, make sure you have the right credentials'
        })
    }

}

const onReset = () => {
    email.value = null
    password.value = false
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
