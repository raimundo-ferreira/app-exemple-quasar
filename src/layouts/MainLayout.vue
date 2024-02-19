<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />

        <q-toolbar-title> App Exemple Quasar </q-toolbar-title>

        <dark-mode-toggle />

        <q-btn-dropdown
          flat
          color="white"
          icon="person"
        >
          <q-list>
            <q-item
              v-close-popup
              clickable
              @click="handleLogout()"
            >
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item
          v-if="user"
          header
          class="row bg-primary text-white"
        >
          <q-avatar size="56px">
            <img
              v-if="user.foto"
              :src="user.foto"
            />
            <q-icon
              size="xl"
              name="mdi-account-circle"
            />
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold">{{ user.name }}</div>
            <div>{{ user.email }}</div>
          </div>
        </q-item>

        <q-item
          clickable
          :to="{ name: 'home' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="mdi-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="mdi-view-grid"
          label="Cadastros"
        >
          <EssentialLink
            v-for="link in linksCadastros"
            :key="link.title"
            :inset-level="0.5"
            v-bind="link"
          />
        </q-expansion-item>

        <EssentialLink
          v-for="link in linksOutros"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import EssentialLink from "components/EssentialLink.vue";
import DarkModeToggle from "src/components/DarkModeToggle.vue";
import { useQuasar } from "quasar";

const linksCadastros = [
  {
    title: "Produto",
    caption: "Produtos",
    icon: "mdi-package",
    routeName: "produto",
  },
  {
    title: "Usuário",
    caption: "Usuários",
    icon: "mdi-account",
    routeName: "usuario",
  },
];

const linksOutros = [
  {
    title: "Configuração",
    caption: "Configurações do sistema",
    icon: "settings",
    routeName: "configuracao",
  },
  {
    title: "Nova",
    caption: "Nova tela",
    icon: "mdi-new-box",
    routeName: "nova",
  },
];

const leftDrawerOpen = ref(false);
const { logout, user } = useAuthUser();
const $q = useQuasar();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const handleLogout = async () => {
  $q.dialog({
    title: "Confirme",
    message: "Deseja sair do aplicativo?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    logout();
  });
};
</script>
