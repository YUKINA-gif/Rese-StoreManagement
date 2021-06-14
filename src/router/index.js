import Vue from 'vue'
import VueRouter from 'vue-router';
import store from "../store/index";
import ManagerLogin from "../views/ManagerLogin.vue";
import StoreChange from "../views/StoreChange.vue";
import StoreCreate from "../views/StoreCreate.vue";
import BookingState from "../views/BookingState.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "ManagerLogin",
    component: ManagerLogin,
  },
  {
    path: "/store/Change",
    name: "StoreChange",
    component: StoreChange,
    props: true,
  },
  {
    path: "/store/create",
    name: "StoreCreate",
    component: StoreCreate,
    props: true,
  },
  {
    path: "/booking/state",
    name: "BookingState",
    component: BookingState,
    props: true,
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
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router
