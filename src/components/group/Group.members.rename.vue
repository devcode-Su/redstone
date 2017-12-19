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
          </tr>
          </thead>
        </table>
      </div>
      <v-infinite-scroll data-tbody="tbody" :loading="reloading" @bottom="nextPage">
        <table>
          <tbody>
          <tr data-tbody="row" v-for="member in orderedItems" :key="member.id" class="edit-wrap" :class="{editing : member === edited}">
            <td data-tbody="column" class="col-nodeid">{{member.nodeid}}</td>
            <td data-tbody="column" class="col-username" @dblclick.stop="renameTo(member)">
              <span class="name">
                {{member.username | groupSnippet}}
              </span>
              <input class="rename" type="text" v-model="member.username" @blur="doneEdit(member)" @keyup.enter="doneEdit(member)" @keyup.esc="cancelEdit(member)">
            </td>
            <td data-tbody="column" class="col-end">
              {{member.info[0].value | groupSnippet}}
              <button v-if="movebtn" @click="moveItem(members, moveTo, member)">
                <i v-if="icon" class="fa fa-arrow-right" aria-hidden="true"></i>
                <i v-else class="fa fa-arrow-left" aria-hidden="true"></i>
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
      },
      movebtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rename : true,
        reloading: false,
        filterText: "",
        edited: null,
        orderField: "id",
        direction: "asc",
        reverse: true,
        selected: 0,
        empty: "검색 된 내용이 없습니다.",
        fields: {
          nodeid: "센서ID",
          username: "이름",
          //part: "부서명",
          ip: "아이피"
        },
        dept_code : 1,
        nodeid:"",
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
      ...mapGetters({ editUserCode: "editUserCode" }),
      //    fieldOmit() {
      //      return _.omit(this.fields, this.omitPath);
      //    }
    },
    components: {},
    watch: {
      editUserCode(c){
        if(c){
          this.dept_code = c.dept_code;
          this.userList();
        }
      },
      responseData(r){
        if(r){
          this.userData = r.data;
        }
      }
    },
    methods: {
      renameTo(model) {
        //console.log(index);
        this.edited = model;
      },
      doneEdit(model) {
        const url = "/api/admin/node/"+model.nodeid;
        if (!this.edited) return;
        this.edited = null;
        model.username = model.username.trim();
        this.$http.post(url, {
          username : model.username
        }).then( () => {
          this.userList();
          this.rename = true;
        });
      },
      cancelEdit() {
        this.edited = null;
      },
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
        this.$confirm('선택 사용자를 삭제합니까?', 'Warning', {
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '사용자가 삭제되었습니다.'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '삭제를 취소합니다.'
          });
        });
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
        const url = "/api/admin//group/node/"+this.dept_code;
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
    created() {
      this.userList();
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
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
  .edit-wrap{
    &.editing{
      .name{
        display:none;
      }
      .rename{
        display:block;
      }
    }

    .rename{
      display:none;
      width:100%;
    }
  }

  .col-nodeid{
    width:60px;
  }
  .col-username{
    width:160px;
    vertical-align: middle;
  }

</style>
