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
    count:{
      total:"",
      connected:"",
      week:""
    },
    group:{},
    globalRange: {
      dept_code : 1,
      name : "전사"
    },
    editUser : {},
    editGroup: {
      from:{},
      to:{}
    }
  },
  getters: {
    [Constant.COUNT_TOTAL]: (state) => {
      return state.count.total;
    },
    [Constant.COUNT_CONNECTED]: (state) => {
      return state.count.connected;
    },
    [Constant.COUNT_WEEK]: (state) => {
      return state.count.week;
    },
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
      return state.globalRange;
    },
    [Constant.EDITUSER_CODE] : (state) => {
      return state.editUser
    },
    [Constant.EDITGROUP_CODE_FROM] : (state) => {
      return state.editGroup.from
    },
    [Constant.EDITGROUP_CODE_TO] : (state) => {
      return state.editGroup.to
    }
  },
  mutations: {
    [Constant.COUNT_TOTAL]: (state, payload) => {
      state.count.total = payload;
    },
    [Constant.COUNT_CONNECTED]: (state, payload) => {
      state.count.connected = payload;
    },
    [Constant.COUNT_WEEK]: (state, payload) => {
      state.count.week = payload;
    },
    [Constant.FETCH_GROUP]: (state, payload) => {
      state.group = payload;
    },
    [Constant.GLOBAL_RANGECODE]: (state, payload) => {
      state.globalRange = payload;
    },
    [Constant.EDITUSER_CODE]: (state, payload) => {
      state.editUser = payload;
    },
    [Constant.EDITGROUP_CODE_FROM]: (state, payload) => {
      state.editGroup.from = payload;
    },
    [Constant.EDITGROUP_CODE_TO]: (state, payload) => {
      state.editGroup.to = payload;
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
        //store.commit(Constant.FETCH_GLOBALUSER, response.data.data);
        if(payload.dept_code === 1){
          store.commit(Constant.COUNT_TOTAL, response.data.data.length);
        }
      });
    },
    [Constant.GLOBAL_RANGEUSER]: (store, payload) => {
      store.commit(Constant.GLOBAL_RANGECODE, payload);
    }
  }
}
