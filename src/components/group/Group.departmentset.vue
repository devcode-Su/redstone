<template>
  <section>
    <div class="user-set-wrap">
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          부서 수정
        </h2>
        <groupdepartment class="user-set-list" :treeEdit="true"></groupdepartment>
      </div>
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          부서원 정보
        </h2>
        <groupmembersmove class="user-set-list" :members="membersData"></groupmembersmove>
      </div>
    </div>
    <div class="user-set-btn">
      <md-button class="md-dense confirm" @click="saveStorage">
        <md-icon>done</md-icon> 저장
      </md-button>
    </div>
  </section>
</template>
<script>
import Groupdepartment from "./Group.department";
import Groupmembersmove from "./Group.membersmove";
//import { EventBus } from "@/main";
export default {
  name: "Grounpdetartmentset",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      membersData: []
    };
  },
  computed: {
  },
  components: {
    Groupdepartment,
    Groupmembersmove
  },
  watch: {},
  methods: {
    saveStorage() {
    },
    resetStorage() {
      //EventBus.$emit("resetGroup");
      this.membersData = []
    }
  },
  beforeCreate() {},
  created() {
//    EventBus.$on("userview", data => {
//      const apiUrl = "/api/admin/group/node/" + data;
//      this.$http.get(apiUrl).then(result => {
//        console.log(result.data.data);
//        this.membersData = result.data.data;
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
.user-set-area {
  .user-set-list {
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }
  .group-department,
  .group-members {
    .table-body-wrap {
      height: 400px;
    }
  }
}
</style>
