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
      <div data-tbody="tbody">
        <table>
          <tbody>
            <tr data-tbody="row" v-for="member in orderedItems" :key="member.id" class="edit-wrap" @click="selectRow(member)">
              <td data-tbody="column" class="col-nodeid">{{member.nodeid}}</td>
              <td data-tbody="column" class="col-username">
                {{member.username | groupSnippet}}
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
    },
    movebtn: {
      type: Boolean,
      default: false
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
        //part: "부서명",
        ip: "아이피"
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
    }
    //    fieldOmit() {
    //      return _.omit(this.fields, this.omitPath);
    //    }
  },
  components: {},
  watch: {},
  methods: {
    renameTo(model) {
      //console.log(index);
      this.edited = model;
    },
    doneEdit(model) {
      if (!this.edited) return;
      this.edited = null;
      console.log(model.name);
      model.name = model.name.trim();
      if (!model.name) this.removeModel(model);
      this.rename = true;
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
    moveItem(from, to, element) {
      this.$emit("moveitem", {
        from: from,
        to: to,
        element: element
      });
    },
    selectRow(member) {
      console.log(member);
      //EventBus.$emit("searchInfo", member);
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
