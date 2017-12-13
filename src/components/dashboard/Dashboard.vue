<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      Dashboard 기본정보
    </h1>
    <dashboard-sensor></dashboard-sensor>
    <dashboard-sensorchart></dashboard-sensorchart>
    <dashboard-detectiontable></dashboard-detectiontable>
    <dashboard-thumbcomponents class="dashboard-componets"></dashboard-thumbcomponents>
    <div data-tooltip-wrap="setup">
      <button data-icon="set" class="dashboard-setbtn spin" type="button" @click="showModal = true">
        <i class="fa fa-cog fa-lg" aria-hidden="true"></i>
      </button>
      <span data-tooltip="setup">대쉬보드 설정</span>
    </div>

    <templatemodal v-if="showModal" :target="true" @close="showModal = false" :title="'대시보드 설정'" :compSelect="'dashboard-thumb'">
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
      resourceList: []
    };
  },
  components: {
    "dashboard-sensor" : DashboardSensor,
    "dashboard-sensorchart":DashboardSensorchart,
    "dashboard-detectiontable":DashboardDetectiontable,
    "dashboard-thumbcomponents":DashboardThumbcomponents,
    "templatemodal":Templatemodal
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
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
}

</style>
