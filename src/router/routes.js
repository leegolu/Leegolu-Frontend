const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/ProductDetail",
        component: () => import("pages/ProductDetail.vue"),
      },
      {
        path: "/register",
        component: () => import("src/pages/auth/Register.vue"),
      },
      {
        path: "/login",
        component: () => import("src/pages/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/Dashboard",
    component: () => import("layouts/Dashboard.vue"),
    children: [
      {
        path: "/user/Dashboard",
        component: () => import("pages/Dashboard/Dashboard.vue"),
        name: "dashboard",
      },
      {
        path: "/user/adverts",
        component: () => import("pages/Dashboard/Adverts.vue"),
        name: "adverts",
      },
      {
        path: "/user/favourites",
        component: () => import("pages/Dashboard/Favourites.vue"),
        name: "favourites",
      },
      {
        path: "/user/messages",
        component: () => import("pages/Dashboard/Messages.vue"),
        name: "messages",
      },
      {
        path: "/user/notifications",
        component: () => import("pages/Dashboard/Notifications.vue"),
        name: "notifications",
      },
      {
        path: "/user/settings",
        component: () => import("pages/Dashboard/Settings.vue"),
        name: "settings",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
