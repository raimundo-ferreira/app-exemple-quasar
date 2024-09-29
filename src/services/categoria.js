import useApi from "src/composables/UseApi";

export default function produtoService() {
  const { listAll, getById, post, update, remove } = useApi("category");
  return {
    listAll,
    getById,
    post,
    update,
    remove,
  };
}
