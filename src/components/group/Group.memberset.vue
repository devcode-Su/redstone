<template>
  <section data-group="management">
    <div data-management>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          이동할 부서원 선택
        </h2>
        <groupdepartment data-component="tree-top" :page="'from'"></groupdepartment>
        <groupmembersmove data-component="member-bottom" :movebtn="true" :members="departNow" :moveTo="departChange" @moveitem="moveItem"></groupmembersmove>
      </div>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          이동될 부서 선택
        </h2>
        <groupdepartment data-component="tree-top" :page="'to'"></groupdepartment>
        <groupmembersmove data-component="member-bottom" :members="departChange" :moveTo="departNow" :icon="false" @moveitem="moveItem"></groupmembersmove>
      </div>
    </div>
    <div data-management data-btn="confirm">
      <el-button type="success" plain>Done</el-button>
    </div>
  </section>
</template>
<script>
import Groupdepartment from "./Group.department";
import Groupmembersmove from "./Group.membersmove";
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
    Groupdepartment,
    Groupmembersmove
  },
  watch: {},
  methods: {
    setData() {},
    moveItem(setItem) {
      setItem.to.push(setItem.element);
      setItem.from.splice(setItem.from.indexOf(setItem.element), 1);
    },
    saveStorage() {
      console.log("save");
    }
    //    resetStorage() {
    //      console.log("reset");
    //      EventBus.$on("userfrom", data => {
    //        const apiUrl = "/api/admin/group/node/" + data;
    //        this.$http.get(apiUrl).then(result => {
    //          this.departNow = result.data.data;
    //          console.log(result.data);
    //        });
    //      });
    //      EventBus.$on("userto", data => {
    //        const apiUrl = "/api/admin/group/node/" + data;
    //        this.$http.get(apiUrl).then(result => {
    //          this.departChange = result.data.data;
    //          console.log(result.data);
    //        });
    //      });
    //    }
  },
  beforeCreate() {},
  created() {
    //    EventBus.$on("userfrom", data => {
    //      const apiUrl = "/api/admin/group/node/" + data;
    //      this.$http.get(apiUrl).then(result => {
    //        this.departNow = result.data.data;
    //        console.log(result.data);
    //      });
    //    });
    //    EventBus.$on("userto", data => {
    //      const apiUrl = "/api/admin/group/node/" + data;
    //      this.$http.get(apiUrl).then(result => {
    //        this.departChange = result.data.data;
    //        console.log(result.data);
    //      });
    //    });
  },
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
.drag-wrap {
  height: 300px;
}
</style>
