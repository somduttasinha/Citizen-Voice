<template>
  <q-item clickable>
    <q-item-section avatar top>
      <q-icon name="description" color="black" size="30px" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{survey_object.name}}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <!--        <q-item-label lines="1">-->
      <!--          <span class="text-weight-medium">[quasarframework/quasar]</span>-->
      <!--          <span class="text-grey-8"> - GitHub repository</span>-->
      <!--        </q-item-label>-->
      <!--        <q-item-label caption lines="1">-->
      <!--          @rstoenescu in #3: > Generic type parameter for props-->
      <!--        </q-item-label>-->
      <!--        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">-->
      <!--          <span class="cursor-pointer">Open in GitHub</span>-->
      <!--        </q-item-label>-->
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
        <q-btn size="12px" flat dense round icon="more_vert" />
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { matAllInbox } from '@quasar/extras/material-icons'
export default {
  name: "ListItemSurveyDesign",
  props: {
    survey_object: Object
  }
}
</script>

<style scoped>
</style>
