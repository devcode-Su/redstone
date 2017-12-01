import Constant from "@/constant";

import ContantApi from "@/api/contactApi"

export default {
  state: {
    thumbCompList: []
  },
  getters: {
    [Constant.FETCH_THUMBLIST]: (state) => {
      return state.thumbCompList;
    }
  },
  mutations: {
    [Constant.FETCH_THUMBLIST]: (state, payload) => {
      state.thumbCompList = payload
    },
    [Constant.UPDATE_THUMBLIST]: (state, payload) => {
      state.thumbCompList = payload
    },
    [Constant.DELETE_THUMBLIST]: (state, payload) => {
      console.log("delete");
      console.log(payload)
      state.thumbCompList.splice(payload, 1)
    }
  },
  actions: {
    [Constant.FETCH_THUMBLIST]: (store) => {
      console.log(`"list update" `);
      ContantApi.fetchThumbList().then(response => {
        console.log(response)
        store.commit(Constant.FETCH_THUMBLIST, response.data.data)
      });
    },
    [Constant.UPDATE_THUMBLIST]: (store, payload) => {
      console.log(`"isLoading change" ` + payload);
      store.commit(Constant.UPDATE_THUMBLIST, payload);
    },
    [Constant.DELETE_THUMBLIST]: (store, payload) => {
      console.log(payload)
      console.log(`"isLoading change" ` + payload);
      store.commit(Constant.DELETE_THUMBLIST, payload);
    }
  }
}