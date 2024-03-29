const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/register",
        component: () => import("src/pages/auth/Register.vue"),
        name: "register",
      },

      // {
      //   path: "/product-detail/:slug",
      //   component: () => import("pages/ProductDetail.vue"),
      //   name: "product.detail",
      // },

      // {
      //   path: "/register",
      //   component: () => import("src/pages/auth/Register.vue"),
      //   name: "register",
      // },
      {
        path: "/login",
        component: () => import("src/pages/auth/Login.vue"),
        name: "login",
      },
      {
        path: "/reset-password",
        component: () => import("src/pages/auth/ResetPassword.vue"),
        name: "reset.password",
      },
      {
        path: "/CheckEmail",
        component: () => import("src/pages/auth/CheckEmail.vue"),
        name: "checkmail",
      },
      {
        path: "/ResetTemplate",
        component: () => import("src/pages/auth/ResetTemplate.vue"),
        name: "reset.template",
      },
      {
        path: "/ChangePassword",
        component: () => import("src/pages/auth/ChangePassword.vue"),
        name: "change.password",
      },
      {
        path: "/Success",
        component: () => import("src/pages/auth/Success.vue"),
        name: "success",
      },
      {
        path: "/payment-success",
        component: () => import("src/pages/Success.vue"),
        name: "payment.success",
      },
      {
        path: "/Plans",
        component: () => import("pages/Dashboard/Plans.vue"),
        name: "Plans",
      },

      {
        path: "/business/page-builder",
        component: () => import("pages/VendorPageBuilder.vue"),
        name: "page.builder",
      },
      {
        path: "/business/:slug",
        component: () => import("pages/business/VendorPage.vue"),
        name: "vendor.page",
      },
    ],
  },
  {
    path: "/category",
    component: () => import("layouts/Visitors.vue"),
    children: [
      {
        path: "/categorypage/:slug",
        component: () => import("pages/CategoryPage.vue"),
        name: "category-page",
      },
      {
        path: "/searchpage/:slug",
        component: () => import("pages/SearchPage.vue"),
        name: "search-page",
      },
      {
        path: "/subcategorypage/:slug",
        component: () => import("pages/SubCategory.vue"),
        name: "subcategory-page",
      },

      {
        path: "/product-detail/:slug",
        component: () => import("pages/ProductDetail.vue"),
        name: "product.detail",
      },
    ],
  },
  {
    path: "/bus",
    component: () => import("layouts/Business.vue"),
    children: [
      {
        path: "/business/dashboard",
        component: () => import("pages/Dashboard/BusinessDashboard.vue"),
        name: "business.dashboard",
      },
      {
        path: "/business/manage-shop",
        component: () => import("pages/Dashboard/ManageShop.vue"),
        name: "manage-shop",
      },

      {
        path: "/business/adverts",
        component: () => import("pages/Dashboard/Adverts.vue"),
        name: "adverts",
      },
      {
        path: "/business/listings",
        component: () => import("pages/Dashboard/Listings.vue"),
        name: "listings",
      },
      {
        path: "/business/customers",
        component: () => import("pages/Dashboard/Customers.vue"),
        name: "customers",
      },
      {
        path: "/business/collections",
        component: () => import("pages/Dashboard/Collections.vue"),
        name: "collections",
      },
      {
        path: "/business/favourites",
        component: () => import("pages/Dashboard/Favourites.vue"),
        name: "favourites",
      },
      {
        path: "/business/messages",
        component: () => import("pages/Dashboard/Messages.vue"),
        name: "messages",
      },
      {
        path: "/business/notifications",
        component: () => import("pages/Dashboard/Notifications.vue"),
        name: "notifications",
      },
      {
        path: "/business/settings",
        component: () => import("pages/Dashboard/Settings.vue"),
        name: "settings",
      },
    ],
  },
  {
    path: "/regular",
    component: () => import("layouts/Regular.vue"),
    children: [
      {
        path: "/regular/dashboard",
        component: () => import("pages/Dashboard/RegularDashboard.vue"),
        name: "regular.dashboard",
      },
      {
        path: "/regular/listings",
        component: () => import("pages/Dashboard/Listings.vue"),
        name: "regular.listings",
      },
      {
        path: "/regular/favourites",
        component: () => import("pages/Dashboard/Favourites.vue"),
        name: "regular.favourites",
      },
      {
        path: "/regular/messages",
        component: () => import("pages/Dashboard/Messages.vue"),
        name: "regular.messages",
      },
      {
        path: "/regular/notifications",
        component: () => import("pages/Dashboard/Notifications.vue"),
        name: "regular.notifications",
      },
    ],
  },
  {
    path: "/create",
    component: () => import("layouts/CreateListing.vue"),
    children: [
      {
        path: "/createListing",
        component: () => import("pages/Dashboard/Adverts.vue"),
        name: "createListing",
      },
    ],
  },
  // {
  //   path: "/Dashboard",
  //   component: () => import("layouts/Regular.vue"),
  //   children: [
  //     {
  //       path: "/user/Dashboard",
  //       component: () => import("pages/Dashboard/Dashboard.vue"),
  //       name: "dashboard",
  //     },

  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
