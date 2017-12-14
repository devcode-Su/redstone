import Constant from "@/constant";
//import ContantApi from "@/api/contactApi";

export default {
  state : {
    detailInfo : {},
    detailPc : {}
  },
  getters : {
    [Constant.DETAIL_INFO] : ( state ) => {
      return state.detailInfo;
    },
    [Constant.DETAIL_PC] : ( state ) => {
      return state.detailPc;
    }
  },
  mutations : {
    [Constant.DETAIL_INFO] : (state, payload) => {
      state.detailInfo = payload;
    }
    ,[Constant.DETAIL_PC] : (state, payload) => {
      state.detailPc = payload;
    }
  }
}
