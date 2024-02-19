<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import useAuthUser from './composables/UseAuthUser';
import { useQuasar } from 'quasar';
import useBrand from 'src/composables/UseBrand';

const $q = useQuasar();
const { checkToken } = useAuthUser();
const { setBrand } = useBrand();

if ($q.localStorage.getItem("token")) {
  // iife - função auto executada
  (async () => {
    await checkToken();
  })();
};

onMounted(() => {
  setBrand($q.localStorage.getItem("primary"), $q.localStorage.getItem("secondary"))
});

</script>
