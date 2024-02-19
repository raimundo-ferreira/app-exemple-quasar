const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "defaltLogin",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "usuario",
        name: "usuario",
        component: () => import("pages/usuario/ListPage.vue"),
      },
      {
        path: "view-usuario/:id",
        name: "view-usuario",
        component: () => import("pages/usuario/FormPage.vue"),
      },
      {
        path: "form-usuario/:id?",
        name: "form-usuario",
        component: () => import("pages/usuario/FormPage.vue"),
      },
      {
        path: "produto",
        name: "produto",
        component: () => import("pages/produto/ListPage.vue"),
      },
      {
        path: "view-produto/:id",
        name: "view-produto",
        component: () => import("pages/produto/FormPage.vue"),
      },
      {
        path: "form-produto/:id?",
        name: "form-produto",
        component: () => import("pages/produto/FormPage.vue"),
      },
      {
        path: "configuracao",
        name: "configuracao",
        component: () => import("pages/configuracao/ConfiguracaoPage.vue"),
      },
      {
        path: "nova",
        name: "nova",
        component: () => import("pages/nova/NovaPage.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
