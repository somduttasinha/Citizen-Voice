<template>
    <!-- ClientOnly is needed for quasar to work -->
    <ClientOnly>
        <q-layout view="hHh lpR fFf">

            <q-header elevated class="bg-primary text-white" height-hint="98">
                <q-toolbar>
                    <q-toolbar-title>
                        <img class="full-height q-py-sm" height="30" width="100" src="~/assets/icons/civo-logo.svg">
                    </q-toolbar-title>
                </q-toolbar>

                <div class="row justify-between">
                    <q-tabs align="left">
                        <q-route-tab to="#" label="Start designing" />
                        <q-route-tab to="/surveys" label="Start answering" />
                        <q-route-tab to="/about" label="About" />
                    </q-tabs>

                    <q-tabs align="right">
                        <q-route-tab to="/login" label="Login" /> |
                        <q-route-tab to="/auth/register" label="Register" />
                    </q-tabs>
                </div>
            </q-header>


            <q-page-container>
                <q-page padding>
                    <slot />
                </q-page>
            </q-page-container>

            <q-footer elevated class="bg-grey-8 text-white">
                <q-toolbar>
                    <q-toolbar-title>
                        <img class="full-height q-py-sm" height="30" width="100" src="~/assets/icons/civo-logo.svg">
                    </q-toolbar-title>
                </q-toolbar>
            </q-footer>

        </q-layout>
    </ClientOnly>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const leftDrawerOpen = ref(false)
        const rightDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },
            rightDrawerOpen,
            toggleRightDrawer() {
                rightDrawerOpen.value = !rightDrawerOpen.value
            }

        }
    }
}
</script>

<style lang="scss" scoped>

</style>