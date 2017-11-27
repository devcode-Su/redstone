<template>
  <div class="group-members">
    <el-input size="medium" placeholder="사용자 검색" v-model="filterText">
    </el-input>
    <div class="group-members-table">
      <div class="table-head-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="(th, key, i) in fields" :key="th.i" :class="['col-'+key,{on : i === selected }]" @click.self="reOrder(key, i)">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <tr v-for="member in orderedItems" :key="member.id" class="edit-wrap" @click="selectRow(member)">
              <td class="col-nodeid">{{member.nodeid}}</td>
              <td class="col-username">
                {{member.username | groupSnippet}}
              </td>
              <td class="col-end">
                {{member.dept.name | groupSnippet}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
//import { EventBus } from "@/main";
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
      filterText: "",
      edited: null,
      orderField: "id",
      direction: "asc",
      reverse: true,
      selected: 0,
      empty: "검색 된 내용이 없습니다.",
      fields: {
        nodeid: "센서ID",
        name: "이름",
        part: "부서명",
        //ip: "아이피"
      }
    };
  },
  computed: {
    orderedItems() {
      return _.orderBy(this.filteredMebers, this.orderField, this.direction);
    },
    filteredMebers() {
      return this.members.filter(member => {
        return member.username.match(this.filterText);
      });
    },
//    fieldOmit() {
//      return _.omit(this.fields, this.omitPath);
//    }
  },
  components: {},
  watch: {},
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
      console.log(member);
      this.$bus.$emit("search-id", member);
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
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
</style>
