import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import loading from "./modules/loading";
import thumbCompList from "./modules/thumbCompList";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    namespaced: true,
    load: loading,
    thumbComp: thumbCompList
  }
});

export default store;
