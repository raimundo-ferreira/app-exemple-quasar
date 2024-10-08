<template>
  <q-page padding>
    <q-table title="Usuários"
      title-class="text-h5 text-grey-8 text-bold"
      table-header-class="bg-grey-2 text-grey-8"
      :rows="usuarios"
      :columns="colunasUsuario"
      row-key="id"
      :loading="loading"
      no-data-label="Sem dados para exibir"
      :filter="filter"
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
          :to="{ name: 'form-usuario' }" />
        <q-btn color="primary"
          icon="archive"
          dense
          @click="exportToCsv('Usuários', colunasUsuario, usuarios)">
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
    <q-page-sticky v-if="temPermissao(true) && $q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]">
      <q-btn fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-usuario' }" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { colunasUsuario } from './table';
import usuarioService from 'src/services/usuario';
import { temPermissao } from 'src/utils/permission';
import useGridExport from 'src/composables/UseGridExport';

const usuarios = ref([]);
const loading = ref(true);
const router = useRouter();
const $q = useQuasar();

const filter = ref('');
const { listAll, remove } = usuarioService();
const { notifyError, notifySucess } = useNotify();
const { exportToCsv } = useGridExport();

const columnsVisibleMobile = () => {
  if ($q.platform.is.mobile) {
    return ['name', 'actions'];
  }
};

const handleListAll = async () => {
  loading.value = true;
  try {
    usuarios.value = await listAll();
  } catch (error) {
    notifyError(error?.response?.data?.message);
  } finally {
    loading.value = false;
  }
};

const handleEdit = async (usuario) => {
  router.push({ name: 'form-usuario', params: { id: usuario.id } });
};

const handleView = async (usuario) => {
  router.push({ name: 'view-usuario', params: { id: usuario.id } });
};

const handleRemove = async (usuario) => {
  try {
    $q.dialog({
      title: 'Confirme',
      message: `Deseja excluir a usuario ${usuario.login} ?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(usuario.id);
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