<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import useBrand from 'src/composables/UseBrand';

const $q = useQuasar();
const { setBrand } = useBrand();

onMounted(() => {
  setBrand($q.localStorage.getItem("primary"), $q.localStorage.getItem("secondary"))
});

</script>
