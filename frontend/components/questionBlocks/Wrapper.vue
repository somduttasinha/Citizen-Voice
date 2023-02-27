<template>
    <v-sheet width="100%" border rounded w :height="250" :width="250" class="mb-4">
        <v-toolbar theme="grey-lighten-2" density="compact">
            <v-btn icon class="cursor-drag">
                <v-icon>mdi-drag</v-icon>
            </v-btn>
            <v-toolbar-title>{{ type }}</v-toolbar-title>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="px-6 py-6">
            <slot></slot>
        </div>
    </v-sheet>
</template>

<script setup>
defineProps({
    type: String,
    title: String
})
</script>