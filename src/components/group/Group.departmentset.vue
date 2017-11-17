<template>
  <section>
    <div class="user-set-wrap">
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          부서 수정
        </h2>
        <grouptree class="user-set-list"></grouptree>
      </div>
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          부서원 정보
        </h2>
        <groupmembers class="user-set-list" :omitPath="'part'" :members="membersData"></groupmembers>
      </div>
    </div>
    <div class="user-set-btn">
      <md-button class="md-dense reset" @click="resetStorage">
        <md-icon>replay</md-icon> 처음으로
      </md-button>
      <md-button class="md-dense confirm" @click="saveStorage">
        <md-icon>done</md-icon> 확인
      </md-button>
    </div>
  </section>
</template>
<script>
import Grouptree from "./Group.tree";
import Groupmembers from "./Group.members";
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
  computed: {},
  components: {
    Grouptree,
    Groupmembers
  },
  watch: {},
  methods: {
    saveStorage() {
      // localStorage.setItem(
      //   "dashboard-none",
      //   JSON.stringify(this.dashboardNone)
      // );
      localStorage.setItem("members-now", JSON.stringify(this.membersData));
    },
    resetStorage() {
      this.membersData = JSON.parse(localStorage.getItem("members-now"));
      // localStorage.setItem("dashboard-none", "[]");
      // localStorage.setItem(
      //   "dashboard-view",
      //   JSON.stringify(this.dashboardView)
      //);
    }
  },
  beforeCreate() {},
  created() {
    this.membersData = JSON.parse(localStorage.getItem("members-data" || "[]"))
    console.log(this.membersData);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {

  },
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
