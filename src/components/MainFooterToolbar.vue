<template>
  <q-footer class="bg-white small-screen-only"
    bordered>
    <q-tabs class="text-grey-10"
      active-color="primary">
      <q-route-tab to="home"
        icon="home" />
      <q-route-tab to="categoria"
        icon="mdi-package" />
      <q-route-tab to="usuario"
        icon="mdi-account" />
    </q-tabs>
  </q-footer>
</template>

<script setup>
</script>

<style lang="scss">
.q-footer {
  .q-tab__icon {
    font-size: 30px
  }
}
</style>