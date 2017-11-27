import Vue from "vue";
import Vuex from "vuex";
import Constant from "../constant"
Vue.use(Vuex);

const store = new Vuex.Store({
  state : {
    processSearchData : {
      startTime : "",
      endTime : "",
      checkType : ["FILE", "IP", "RSC", "process", "network", "files", "registry"],
      text : "",
      processGuid : ""
    }
  },
  mutations : {
    [Constant.PROCESS_SEARCH] : (state,payload) => {
      if(payload !== ""){
        state.processSearchData = payload
      }
    }
  }
});

export default store;
