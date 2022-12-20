<template>
    <q-banner class="bg-primary text-white">
      <h2>{{ mainText }}</h2>
      <h3>{{ supportingText }}</h3>
    </q-banner>

</template>
  
  <script>
  import { matAllInbox } from '@quasar/extras/material-icons'
  export default {
    name: "Banner",
    props: {
      mainText : String,
      supportingText : String
    }
  }
  </script>
  
  <style scoped>
  </style>
  