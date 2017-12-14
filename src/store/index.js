import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import loading from "./modules/loading";
import thumbCompList from "./modules/thumbCompAll";
import groupManagement from "./modules/groupMangement";
import setupAdmin from "./modules/setupAdmin";
import Property from "./modules/propertyDetail"

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    namespaced: true,
    load: loading,
    thumbComp: thumbCompList,
    groupManagements : groupManagement,
    setupAdmins : setupAdmin,
    Propertys : Property
  }
});

export default store;
