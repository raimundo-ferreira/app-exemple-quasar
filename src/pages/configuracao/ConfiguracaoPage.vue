<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Configurações</p>
      </div>
      <q-form
        class="q-pa-md shadow-1"
        @submit.prevent="handleSubmit()"
      >
        <div class="row justify-center q-gutter-sm">
          <q-color
            v-model="form.primary"
            title="Cor primária"
            :default-value="getBrandPrimary()"
            class="my-picker col-md-5 col-xs-12 col-sm-12"
          />
          <q-color
            v-model="form.secondary"
            title="Cor secundária"
            :default-value="getBrandSecondary()"
            class="my-picker col-md-5 col-xs-12 col-sm-12"
          />
        </div>
        <q-btn
          label="Salva"
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
          :to="{ name: 'home' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import useBrand from 'src/composables/UseBrand';
import useNotify from 'src/composables/UseNotify';

const { setBrand, getBrandPrimary, getBrandSecondary } = useBrand();
const { notifySucess } = useNotify();

const form = ref({
  primary: '',
  secondary: '',
});

const handleSubmit = async () => {
  setBrand(form.value.primary, form.value.secondary);
  notifySucess("Salvo com sucesso!");
};
</script>
