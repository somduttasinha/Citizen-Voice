<template>
  <NuxtLayout name="default">
    <q-page>
      <h1>Citizen Voice</h1>
      <Banner mainText = "Welcome to Citizen Voice!" supportingText = "This is a channel to voice your experiences, needs and aspirations."/>
    </q-page>
  </NuxtLayout>
</template>

<script setup>
import Banner from "../components/Banner"

</script>

<style lang="scss" scoped>
.custom-bg-white {
  background-color: #fff;
}
</style>
