import Constant from "@/constant";
import ContantApi from "@/api/contactApi"

export default {
  state: {
    group:{},
    globalRange: {
      code : {},
      user : []
    },
    editUser : {
      code : {},
      user : []
    },
    editGroup: {
      code : {},
      fromUser : [],
      toUser : []
    }
  },
  getters: {
    [Constant.FETCH_GROUP]: (state) => {
      var list = state.group, map = {}, node, roots = [], i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].dept_code] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        console.log(node);
        if (node.pcode !== 0) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.pcode]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots[0];
    },
    [Constant.GLOBAL_RANGECODE]: (state) => {
      return state.globalRange.code;
    },
    [Constant.FETCH_GLOBALUSER]: (state) => {
      return state.globalRange.user;
    }
  },
  mutations: {
    [Constant.FETCH_GROUP]: (state, payload) => {
      state.group = payload
    },
    [Constant.GLOBAL_RANGECODE]: (state, payload) => {
      state.globalRange.code = payload
    },
    [Constant.FETCH_GLOBALUSER]: (state, payload) => {
      state.globalRange.user = payload
    }
  },
  actions: {
    [Constant.FETCH_GROUP]: (store) => {
      ContantApi.fetchGroup().then(response => {
        console.log(response)
        store.commit(Constant.FETCH_GROUP, response.data);
      });
    },
    [Constant.GLOBAL_RANGECODE]: (store, payload) => {
      store.commit(Constant.GLOBAL_RANGECODE, payload);
      ContantApi.fetchGlobalUser(payload.dept_code).then(response => {
        store.commit(Constant.FETCH_GLOBALUSER, response.data.data);
      });
    },
    [Constant.FETCH_GLOBALUSER]: (store) => {
      console.log(store);
      ContantApi.fetchUser(store.state.globalRange.dept_code).then(response => {
        //console.log(response.data.data);
        //store.commit(Constant.FETCH_USER, response.data.data)
      });
    }
  }
}
