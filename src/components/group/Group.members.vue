<template>
  <div class="group-members">
    <el-input size="medium" placeholder="사용자 검색" v-model="filterText">
    </el-input>
    <div class="group-members-table">
      <div class="table-head-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="(th, key, i) in fieldOmit" :key="th.i" :class="['col-'+key,{on : i === selected }]" @click.self="reOrder(key, i)">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <tr v-for="(member, index) in orderedItems" :key="member.id" class="edit-wrap" :class="{'editing' : member === edited}">
              <td class="col-id">{{member.id}}</td>
              <td class="col-name">
                <span class="view" @dblclick.stop="renameTo(member, index)">{{member.name}}</span>
                <input class="edit" type="text" v-model="member.name" @blur="doneEdit(member)" @keyup.enter="doneEdit(member)" @keyup.esc="cancelEdit(member)" ref="name">
              </td>
              <td v-if="colview" class="col-end">
                {{member.part}}
              </td>
              <td v-else class="col-end col-btn">
                {{member.ip}}
                <button @click="moveItem(members, moveTo, member)">
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
export default {
  name: "GroupMembers",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    colview: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: true
    },
    members: {
      type: Array | Object
    },
    moveTo: {
      type: Array | Object
    },
    omitPath: {
      type: Array | String
    }
  },
  data() {
    return {
      filterText: "",
      edited: null,
      rename: true,
      orderField: "id",
      direction: "asc",
      reverse: true,
      selected: 0,
      empty: "검색 된 내용이 없습니다.",
      fields: {
        id: "센서ID",
        name: "이름",
        part: "부서명",
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
        return member.name.match(this.filterText);
      });
    },
    fieldOmit() {
      return _.omit(this.fields, this.omitPath);
    }
  },
  components: {},
  watch: {},
  methods: {
    renameTo(model, index) {
      console.log(index);
      this.edited = model;
      setTimeout(() => {
        console.log(this.$refs.name);
        this.$refs.name[index].focus();
      });
    },
    doneEdit(model) {
      if (!this.edited) return;
      this.edited = null;
      model.name = model.name.trim();
      if (!model.name) this.removeModel(model);
      this.rename = true;
    },
    cancelEdit(todo) {
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
      console.log("Aaa")
      this.$emit("moveitem", {
        from: from,
        to: to,
        element: element
      });
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
</style>
