<template>
  <section data-group="management">
    <div data-management>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          이동할 부서원 선택
        </h2>
        <groupdepartment data-component="tree-top" :page="'from'"></groupdepartment>
        <groupmembersfrom data-component="member-bottom" :movebtn="true" :members="departNow" :moveTo="departChange" @moveitem="moveItem"></groupmembersfrom>
      </div>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          이동될 부서 선택
        </h2>
        <groupdepartment data-component="tree-top" :page="'to'"></groupdepartment>
        <groupmembersto data-component="member-bottom" :members="departChange" :moveTo="departNow" :icon="false" @moveitem="moveItem"></groupmembersto>
      </div>
    </div>
    <!--<div data-management data-btn="confirm">-->
      <!--<el-button type="success" plain>Done</el-button>-->
    <!--</div>-->
  </section>
</template>
<script>
import Groupdepartment from "./Group.department";
import Groupmembersfrom from "./Group.members.from";
import Groupmembersto from "./Group.members.to";
//import { EventBus } from "@/main";
export default {
  name: "GroupMemberset",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      fields: {
        id: "센서ID",
        name: "이름",
        part: "부서명"
      },
      departNow: [],
      departChange: []
    };
  },
  computed: {},
  components: {
    "groupdepartment":Groupdepartment,
    "groupmembersfrom":Groupmembersfrom,
    "groupmembersto":Groupmembersto
  },
  watch: {},
  methods: {
    moveItem(setItem) {
      setItem.to.push(setItem.element);
      setItem.from.splice(setItem.from.indexOf(setItem.element), 1);
    },
    saveStorage() {
      console.log("save");
    }
  },
  beforeCreate() {},
  created() {
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
.drag-wrap {
  height: 300px;
}
</style>
