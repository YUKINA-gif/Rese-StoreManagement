import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async login({ commit }, { login_id, password }) {
      const responseLogin = await axios
        .post(
          "https://rese-booking.herokuapp.com/api/manage/storeManager/login",
          {
            login_id: login_id,
            password: password,
          }
        )
        .catch(() => {
          alert("ログインできませんでした");
        });
      commit("auth", responseLogin.data.auth);
      router.replace("/store/create");
    },
    logout({ commit }) {
      axios
        .post("https://rese-booking.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
