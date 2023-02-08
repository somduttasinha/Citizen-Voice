<template>
    <NuxtLayout name="default">
        <div class="padding-16">
            <center-div>
                <div class="custom-login-form">
                    <h1 class="text-h6">Login or
                        <NuxtLink to="/register">create an account</NuxtLink>
                    </h1>

                    <form @submit.prevent="onSubmit">
                        <v-text-field name="email" v-model="email" :error-messages="errors.email"
                            label="E-mail"></v-text-field>
                        <v-text-field name="password" v-model="password" :error-messages="errors.password"
                            label="Password"></v-text-field>


                        <v-btn class="me-4" type="submit">
                            submit
                        </v-btn>

                        <v-btn @click="handleReset">
                            clear
                        </v-btn>
                    </form>
                </div>
            </center-div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { Field, Form, ErrorMessage, defineRule, useForm } from 'vee-validate';
import CenterDiv from "../layouts/centerDiv";
import { useUserStore } from "~/stores/user"
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const { useFieldModel, errors, handleSubmit } = useForm({
    validationSchema: schema,
});

const [email, password] = useFieldModel(['email', 'password']);

const userStore = useUserStore()

const onSubmit = handleSubmit((values) => {
    userStore.loginUser(values.email, values.password)
});

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
