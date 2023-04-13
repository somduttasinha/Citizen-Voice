<template>
    <v-sheet width="100%" border rounded w class="mb-4">
        <v-toolbar theme="grey-lighten-2" density="compact">
            <v-btn icon>
                <v-icon class="!cursor-grab">mdi-drag</v-icon>
            </v-btn>
            <input v-if="modelValue" type="number" class="font-bold w-10" :value="modelValue.order"  @input="$emit('update:modelValue', {...modelValue, order: Number($event.target.value)})">
            <span v-if="questionType" class="ml-2 m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 rounded px-3 py-1 font-bold leading-loose capitalize">{{ questionType }}</span>
            <v-toolbar-title class="ml-2" v-if="title">{{ title }}</v-toolbar-title>
            <v-btn icon class="ml-auto">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <!-- <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn class="text-none ml-auto" color="white">
                    <v-icon size="x-large">mdi-dots-vertical</v-icon>
                </v-btn>
            </template> -->

            <!-- <v-list>
                <v-list-item v-if="isAuthenticated" to="/user">
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!isAuthenticated" to="/login">
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!isAuthenticated" to="/register">
                    <v-list-item-title>Register</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="isAuthenticated" @click="logoutHandler()">
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list> -->
        <!-- </v-menu> -->

        </v-toolbar>
        <div class="px-6 py-6">
            <slot></slot>
        </div>
    </v-sheet>
</template>

<script setup>
defineProps({
    questionType: String,
    title: String,
    modelValue: Object,
})

defineEmits(['update:modelValue'])

// const orderNumberWithZero = ref(0)

// onMounted(() => {
//     orderNumberWithZero.value = props.order < 10 ? `0${props.order}` : props.order
// })



</script>