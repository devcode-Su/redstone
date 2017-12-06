<template>
  <section class="management">
    <div data-management>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          표시 가능한 정보
        </h2>
        <dashboardthumbset data-component="thumbset" class="off" v-model="hideList" :moveTo="viewList" :icon="false" :option="false" @moveitem="moveItem"></dashboardthumbset>
      </div>
      <div data-management-item>
        <h2 data-icon>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          현재 표시된 정보
        </h2>
        <dashboardthumbset data-component="thumbset" v-model="viewList" :moveTo="hideList" :icon="true" :option="true" @moveitem="moveItem"></dashboardthumbset>
      </div>
    </div>
    <div data-management data-btn="confirm">
      <el-button @click="resetList">처음으로</el-button>
      <el-button type="success" plain @click="saveList">저장</el-button>
    </div>
  </section>
</template>
<script>
// import Constant from "@/constant";
import { mapGetters } from "vuex";
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
      hideList: [],
      viewList: []
    };
  },
  computed: {
    ...mapGetters({ compAll: "fetchThumbAll" }),
    dragSave() {
      return localStorage.setItem(
        "dashboard-view",
        JSON.stringify(this.viewList)
      );
    }
  },
  components: {
    Dashboardthumbset
  },
  watch: {},
  methods: {
    moveItem(setItem) {
      setItem.to.push(setItem.element);
      setItem.from.splice(setItem.from.indexOf(setItem.element), 1);
    },
    saveList() {
      const getHide =
        "/dashboard/?method=set&resource=config&from=&to=&name=hidelist&time=";
      const getView =
        "/dashboard/?method=set&resource=config&from=&to=&name=viewlist&time=";

      this.$http.post(getHide, JSON.stringify(this.hideList));
      this.$http.post(getView, JSON.stringify(this.viewList));
      this.$bus.$emit("thumb-data");
    },
    resetList() {
      const setHide =
        "/dashboard/?method=set&resource=config&from=&to=&name=hidelist&time=";
      const setView =
        "/dashboard/?method=set&resource=config&from=&to=&name=viewlist&time=";
      const getView =
        "/dashboard/?method=get&resource=config&from=&to=&name=viewlist&time=";

      this.$http.post(setHide, JSON.stringify([])).then(() => {
        this.hideList = [];
      });
      this.$http.post(setView, JSON.stringify(this.compAll)).then(() => {
        this.$http.get(getView).then(response => {
          this.viewList = response.data;
        });
      });
      this.$bus.$emit("thumb-data");
    }
  },
  beforeCreate() {},
  created() {
    const getHide =
      "/dashboard/?method=get&resource=config&from=&to=&name=hidelist&time=";
    const getView =
      "/dashboard/?method=get&resource=config&from=&to=&name=viewlist&time=";

    this.$http.get(getHide).then(response => {
      console.log(response.data);
      if (response.data === null) {
        this.hideList = [];
      } else {
        this.hideList = response.data;
      }
    });
    this.$http.get(getView).then(response => {
      this.viewList = response.data;
    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    // console.log(this.hideList);
    // console.log(this.viewList);
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
