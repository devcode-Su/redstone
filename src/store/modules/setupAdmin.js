import Constant from "@/constant";
import ContantApi from "@/api/contactApi";

export default {
  state: {
    pickAdmin : null,
    adminUser: [],
    adminFormType : true,
    adminModal : false
  },
  getters: {
    [Constant.SETUP_ADMIN]: (state) => {
      return state.adminUser;
    },
    [Constant.SETUP_FORMTYPE]: (state) => {
      return state.adminFormType;
    },
    [Constant.SETUP_MODAL]: (state) => {
      return state.adminModal;
    },
    [Constant.PICK_ADMIN]: (state) => {
      return state.adminUser.filter( u => u.id === state.pickAdmin)
    },
  },
  mutations: {
    [Constant.SETUP_ADMIN]: (state, payload) => {
      state.adminUser = payload;
    },
    [Constant.SETUP_FORMTYPE]: (state, payload) => {
      state.adminFormType = payload
    },
    [Constant.SETUP_MODAL]: (state, payload) => {
      state.adminModal = payload
    },
    [Constant.UPDATE_ADMIN]: (state, payload) => {
      state.adminModal = payload
    },
    [Constant.PICK_ADMIN]: (state, payload) => {
      state.pickAdmin = payload
    }
  },
  actions: {
    [Constant.SETUP_ADMIN]: (store) => {
      ContantApi.setupAdmin().then(response => {
        store.commit(Constant.SETUP_ADMIN, response.data);
      });
    },
    [Constant.DELETE_ADMIN] : (store, payload) => {
      console.log(payload)
      ContantApi.deleteAdmin(payload).then( () => {
          ContantApi.setupAdmin().then(response => {
            store.commit(Constant.SETUP_ADMIN, response.data);
          });
      });
    },
    [Constant.UPDATE_ADMIN]: (store, payload) => {
      console.log(payload)
      // ContantApi.setupAdmin(payload).then(response => {
      //   //store.commit(Constant.SETUP_ADMIN, response.data);
      // });
    }
  }
}
