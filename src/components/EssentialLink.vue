<template>
  <q-item v-ripple
    clickable
    :inset-level="insetLevel"
    :to="{ name: routeName }"
    active-class=""
    exact>
    <q-item-section v-if="icon"
      avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="caption"
        caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  routeName: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  insetLevel: {
    type: Number,
    default: 0,
  },
});
</script>
