<template>
  <section class="user-set">
    <h1 class="user-set-title">
      {{title}}
    </h1>
    <div class="user-set-wrap">
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          표시 가능한 정보
        </h2>
        <dashboardthumbset class="dashboard-thumbset user-set-list off" v-model="dashboardNone" :moveTo="dashboardView" :icon="false" :option="false" @moveitem="moveItem"></dashboardthumbset>
      </div>
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          현재 표시된 정보
        </h2>
        <dashboardthumbset class="user-set-list" v-model="dashboardView" :moveTo="dashboardNone" :icon="true" :option="true" @moveitem="moveItem"></dashboardthumbset>
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
import TemplateDraglist from "../template/Template.draglist";
import Dashboardthumbset from "./Dashboard.thumbset";
export default {
  name: "DashboardSet",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    title: {
      type: String
    }
  },
  data() {
    return {
      dashboardNone: [],
      dashboardView: []
    };
  },
  computed: {
    defaultViews() {
      return this.dashboardView.length === 0
        ? (this.dashboardView = JSON.parse(
            localStorage.getItem("dashboard-data")
          ))
        : (this.dashboardView = JSON.parse(
            localStorage.getItem("dashboard-view")
          ));
    },
    dragSave() {
      return localStorage.setItem(
        "dashboard-view",
        JSON.stringify(this.dashboardView)
      );
    }
  },
  components: {
    TemplateDraglist,
    Dashboardthumbset
  },
  watch: {},
  methods: {
    moveItem(setItem) {
      setItem.to.push(setItem.element);
      setItem.from.splice(setItem.from.indexOf(setItem.element), 1);
    },
    saveStorage() {
      localStorage.setItem(
        "dashboard-none",
        JSON.stringify(this.dashboardNone)
      );
      localStorage.setItem(
        "dashboard-view",
        JSON.stringify(this.dashboardView)
      );
    },
    resetStorage() {
      this.dashboardNone = [];
      this.dashboardView = JSON.parse(localStorage.getItem("dashboard-data"));
      localStorage.setItem("dashboard-none", "[]");
      localStorage.setItem(
        "dashboard-view",
        JSON.stringify(this.dashboardView)
      );
    }
  },
  beforeCreate() {},
  created() {
    this.dashboardNone = JSON.parse(localStorage.getItem("dashboard-none"));
    this.dashboardView = JSON.parse(localStorage.getItem("dashboard-view"));
  },
  beforeMounted() {},
  mounted() {
    this.defaultViews;
  },
  beforeUpdate() {},
  updated() {
    this.dragSave;
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
