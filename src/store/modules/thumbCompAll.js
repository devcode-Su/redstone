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
    }
  },
  actions: {
    [Constant.FETCH_THUMBALL]: (store) => {
      //console.log(`"list update" `);
      ContantApi.fetchThumbAll().then(response => {
        //console.log(response.data.data);
        store.commit(Constant.FETCH_THUMBALL, response.data.data)
      });
    }
  }
}
