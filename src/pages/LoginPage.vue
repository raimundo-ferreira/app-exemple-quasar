<template>
  <q-page padding
    class="row flex flex-center">
    <q-card class="col-md-3 col-sm-6 col-xs-12 shadow-4">
      <q-form class="q-pa-md"
        @submit.prevent="handleLogin()">
        <p class="text-h4 text-center text-grey-8">Faça Login</p>
        <q-input v-model="form.login"
          label="Email"
          clearable
          lazy-rules
          type="email"
          :rules="[(val) => (val && val.length > 0) || 'Informe um email']">
          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input v-model="form.senha"
          label="Senha"
          :type="isPassword ? 'password' : 'text'"
          clearable
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Informe uma senha']">

          <template #prepend>
            <q-icon name="lock" />
          </template>

          <template #append>
            <q-icon :name="isPassword ? 'mdi-eye-off' : 'mdi-eye'"
              class="cursor-pointer"
              @click="isPassword = !isPassword" />
          </template>
        </q-input>
        <q-btn label="Entrar"
          color="primary"
          class="full-width"
          rounded
          type="submit" />
        <q-btn label="Register"
          color="primary"
          class="full-width q-mt-md"
          outline
          rounded
          to="/register" />
        <q-card class="q-mt-md bg-primary">
          <div class="q-pa-md text-white text-center">
            <strong class="text-h4">Olá!</strong>
            <p class="text-h8">Seja bem vido ao App</p>
            <q-img src="~assets/login.svg"
              style="height: 150px; max-width: 140px" />
          </div>
        </q-card>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

const isPassword = ref(true);
const { notifyWarning, notifySucess } = useNotify();
const router = useRouter();
const { login, isLoggedIn } = useAuthUser();

const form = ref({
  login: "",
  senha: "",
  tenant: "cf065657-f778-488d-9507-f913411c35f8"
});

const handleLogin = async () => {
  try {
    await login(form.value);
    notifySucess("Logado com sucesso!");
    router.push({ name: "home" });
  } catch (error) {
    notifyWarning("Login inválido!");
  }
};

onMounted(() => {
  if (isLoggedIn()) {
    router.push({ name: "home" });
  }
});
</script>
