import useApi from "src/composables/UseApi";

export default function usuarioService() {
  const { listAll, getById, post, update, remove } = useApi("user");
  return {
    listAll,
    getById,
    post,
    update,
    remove,
  };
}
