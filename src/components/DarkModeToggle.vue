<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="mdi-weather-night"
    color="green"
    unchecked-icon="mdi-white-balance-sunny"
    size="lg"
  />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const darkMode = ref(false);
const $q = useQuasar();

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
  $q.localStorage.set('darkMode', darkMode);
});

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    darkMode.value = true;
  }
});
</script>
