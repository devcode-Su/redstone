<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      Dashboard 기본정보
    </h1>
    <dashboardSensor></dashboardSensor>
    <dashboard-sensorchart></dashboard-sensorchart>
    <!-- <dashboard-detectiontable></dashboard-detectiontable> -->
    <dashboard-thumbcomponents class="dashboard-componets"></dashboard-thumbcomponents>
    <div data-tooltip-wrap>
      <button data-icon="set" class="dashboard-setbtn spin" type="button" @click="showModal = true">
        <i class="fa fa-cog fa-lg" aria-hidden="true"></i>
      </button>
      <span data-tooltip="category">대쉬보드 설정</span>
    </div>

    <templatemodal v-if="showModal" :target="'user-custom'" @close="showModal = false" :title="'대시보드 설정'" :compSelect="'dashboard-thumb'">
    </templatemodal>
  </article>
</template>
<script>
import DashboardSensor from "./Dashboard.sensor";
import DashboardSensorchart from "./Dashboard.sensor.chart";
import DashboardThumbcomponents from "./Dashboard.thumb.components";
import DashboardDetectiontable from "./Dashboard.detection.table";
import Templatemodal from "../template/Template.modal";
export default {
  name: "Dashboard",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal: false,
      //userSet: [],

      resourceList: []
    };
  },
  components: {
    DashboardSensor,
    DashboardSensorchart,
    DashboardDetectiontable,
    DashboardThumbcomponents,
    Templatemodal
  },
  watch: {},
  methods: {
    // getSensor() {
    //   const url = "/dashboard/?method=get&resource=sensor";
    //   this.$http.get(url).then(result => {
    //     this.sensor.count = result.data.data.count;
    //     this.sensor.total = result.data.data.total;
    //   });
    // },
    // getDailyProcess() {
    //   const url = "/dashboard/?method=get&resource=process";
    //   this.$http.get(url).then(result => {
    //     this.dailyProcess = result.data.data.count;
    //   });
    // },
    // getDailyNetwork() {
    //   const url = "/dashboard/?method=get&resource=network";
    //   this.$http.get(url).then(result => {
    //     this.dailyNetwork = result.data.data.count;
    //   });
    // },
    // getResourceList() {
    //   const url = "/dashboard/?method=define";
    //   this.$http.get(url).then(result => {
    //     console.log(result);
    //   });
    // }
  },
  beforeCreate() {},
  created() {
    // this.$bus.$emit("thumblist", () => {
    //   console.log("버스");
    // });
    // this.getSensor();
    // this.getDailyProcess();
    // this.getDailyNetwork();
    //    this.getDailyNetwork();
    //this.getResourceList();
    //    const apiUrl = "/static/data/userset.json";
    //    let promise = [];
    //    this.$http.get(apiUrl).then(result => {
    //      result.data.forEach(item => {
    //        if (item.hasOwnProperty("url")) {
    //          promise.push(
    //            this.$http.get(item.url).then(r => {
    //              item.data = r.data;
    //            })
    //          );
    //        }
    //      });
    //      Promise.all(promise)
    //        .then(() => {
    //          this.defaultView = result.data;
    //          localStorage.setItem("dashboard-data", JSON.stringify(result.data));
    //        })
    //        .then(() => {
    //          this.defaultViews;
    //        });
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
[data-dashboard-section] {
  padding: 5px;
  box-shadow: 0px 2px 5px rgba(25, 25, 25, 0.27);
  margin-bottom: 25px;
  h1 {
    font-size: 18px;
  }
}
[data-icon="set"] {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 25px;
  right: 35px;
}
</style>
