import useAuthUser from "src/composables/UseAuthUser";

const temPermissao = (somentePerfilAdmin) => {
  const { user } = useAuthUser();
  if (somentePerfilAdmin) {
    return user.value.login == "userOne@teste.com";
  } else {
    return false;
  }
};

export { temPermissao };
