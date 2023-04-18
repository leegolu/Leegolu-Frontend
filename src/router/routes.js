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
      {
        path: "/reset-password",
        component: () => import("src/pages/auth/ResetPassword.vue"),
      },
      {
        path: "/CheckEmail",
        component: () => import("src/pages/auth/CheckEmail.vue"),
      },
      {
        path: "/ResetTemplate",
        component: () => import("src/pages/auth/ResetTemplate.vue"),
      },
      {
        path: "/ChangePassword",
        component: () => import("src/pages/auth/ChangePassword.vue"),
      },
      {
        path: "/Success",
        component: () => import("src/pages/auth/Success.vue"),
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
        path: "/user/listings",
        component: () => import("pages/Dashboard/Listings.vue"),
        name: "listings",
      },
      {
        path: "/user/customers",
        component: () => import("pages/Dashboard/Customers.vue"),
        name: "customers",
      },
      {
        path: "/user/collections",
        component: () => import("pages/Dashboard/Collections.vue"),
        name: "collections",
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
      {
        path: "/user/business-dashboard",
        component: () => import("pages/Dashboard/BusinessDashboard.vue"),
        name: "business-dashboard",
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
