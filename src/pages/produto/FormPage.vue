<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p
          v-if="form.id"
          class="text-h6"
        >Produto ({{ form.id }})</p>
        <p
          v-else
          class="text-h6"
        >Produto</p>
      </div>
      <q-form
        class="q-pa-md shadow-1"
        @submit.prevent="handleSubmit()"
      >
        <div class="row q-col-gutter-sm">
          <q-input
            v-model="form.description"
            class="col-md-12 col-xs-12 col-sm-12"
            label="Descrição"
            :readonly="isView"
            :rules="validaIsEmpty"
          />

          <q-select
            v-model="form.type"
            class="col-md-4 col-xs-12 col-sm-12"
            label="Tipo"
            :readonly="isView"
            :options="types"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            :rules="validaIsEmpty"
          />

          <q-input
            v-model="form.price"
            class="col-md-4 col-xs-12 col-sm-12"
            label="Preço"
            mask="#.###,##"
            reverse-fill-mask
            prefix="R$"
            :readonly="isView"
            :rules="validaIsEmpty"
          >
          </q-input>

          <q-checkbox
            v-model="form.active"
            class="col-md-4 col-xs-12 col-sm-12"
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
          :to="{ name: 'produto' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import produtoService from 'src/services/produto';
import useNotify from 'src/composables/UseNotify';
import { useRouter, useRoute } from 'vue-router';
import { formatCurrency } from 'src/utils/format';

const route = useRoute();
const router = useRouter();
const { notifyError, notifySucess } = useNotify();
const { post, getById, update } = produtoService();

const isUpdate = computed(() => route.params.id);
const isView = ref(route.name == 'view-produto');

/*Isso poderia vim do banco carregado no onMounted*/
const types = [
  {
    id: 1,
    name: "Frutas"
  },
  {
    id: 2,
    name: "Carnes"
  },
  {
    id: 3,
    name: "Limpeza"
  },
  {
    id: 4,
    name: "Bebidas"
  },
  {
    id: 5,
    name: "Outros"
  },
]

const form = ref({
  description: '',
  price: 0,
  active: false,
  imagem: null,
  type: 0
});

const validaIsEmpty = [
  val => (val && (val.length > 0 || val != null)) || 'O campo é obrigatório'
];

const tratarValor = (isSubmit) => {
  if (isSubmit) {
    form.value.price = form.value.price.replace('.', '').replace(',', '.');
    form.value.price = parseFloat(form.value.price);
  } else {
    form.value.price = formatCurrency(form.value.price)
  }
};

const handleSubmit = async () => {
  tratarValor(true);
  try {
    if (isUpdate.value) {
      await update(form.value);
    } else {
      await post(form.value);
    }
    notifySucess(
      (isUpdate.value ? 'Atualizado' : 'Salvo') + ' com sucesso!'
    );
    router.push({ name: 'produto' });
  } catch (error) {
    notifyError(error?.message);
  }
};

const handleGetById = async (id) => {
  try {
    form.value = await getById(id);
    tratarValor();
  } catch (error) {
    notifyError(error?.message);
  }
};

const sugereValores = () => {
  const ehInsert = (!isUpdate.value && !isView.value);
  if (ehInsert) {
    form.value.type = 5; //outros
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
