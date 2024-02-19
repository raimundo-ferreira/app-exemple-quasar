import useAuthUser from "./UseAuthUser";
import { api } from "src/boot/axios";

export default function useApi(url) {
  const { token } = useAuthUser();
  const config = {
    headers: {
      Authorization: "Bearer " + token.value,
    },
  };

  const listAll = async (params = null, source = null) => {
    if (params) {
      config.params = params;
    }
    try {
      const { data } = await api.get(source ? `${url}/${source}` : url, config);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`, config);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form, config);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (form) => {
    try {
      const { data } = await api.put(url, form, config);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`, config);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    listAll,
    getById,
    post,
    update,
    remove,
  };
}
