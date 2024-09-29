<template>
  <q-header>
    <q-toolbar>
      <q-btn flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="updateDrawer()" />

      <q-toolbar-title>
        {{ props.title }}
      </q-toolbar-title>

      <dark-mode-toggle />

      <q-btn icon="chat"
        flat
        dense
        round />
      <q-btn icon="notifications"
        flat
        dense
        round>
        <q-badge floating
          color="red">2</q-badge>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import DarkModeToggle from "src/components/DarkModeToggle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const exibeDrawerModel = defineModel({ type: Boolean, default: false });
function updateDrawer() {
  exibeDrawerModel.value = !exibeDrawerModel.value
}
</script>
