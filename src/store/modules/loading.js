import Constant from "@/constant"

export default {
  state: {
    loadingState: true
  },
  mutations: {
    [Constant.LOADING_STATE]: (state, payload) => {
      if (payload !== "") {
        state.loadingState = payload
      }
    }
  },
  actions: {
    [Constant.LOADING_STATE]: (store, payload) => {
      console.log(`"isLoading change" ` + payload);
      //store.commit(Constant.LOADING_STATE, payload);
    }
  }
}