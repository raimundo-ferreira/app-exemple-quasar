<template>
  <q-drawer v-model="exibeDrawerModel"
    :width=250
    class="bg-primary text-white"
    show-if-above>
    <q-banner class="bg-transparent text-center"
      style="height: 150px">
      <q-avatar size="60px"
        class="q-mb-sm">
        <img v-if="props.urlImagem"
          :src="props.urlImagem">
        <q-icon v-else
          size="2.5em"
          name="person" />
      </q-avatar>
      <div class="text-weight-bold">{{ props.nome }}</div>
      <div>{{ props.login }}</div>
    </q-banner>

    <div v-if="$q.platform.is.mobile"
      class="absolute"
      style="top: 100px; right: -17px">
      <q-btn dense
        round
        unelevated
        color="secondary"
        icon="chevron_left"
        @click="updateDrawer()" />
    </div>

    <q-list class="text-weight-bold"
      style="top: 300px ">
      <div v-if="props.title">
        <q-separator color="white" />
        <q-item-label header
          class="text-white text-center ">
          {{ props.title }}
        </q-item-label>
        <q-separator color="white" />
      </div>
      <q-separator v-else
        color="white" />

      <EssentialLink v-for="link in linksOutros"
        :key="link.title"
        v-bind="link" />

      <q-separator color="white" />

      <q-item clickable
        @click="handleLogout()">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import EssentialLink from "components/EssentialLink.vue"
import { useQuasar } from "quasar"
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  nome: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  urlImagem: {
    type: String,
    default: null
  },
});

const exibeDrawerModel = defineModel({ type: Boolean, default: false });
function updateDrawer() {
  exibeDrawerModel.value = !exibeDrawerModel.value
};

const $q = useQuasar();
const router = useRouter();
const { logout } = useAuthUser();

const handleLogout = async () => {
  $q.dialog({
    title: "Confirme",
    message: "Deseja sair do aplicativo?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await logout();
    router.replace({ name: "login" });
  });
};

const linksOutros = [
  {
    title: "Home",
    icon: "home",
    routeName: "home",
  },
  {
    title: "Categoria",
    icon: "mdi-package",
    routeName: "categoria",
  },
  {
    title: "Usuário",
    icon: "mdi-account",
    routeName: "usuario",
  },
  {
    title: "Configuração",
    icon: "settings",
    routeName: "configuracao",
  },
  {
    title: "Nova",
    icon: "mdi-new-box",
    routeName: "nova",
  },
];

</script>
