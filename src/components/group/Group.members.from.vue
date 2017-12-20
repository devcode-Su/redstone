<template>
  <div class="group-members">
    <el-input size="medium" placeholder="사용자 검색" v-model="filterText">
    </el-input>
    <div data-table="table">
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th v-for="(th, key, i) in fields" :key="th.i" :class="['col-'+key,{on : i === selected }]" @click.self="reOrder(key, i)">{{th}}</th>
            <th class="col-move"><span>이동</span></th>
          </tr>
          </thead>
        </table>
      </div>
      <v-infinite-scroll data-tbody="tbody" :loading="reloading" @bottom="nextPage">
        <table>
          <tbody>
          <tr data-tbody="row" v-for="member in orderedItems" :key="member.id" class="edit-wrap">
            <td data-tbody="column" class="col-nodeid">{{member.nodeid}}</td>
            <td data-tbody="column" class="col-username" @dblclick.stop="">
              {{member.username | groupSnippet}}
            </td>
            <td data-tbody="column" class="col-ip">
              {{member.info[0].value | groupSnippet}}
            </td>
            <td data-tbody="column" class="col-move">
              <button data-icon v-if="movebtn"  @click="moveItem(member)">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </v-infinite-scroll>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapGetters } from "vuex";
  //import Constant from "@/constant";
  export default {
    name: "GroupMembersfrom",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        reloading: false,
        filterText: "",
        orderField: "id",
        direction: "asc",
        reverse: true,
        selected: 0,
        empty: "검색 된 내용이 없습니다.",
        fields: {
          nodeid: "센서ID",
          username: "이름",
          ip: "아이피",
        },
        dept_code : 1,
        userData : [],
        responseData : [],
        form:{
          page : 1,
          length : 50
        }
      };
    },
    computed: {
      orderedItems() {
        return _.orderBy(this.filteredMebers, this.orderField, this.direction);
      },
      filteredMebers() {
        return this.userData.filter(member => {
          return member.username.match(this.filterText);
        });
      },
      ...mapGetters({
        editGroupFrom: "editGroupFrom",
        editGroupTo : "editGroupTo"
      }),
      movebtn(){
        return this.editGroupFrom !== this.editGroupTo ? true : false;
      }
      //    fieldOmit() {
      //      return _.omit(this.fields, this.omitPath);
      //    }
    },
    components: {
      // movebtn(){
      //   return this.editGroupFrom !== this.editGroupTo ? true : false;
      // }
    },
    watch: {
      editGroupFrom(g){
        if(g){
          //console.log("change!")
          this.dept_code = g;
          this.userList();
        }
      },
      responseData(r){
        if(r){
          //console.log(r)
          this.userData = r.data;
          return r;
        }
      }
    },
    methods: {
      moveItem(m) {
        //console.log(m)
        const url = "/api/admin/node/" + m.nodeid;
        this.$http.post(url, {
          dept_code : this.editGroupTo
        });
        this.userList();
        this.$bus.$emit("user-move");
      },
      userList(){
        const url = "/api/admin/group/node/"+this.dept_code;
        this.$http.get(url, {
          params : this.form
        }).then( response => {
          this.responseData = response.data;
        });
      },
      nextPage () {
        ++this.form.page;
        this.api();
      },
      api () {
        const url = "/api/admin/group/node/"+this.dept_code;
        this.reloading = true;
        this.$http.get(url, {
          params : this.form
        }).then( response => {
          this.tableData.push(...response.data.data);
        }).then(() => {
          this.reloading = false
        })
      }
    },
    beforeCreate() {},
    created() {},
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
      console.log(this.editGroupFrom);
      console.log(this.editGroupTo)
    },
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  tr {
    cursor: pointer;
  }
  .col-nodeid{
    width:55px;
  }
  .col-username{
    width:145px;
  }
  .col-move{
    width:20px;
    padding: 0;
    vertical-align: middle;
    span{
      visibility: hidden;
    }
    .fa{
      font-size:12px;
    }
  }
</style>
