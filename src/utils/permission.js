import useAuthUser from "src/composables/UseAuthUser";

const temPermissao = (sementePerfilAdmin) => {
  const { user } = useAuthUser();
  if (sementePerfilAdmin) {
    return user.value.email == "adm@gmail.com";
  } else {
    return false;
  }
};

export { temPermissao };
