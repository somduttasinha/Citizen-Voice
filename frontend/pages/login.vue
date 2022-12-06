<template>
  <NuxtLayout name="default">
    <q-page style="display: flex;justify-content: center;align-items: center">
      <div class="padding-16">
        <!--      <h1>Login</h1>-->
        <!--      <div class="custom-container-flex-col">-->
        <!--        <form-login></form-login>-->
        <!--      </div>-->
        <center-div>
          <template v-slot:centered-component>
            <form-login></form-login>
          </template>
        </center-div>
      </div>
    </q-page>
  </NuxtLayout>
</template>

<script>
import BaseButton from "../components/BaseButton";
import LeftDrawer from "../layouts/leftDrawer";
import DrawerBothSides from "../layouts/drawerBothSides";
import FormLogin from "../layouts/formLogin";
import CenterDiv from "../layouts/centerDiv";
export default {
  name: "login",
  components: {CenterDiv, FormLogin, DrawerBothSides, LeftDrawer, BaseButton}
}
</script>

<style lang="scss" scoped>
.padding-16{
  width: 100%;
  height: 100%;
  padding: 16px;
}
.custom-container {
  width: 100%;
  height: 100vh;
}
</style>
