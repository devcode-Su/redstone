<template>
  <div class="group-members">
    <el-input size="medium" placeholder="사용자 검색 (이름 또는 IP)" v-model="filterText" @change="userSearch">
    </el-input>
    <div data-table="table">
      <div data-thead="thead">
        <table>
          <thead>
            <tr>
              <th class="col-connected"><span>접속</span></th>
              <th v-for="(th, key, i) in fields" :key="th.i" :class="['col-'+key,{on : i === selected }]" @click.self="reOrder(key, i)">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <v-infinite-scroll data-tbody="tbody" class="members" :loading="reloading" @bottom="nextPage">
        <table>
          <tbody>
            <tr data-tbody="row" v-for="member in userData" :key="member.id" class="edit-wrap" @click="selectRow(member)">
              <td class="col-connected" :class="'turn'+member.connected">
              <span class="icon">
                <i class="fa fa-power-off" aria-hidden="true"></i>
              </span>
              </td>
              <td class="col-nodeid">{{member.nodeid}}</td>
              <td class="col-name">
                {{member.username}}
              </td>
              <td class="col-end">
                {{member.dept ? member.dept.name : ""}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-infinite-scroll>
      <spinner v-if="reloading"></spinner>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Constant from "@/constant";
import Spinner from "@/components/template/Spinner";
export default {
  name: "GroupMembers",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    icon: {
      type: Boolean,
      default: true
    },
    members: {
      type: Array | Object
    }
  },
  data() {
    return {
      reloading: false,
      filterText: "",
      edited: null,
      orderField: "id",
      direction: "asc",
      reverse: true,
      selected: 0,
      dept_code : 1,
      userData : [],
      responseData : [],
      empty: "검색 된 내용이 없습니다.",
      fields: {
        nodeid: "센서ID",
        name: "이름",
        part: "부서명"
        //ip: "아이피"
      },
      form:{
        page : 1,
        length : 50
      }
    };
  },
  computed: {
    ...mapGetters({ globalRangeCode: "globalRangeCode" }),
    // orderedItems() {
    //   return _.orderBy(this.filteredMebers, this.orderField, this.direction);
    // },
    // filteredMebers() {
    //   return this.userData.filter(member => {
    //     return member.username.match(this.filterText);
    //   });
    // }
    //    fieldOmit() {
    //      return _.omit(this.fields, this.omitPath);
    //    }
  },
  components: {
    "spinner":Spinner
  },
  watch: {
    // globalRangeCode(current, previous){
    //   if ( current ) {
    //     console.log(current);
    //     if ( current.dept_code !== this.dept_code ) {
    //       this.dept_code = current.dept_code;
    //       //this.userList();
    //     }
    //   }
    // },
    responseData(r){
      if(r){
        console.log(r)
        this.userData = r.data;
      }
    }
  },
  methods: {
    reOrder(select, index) {
      if (this.orderField === select) {
        let check = (this.reverse = !this.reverse);
        this.direction = check ? "asc" : "desc";
      } else {
        this.selected = index;
        this.orderField = select;
        this.direction = "asc";
      }
    },
    selectRow(member) {
      //console.log(member);
      this.$store.dispatch(Constant.GLOBAL_RANGEUSER, member.nodeid);
    },
    userList(){
      console.log(this.dept_code);
      const url = "/api/admin/group/recurse/"+this.dept_code;
      this.reloading = true;
      this.$http.get(url, {
        params : this.form
      }).then( response => {
        this.responseData = response.data;
        this.reloading = false;
      });
    },
    userSearch(val){
      //console.log(val);
      const url = `/api/admin/group/recurse/${this.dept_code}/${val}`;
      this.reloading = true;
      this.$http.get(url, {
        params : this.form
      }).then( response => {
        this.responseData = response.data;
        this.reloading = false;
      });
    },
    nextPage () {
      ++this.form.page;
      this.api();
    },
    api () {
      const url = "/api/admin/group/recurse/"+this.dept_code;
      this.reloading = true;
      this.$http.get(url, {
        params : this.form
      }).then( response => {
        if ( !response || !response.data || !response.data.data ) {
          throw 'Error';
        }
        else if ( response.data.data.length=== 0 ) {
          throw 'No More Data';
        }
        this.tableData.push(...response.data.data);
      }).then(() => {
        this.reloading = false;
      }).catch(() => {
        this.reloading = false;
        this.form.page--;
      });
    },
    dataSet(){
      this.$store.dispatch(Constant.GLOBAL_RANGECODE, {
        dept_code : 1,
        name : "전사"
      });
      this.dept_code = this.globalRangeCode.dept_code;
      this.userList();
    }
  },
  beforeCreate() {},
  created() {
    this.dataSet();
    this.$bus.$on("update-group", () => {
      this.dept_code = this.globalRangeCode.dept_code;
      this.userList();
    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("update-group");
  },
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
tr {
  cursor: pointer;
}
.group-members {
  border-bottom: 1px solid #d8dce5;
}
.col-nodeid {
  width: 55px;
  text-align: center;
}
</style>
