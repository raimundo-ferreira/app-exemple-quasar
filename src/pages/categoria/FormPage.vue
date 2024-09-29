<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p v-if="form.id"
          class="text-h6">Categoria ({{ form.id }})</p>
        <p v-else
          class="text-h6">Categoria</p>
      </div>
      <q-form class="q-pa-md shadow-1"
        @submit.prevent="handleSubmit()">
        <div class="row q-col-gutter-sm">
          <q-input v-model="form.name"
            class="col-md-12 col-xs-12 col-sm-12"
            label="Descrição"
            :readonly="isView"
            :rules="validaIsEmpty" />
        </div>

        <q-btn v-if="!isView"
          :label="isUpdate ? 'Atualiza' : 'Salva'"
          color="primary"
          class="q-mt-md full-width"
          rounded
          type="submit" />

        <q-btn label="Cancela"
          color="primary"
          class="q-mt-md full-width"
          rounded
          outline
          :to="{ name: 'categoria' }" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import categoriaService from 'src/services/categoria';
import useNotify from 'src/composables/UseNotify';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { notifyError, notifySucess } = useNotify();
const { post, getById, update } = categoriaService();

const isUpdate = computed(() => route.params.id);
const isView = ref(route.name == 'view-categoria');

const form = ref({
  id: 0,
  name: ''
});

const validaIsEmpty = [
  val => (val && (val.length > 0 || val != null)) || 'O campo é obrigatório'
];

const handleSubmit = async () => {
  try {
    if (isUpdate.value) {
      await update(form.value);
    } else {
      await post(form.value);
    }
    notifySucess(
      (isUpdate.value ? 'Atualizado' : 'Salvo') + ' com sucesso!'
    );
    router.push({ name: 'categoria' });
  } catch (error) {
    notifyError(error?.message);
  }
};

const handleGetById = async (id) => {
  try {
    form.value = await getById(id);
  } catch (error) {
    notifyError(error?.message);
  }
};

const sugereValores = () => {
  const ehInsert = (!isUpdate.value && !isView.value);
  if (ehInsert) {
    // form.value.type = 5; //outros
    // form.value.active = true;
  }
}

onMounted(() => {
  if (isUpdate.value) {
    handleGetById(isUpdate.value);
  }
  sugereValores();
});
</script>
