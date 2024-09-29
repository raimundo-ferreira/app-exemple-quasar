<template>
  <q-layout view="lHh Lpr lFf">
    <main-header-toolbar v-model="leftDrawerOpen"
      title="Emprestimos" />

    <main-menu v-model="leftDrawerOpen"
      :nome=user?.name
      :login=user?.login />

    <main-footer-toolbar />

    <q-page-container class="constrain">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import MainMenu from "components/MainMenu.vue";
import MainHeaderToolbar from "src/components/MainHeaderToolbar.vue";
import MainFooterToolbar from "src/components/MainFooterToolbar.vue";
import useAuthUser from "src/composables/UseAuthUser";

const leftDrawerOpen = ref(false)
const { user } = useAuthUser();

</script>
