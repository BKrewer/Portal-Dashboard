import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    user: null,
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          user.token.accessToken
        }`;
        axios.defaults.headers.common["Content-Type"] =
          "application/json; charset=utf-8";
        state.isMenuVisible = true;
      } else {
        delete axios.defaults.headers.common["Authorization"];
        state.isMenuVisible = false;
      }
    },
  },
});
