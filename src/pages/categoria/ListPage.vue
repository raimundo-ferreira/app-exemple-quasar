<template>
  <q-page padding>
    <q-table title="Categorias"
      title-class="text-h5 text-grey-8 text-bold"
      table-header-class="bg-grey-2 text-grey-8"
      :rows="categorias"
      :columns="colunasCategoria"
      row-key="id"
      :loading="loading"
      :filter="filter"
      no-data-label="Sem dados para exibir"
      :visible-columns="columnsVisibleMobile()">
      <template #top-right>
        <q-input v-model="filter"
          outlined
          dense
          placeholder="Pesquisar..."
          class="q-mr-sm"
          debounce="300">
          <template #append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
        <q-btn v-if="temPermissao(true) && $q.platform.is.desktop"
          class="q-mr-sm"
          label="Novo"
          color="primary"
          icon="mdi-plus"
          dense
          :to="{ name: 'form-categoria' }" />
        <q-btn color="primary"
          icon="archive"
          dense
          @click="exportToCsv('Categorias', colunasCategoria, categorias)">
          <q-tooltip>Exportar para csv</q-tooltip>
        </q-btn>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="more_vert"
            round
            flat
            color="primary">
            <q-menu auto-close>
              <q-list>
                <q-item>
                  <q-item-section side>
                    <q-btn icon="mdi-eye"
                      color="info"
                      size="sm"
                      dense
                      @click="handleView(props.row)">
                      <q-tooltip>Visualizar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn v-if="temPermissao(true)"
                      icon="mdi-pencil"
                      color="secondary"
                      size="sm"
                      dense
                      @click="handleEdit(props.row)">
                      <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section>
                    <q-btn v-if="temPermissao(true)"
                      icon="mdi-delete"
                      color="negative"
                      size="sm"
                      dense
                      @click="handleRemove(props.row)">
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
    <q-page-sticky class="small-screen-only"
      v-if="temPermissao(true) && $q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]">
      <q-btn fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-categoria' }" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { colunasCategoria } from './table';
import categoriaService from 'src/services/categoria';
import { temPermissao } from 'src/utils/permission';
import useGridExport from 'src/composables/UseGridExport';

const categorias = ref([]);
const loading = ref(true);
const router = useRouter();
const $q = useQuasar();

const filter = ref('');
const { listAll, remove } = categoriaService();
const { notifyError, notifySucess } = useNotify();
const { exportToCsv } = useGridExport();

const columnsVisibleMobile = () => {
  if ($q.platform.is.mobile) {
    return ['description', 'price', 'actions'];
  }
};

const handleListAll = async () => {
  loading.value = true;
  try {
    categorias.value = await listAll();
  } catch (error) {
    notifyError(error?.response?.data?.message);
  } finally {
    loading.value = false;
  }
};

const handleEdit = async (categoria) => {
  router.push({ name: 'form-categoria', params: { id: categoria.id } });
};

const handleView = async (categoria) => {
  router.push({ name: 'view-categoria', params: { id: categoria.id } });
};

const handleRemove = async (categoria) => {
  try {
    $q.dialog({
      title: 'Confirme',
      message: `Deseja excluir a categoria ${categoria.name} ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(categoria.id);
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
