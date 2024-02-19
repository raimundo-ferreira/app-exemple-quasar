<template>
  <q-page
    padding
    class="row flex flex-center"
  >
    <q-card class="col-md-3 col-sm-6 col-xs-12 shadow-4">
      <q-form
        class="q-pa-md"
        @submit.prevent="handleRegister()"
      >
        <p class="text-h4 text-center text-grey-8">Criar Conta</p>
        <q-input
          v-model="form.accesskey"
          label="Access Key"
          clearable
          lazy-rules
          type="text"
          :rules="[(val) => (val && val.length > 0) || 'Informe o access key']"
        >
          <template #prepend>
            <q-icon name="key" />
          </template>
        </q-input>
        <q-input
          v-model="form.name"
          label="Nome"
          clearable
          lazy-rules
          type="text"
          :rules="[(val) => (val && val.length > 0) || 'Informe o nome']"
        >

          <template #prepend>
            <q-icon name="mdi-account-box" />
          </template>
        </q-input>
        <q-input
          v-model="form.username"
          label="Email"
          clearable
          lazy-rules
          type="email"
          :rules="[(val) => (val && val.length > 0) || 'Informe um email']"
        >

          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          v-model="form.password"
          label="Senha"
          :type="isPassword ? 'password' : 'text'"
          clearable
          lazy-rules
          :rules="validatePassword"
        >

          <template #prepend>
            <q-icon name="lock" />
          </template>

          <template #append>
            <q-icon
              :name="isPassword ? 'mdi-eye-off' : 'mdi-eye'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>
        <q-input
          v-model="form.repassword"
          label="Senha"
          :type="isPassword ? 'password' : 'text'"
          clearable
          lazy-rules
          :rules="validateRepassword"
        >

          <template #prepend>
            <q-icon name="lock" />
          </template>

          <template #append>
            <q-icon
              :name="isPassword ? 'mdi-eye-off' : 'mdi-eye'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>
        <q-btn
          label="Registrar"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="Login"
          color="primary"
          class="full-width q-mt-md"
          flat
          rounded
          to="/login"
        />
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
const { notifyError, notifySucess } = useNotify();
const router = useRouter();
const { register } = useAuthUser();

const form = ref({
  accesskey: "",
  name: "",
  username: "",
  password: "",
  repassword: "",
});

const validatePassword = [
  (val) => (val && val.length > 0) || "Informe a senha",
  (val) => val.length <= 15 || "Por favor use no máximo 15 caractéres",
  (val) => val.length >= 6 || "Por favor use no mínimo 6 caractéres",
];

const validateRepassword = [
  (val) => (val && val.length > 0) || "Confime a senha",
  (val) => val.length <= 15 || "Por favor use no máximo 15 caractéres",
  (val) => val.length >= 6 || "Por favor use no mínimo 6 caractéres",
  (val) => val === form.value.password || "Senha diferente",
];

const handleRegister = async () => {
  try {
    await register(form.value);
    notifySucess("Registrado com sucesso!");
    router.push({ name: "login" });
  } catch (error) {
    notifyError(error.response.data.message);
  }
};
</script>
