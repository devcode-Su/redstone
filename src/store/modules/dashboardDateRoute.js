import Constant from "@/constant";
//import ContantApi from "@/api/contactApi";

export default {
  state : {
    dashboardData : {},
  },
  getters : {
    [Constant.DASHBOARD_DATA] : ( state ) => {
      return state.dashboardData;
    },
  },
  mutations : {
    [Constant.DASHBOARD_DATA] : (state, payload) => {
      state.dashboardData = payload;
    }
  },

}
