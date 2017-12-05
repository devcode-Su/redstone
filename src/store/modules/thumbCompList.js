import Constant from "@/constant";
import ContantApi from "@/api/contactApi"

export default {
  state: {
    thumbCompAll: [],
  },
  getters: {
    [Constant.FETCH_THUMBALL]: (state) => {
      return state.thumbCompAll;
    }
  },
  mutations: {
    [Constant.FETCH_THUMBALL]: (state, payload) => {
      state.thumbCompAll = payload
    },
    [Constant.UPDATE_THUMBLIST]: (state, payload) => {
      state.thumbCompList = payload
    },
    [Constant.DELETE_THUMBLIST]: (state, payload) => {
      //console.log("delete");
      //console.log(payload)
      //state.thumbCompList.splice(payload, 1)
    }
  },
  actions: {
    [Constant.FETCH_THUMBALL]: (store) => {
      //console.log(`"list update" `);
      ContantApi.fetchThumbAll().then(response => {
        //console.log(response.data.data);
        store.commit(Constant.FETCH_THUMBALL, response.data.data)

      });
    },
    [Constant.UPDATE_THUMBLIST]: (store, payload) => {
      console.log(`"isLoading change" ` + payload);
      //store.commit(Constant.UPDATE_THUMBLIST, payload);
    },
    [Constant.DELETE_THUMBLIST]: (store, payload) => {
      console.log(payload)
      console.log(`"isLoading change" ` + payload);
      //store.commit(Constant.DELETE_THUMBLIST, payload);
    }
  }
}
