<template>
  <q-page padding>
    <q-table
      title="Produtos"
      title-class="text-h5 text-grey-8 text-bold"
      table-header-class="bg-grey-2 text-grey-8"
      :rows="produtos"
      :columns="colunasProduto"
      row-key="id"
      :loading="loading"
      :filter="filter"
      no-data-label="Sem dados para exibir"
      :visible-columns="columnsVisibleMobile()"
    >
      <template #top-right>
        <q-input
          v-model="filter"
          outlined
          dense
          placeholder="Pesquisar..."
          class="q-mr-sm"
          debounce="300"
        >
          <template #append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
        <q-btn
          v-if="temPermissao(true) && $q.platform.is.desktop"
          class="q-mr-sm"
          label="Novo"
          color="primary"
          icon="mdi-plus"
          dense
          :to="{ name: 'form-produto' }"
        />
        <q-btn
          color="primary"
          icon="archive"
          dense
          @click="exportToCsv('Produtos', colunasProduto, produtos)"
        >
          <q-tooltip>Exportar para csv</q-tooltip>
        </q-btn>
      </template>

      <template #body-cell-type="props">
        <q-td :props="props">
          <q-chip :label="getDescricaoTipo(props.row.type)"></q-chip>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="more_vert"
            round
            flat
            color="primary"
          >
            <q-menu auto-close>
              <q-list>
                <q-item>
                  <q-item-section side>
                    <q-btn
                      icon="mdi-eye"
                      color="info"
                      size="sm"
                      dense
                      @click="handleView(props.row)"
                    >
                      <q-tooltip>Visualizar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      v-if="temPermissao(true)"
                      icon="mdi-pencil"
                      color="secondary"
                      size="sm"
                      dense
                      @click="handleEdit(props.row)"
                    >
                      <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      v-if="temPermissao(true)"
                      icon="mdi-delete"
                      color="negative"
                      size="sm"
                      dense
                      @click="handleRemove(props.row)"
                    >
                      <q-tooltip>Excluir</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-page-sticky
      v-if="temPermissao(true) && $q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-produto' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { colunasProduto } from './table';
import produtoService from 'src/services/produto';
import { temPermissao } from 'src/utils/permission';
import useGridExport from 'src/composables/UseGridExport';

const produtos = ref([]);
const loading = ref(true);
const router = useRouter();
const $q = useQuasar();

const filter = ref('');
const { listAll, remove } = produtoService();
const { notifyError, notifySucess } = useNotify();
const { exportToCsv } = useGridExport();

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

const columnsVisibleMobile = () => {
  if ($q.platform.is.mobile) {
    return ['description', 'price', 'actions'];
  }
};

const getDescricaoTipo = (type) => {
  const t = types.find(({ id }) => id == type);
  return t ? t.name : '';
};


const handleListAll = async () => {
  loading.value = true;
  try {
    produtos.value = await listAll();
  } catch (error) {
    notifyError(error?.response?.data?.message);
  } finally {
    loading.value = false;
  }
};

const handleEdit = async (produto) => {
  router.push({ name: 'form-produto', params: { id: produto.id } });
};

const handleView = async (produto) => {
  router.push({ name: 'view-produto', params: { id: produto.id } });
};

const handleRemove = async (produto) => {
  try {
    $q.dialog({
      title: 'Confirme',
      message: `Deseja excluir a produto ${produto.description} ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(produto.id);
      notifySucess('Removido com sucesso!');
      handleListAll();
    });
  } catch (error) {
    notifyError(error?.response?.data?.message);
  }
};

onMounted(() => {
  handleListAll()
});

</script>
