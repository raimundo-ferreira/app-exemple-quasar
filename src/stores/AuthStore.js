import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    token: (state) => state.authUser,
  },
  actions: {
    async getToke(form) {
      const { data } = await api.post("/api/token", form);
      this.authUser = data.token;
    },
  },
});
