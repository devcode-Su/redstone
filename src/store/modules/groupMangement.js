import Constant from "@/constant";
import ContantApi from "@/api/contactApi";

const tree =list => {
  var map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].dept_code] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pcode !== 0) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.pcode]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots[0];
};

export default {
  state: {
    group:{},
    globalRange: {
      code : {
        dept_code : 1,
        name : "전사"
      },
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
      // var list = state.group, map = {}, node, roots = [], i;
      // for (i = 0; i < list.length; i += 1) {
      //   map[list[i].dept_code] = i; // initialize the map
      //   list[i].children = []; // initialize the children
      // }
      // for (i = 0; i < list.length; i += 1) {
      //   node = list[i];
      //   console.log(node);
      //   if (node.pcode !== 0) {
      //     // if you have dangling branches check that map[node.parentId] exists
      //     list[map[node.pcode]].children.push(node);
      //   } else {
      //     roots.push(node);
      //   }
      // }
      // return roots[0];
      return state.group;
    },
    [Constant.GLOBAL_RANGECODE]: (state) => {
      return state.globalRange.code;
    },
    [Constant.FETCH_GLOBALUSER]: (state) => {
      return state.globalRange.user;
    },
    [Constant.FETCH_EDITUSER] : (state) => {
      return state.editUser.user
    }
  },
  mutations: {
    [Constant.FETCH_GROUP]: (state, payload) => {
      state.group = payload;
    },
    [Constant.GLOBAL_RANGECODE]: (state, payload) => {
      state.globalRange.code = payload;
    },
    [Constant.FETCH_GLOBALUSER]: (state, payload) => {
      state.globalRange.user = payload;
    },
    [Constant.EDITUSER_CODE]: (state, payload) => {
      state.editUser.code = payload;
    },
    [Constant.FETCH_EDITUSER] : (state, payload) => {
      state.editUser.user = payload
    }
  },
  actions: {
    [Constant.FETCH_GROUP]: (store) => {
      ContantApi.fetchGroup().then(response => {
        store.commit(Constant.FETCH_GROUP, tree(response.data));
      });
    },
    [Constant.ADD_GROUP]: (store, payload) => {
      console.log(payload);
      ContantApi.addGroup(payload).then(() => {
        ContantApi.fetchGroup().then(response => {
          store.commit(Constant.FETCH_GROUP, tree(response.data));
        });
     });
    },
    [Constant.GLOBAL_RANGECODE]: (store, payload) => {
      store.commit(Constant.GLOBAL_RANGECODE, payload);
      ContantApi.fetchGlobalUser(payload.dept_code).then(response => {
        store.commit(Constant.FETCH_GLOBALUSER, response.data.data);
      });
    },
    [Constant.GLOBAL_RANGEUSER]: (store, payload) => {
      store.commit(Constant.GLOBAL_RANGECODE, payload);
    },
    [Constant.FETCH_GLOBALUSER]: (store) => {
      console.log(store);
      ContantApi.fetchGlobalUser(store.state.globalRange.dept_code).then(response => {
        //console.log(response.data.data);
        //store.commit(Constant.FETCH_USER, response.data.data)
      });
    },
    [Constant.EDITUSER_CODE]: (store, payload) => {
      store.commit(Constant.EDITUSER_CODE, payload);
      ContantApi.fetchEditUser(payload.dept_code).then(response => {
        store.commit(Constant.FETCH_EDITUSER, response.data.data);
      });
    },
  }
}
