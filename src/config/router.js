import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import About from "@/components/template/About";
import Donations from "@/components/template/Donations";
import AdminPages from "@/components/panel/admin/AdminPages";
import UserPanel from "@/components/panel/user/UserPanel";
import UserAddresses from "@/components/panel/user/UserAddresses";
import UserDonations from "@/components/panel/user/UserDonations";
import AdminDonations from "@/components/panel/admin/Donations";
import Auth from "@/components/auth/Auth";
import { userKey } from "@/global";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "donations",
    path: "/donations",
    component: Donations,
  },
  {
    name: "UserPanel",
    path: "/panel/edit",
    component: UserPanel,
    meta: {
      requiresLogin: true,
    },
  },
  {
    name: "UserAddress",
    path: "/panel/addresses",
    component: UserAddresses,
    meta: {
      requiresLogin: true,
    },
  },
  {
    name: "UserDonations",
    path: "/panel/donations",
    component: UserDonations,
    meta: {
      requiresLogin: true,
    },
  },
  {
    name: "AdminDonations",
    path: "/admin/donations",
    component: AdminDonations,
    meta: {
      requiresLogin: true,
    },
  },
  {
    name: "Admin",
    path: "/admin",
    component: AdminPages,
    meta: {
      requiresLogin: true,
    },
  },
  {
    name: "Auth",
    path: "/auth",
    component: Auth,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    json ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
