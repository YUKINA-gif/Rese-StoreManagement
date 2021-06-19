import Vue from 'vue'
import VueRouter from 'vue-router';
import store from "../store/index";
import StoreManagerLogin from "../views/StoreManagerLogin.vue";
import StoreChange from "../views/StoreChange.vue";
import StoreCreate from "../views/StoreCreate.vue";
import BookingState from "../views/BookingState.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "StoreManagerLogin",
    component: StoreManagerLogin,
  },
  {
    path: "/store/change",
    name: "StoreChange",
    component: StoreChange,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/store/create",
    name: "StoreCreate",
    component: StoreCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/booking/state",
    name: "BookingState",
    component: BookingState,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router
