import { ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default function useAuthUser() {
  const $q = useQuasar();
  const router = useRouter();
  const token = ref($q.localStorage.getItem("token"));
  const user = ref($q.localStorage.getItem("user"));

  const login = async (form) => {
    const { data } = await api.post("api/token", form);
    token.value = data.token;
    $q.localStorage.set("token", data.token);
    user.value = data.user;
    $q.localStorage.set("user", data.user);
    return user;
  };

  const register = async (form) => {
    const register = {
      name: form.name,
      username: form.username,
      password: form.password,
    };
    const config = {
      params: {
        AccessKey: form.accesskey,
      },
    };
    await api.post("api/register", register, config);
  };

  const checkToken = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + $q.localStorage.getItem("token"),
      };
      const { data } = await api.get("api/state", { headers });
      return data;
    } catch (error) {
      logout();
    }
  };

  const isLoggedIn = () => {
    if ($q.localStorage.getItem("token")) {
      checkToken();
    }
    return !!token.value;
  };

  const logout = () => {
    $q.localStorage.remove("token");
    $q.localStorage.remove("user");
    token.value = null;
    user.value = null;

    router.replace({ name: "login" });
  };

  return {
    user,
    token,
    login,
    isLoggedIn,
    register,
    logout,
    checkToken,
  };
}
