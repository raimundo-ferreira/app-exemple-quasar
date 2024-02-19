<template>
  <q-page padding>
    <div class="row flex flex-center">
      <h3>Crie seu dashboard</h3>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useNotify from "src/composables/UseNotify";

const { notifyError } = useNotify();

const produtos = ref([]);
const usuarios = ref([]);

const handleGetCadastros = async () => {
  try {
    /*
    clientes.value =
    */
  } catch (error) {
    notifyError(error?.message);
  }
};

onMounted(() => {
  handleGetCadastros();
});
</script>
