import Constant from "@/constant";
import ContantApi from "@/api/contactApi";

export default {
  state: {
    infoSha256:{},
    listSha256:{},
    md5:{},
    ruleID:{}
  },
  getters: {
    [Constant.POPUP_INFO_SHA256]: (state) => {
      return state.infoSha256;
    },
    [Constant.POPUP_LIST_SHA256]: (state) => {
      return state.listSha256;
    },
    [Constant.POPUP_MD5]: (state) => {
      return state.md5;
    },
    [Constant.POPUP_RULE_ID]: (state) => {
      return state.ruleID;
    }
  },
  mutations: {
    [Constant.POPUP_INFO_SHA256]: (state, payload) => {
      state.infoSha256 = payload;
    },
    [Constant.POPUP_LIST_SHA256]: (state, payload) => {
      state.listSha256 = payload;
    },
    [Constant.POPUP_MD5]: (state, payload) => {
      state.md5 = payload;
    },
    [Constant.POPUP_RULE_ID]: (state, payload) => {
      state.ruleID = payload;
    }
  },
  actions: {
    [Constant.POPUP_INFO_SHA256]: (store, payload) => {
      ContantApi.popupInfoSha(payload).then(response => {
        store.commit(Constant.POPUP_INFO_SHA256, response.data);
      });
    },
    [Constant.POPUP_LIST_SHA256]: (store, payload) => {
      ContantApi.popupInfoSha(payload).then(response => {
        store.commit(Constant.POPUP_LIST_SHA256, response.data);
      });
    },
    [Constant.POPUP_MD5]: (store, payload) => {
      ContantApi.popupInfoSha(payload).then(response => {
        store.commit(Constant.POPUP_MD5, response.data);
      });
    },
    [Constant.POPUP_RULE_ID]: (store, payload) => {
      ContantApi.popupInfoSha(payload).then(response => {
        store.commit(Constant.POPUP_RULE_ID, response.data);
      });
    }
  }
}
