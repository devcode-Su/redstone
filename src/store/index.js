import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import loading from "./modules/loading";
import thumbCompList from "./modules/thumbCompAll";
import groupManagement from "./modules/groupMangement";
import setupAdmin from "./modules/setupAdmin";
import Property from "./modules/propertyDetail";
import DashboardData from "./modules/dashboardDateRoute";
import Popup from "./modules/popup"

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
    Propertys : Property,
    DashboardDataRoute : DashboardData,
    Popups : Popup
  }
});

export default store;
