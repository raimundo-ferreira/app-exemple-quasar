<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p
          v-if="form.id"
          class="text-h6"
        >Usuario ({{ form.id }})</p>
        <p
          v-else
          class="text-h6"
        >Usuario</p>
      </div>
      <q-form
        class="q-pa-md shadow-1"
        @submit.prevent="handleSubmit()"
      >
        <div
          class="row q-col-gutter-sm"
          readonly
        >
          <q-input
            v-model="form.name"
            class="col-md-12 col-xs-12 col-sm-12"
            label="Nome"
            :readonly="isView"
            :rules="validaIsEmpty"
          />

          <q-input
            v-model="form.email"
            class="col-md-5 col-xs-12 col-sm-12"
            label="Email"
            :readonly="isView"
            :rules="validaIsEmpty"
          />

          <q-input
            v-model="form.password"
            class="col-md-4 col-xs-12 col-sm-12"
            label="Senha"
            type="password"
            :readonly="isView"
            :rules="validaIsEmpty"
          />

          <q-checkbox
            v-model="form.active"
            class="col-md-2 col-xs-12 col-sm-12"
            label="Ativo"
            :disable="isView"
          />

        </div>
        <q-btn
          v-if="!isView"
          :label="isUpdate ? 'Atualiza' : 'Salva'"
          color="primary"
          class="q-mt-md full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancela"
          color="primary"
          class="q-mt-md full-width"
          rounded
          outline
          :to="{ name: 'usuario' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import usuarioService from 'src/services/usuario';
import useNotify from 'src/composables/UseNotify';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { notifyError, notifySucess } = useNotify();
const { post, getById, update } = usuarioService();

const isUpdate = computed(() => route.params.id);
const isView = ref(route.name == 'view-usuario');

const form = ref({
  id: '',
  name: '',
  email: '',
  password: '',
  active: false,
});

const validaIsEmpty = [
  val => (val && val.length > 0) || 'O campo é obrigatório'
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
    router.push({ name: 'usuario' });
  } catch (error) {
    notifyError(error.response.data.message);
  }
};

const handleGetById = async (id) => {
  try {
    form.value = await getById(id);
  } catch (error) {
    notifyError(error.response.data.message);
  }
};

const sugereValores = () => {
  const ehInsert = (!isUpdate.value && !isView.value);
  if (ehInsert) {
    form.value.active = true;
  }
}

onMounted(() => {
  if (isUpdate.value) {
    handleGetById(isUpdate.value);
  }
  sugereValores();
});
</script>
