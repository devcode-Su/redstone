<template>
  <section data-thumbcomp="thumb" class="dashboard-thumb">
    <h1>
      {{propData.title}}
    </h1>
    <dashboard-periodbtn :categorize="categorize" @periodClick="periodData"></dashboard-periodbtn>
    <div class="visual">
      <chart-horizontalbar :chart-data="datacollection" :width="500" :height="216"></chart-horizontalbar>
    </div>
    <button class="icon-btn icon-wrap more-link">
      More
      <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button class="icon-wrap icon-btn" @click.stop="itemRemove(index)">
      <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>
import Constant from "@/constant";
import DashboardPeriodbtn from "../Dashboard.period.btn.vue";
import ChartHorizontalbar from "../../chartjs/HorizontalBar";
export default {
  name: "ThumbComponentchart",
  extends: {},
  props: {
    propData: {
      type: Object,
      default() {
        return { message: "do not" };
      }
    },
    index: Number
  },
  data() {
    return {
      progress: 0,
      progressInterval: null,
      transition: true,
      count: 60,
      progressColor: "red",
      categorize: ["일일", "주간", "월간"],
      chartNum: 0,
      datacollection: {},
      resultData: [],
      chartData: [],
      arr: ["ip", "count"]
    };
  },
  components: {
    DashboardPeriodbtn,
    ChartHorizontalbar
  },
  methods: {
    // startProgress() {
    //   this.progressInterval = window.setInterval(() => {
    //     this.progress += 3;
    //     if (this.progress >= this.count) {
    //       window.clearInterval(this.progressInterval);
    //     }
    //   }, 100);
    // },
    // restartProgress(index) {
    //   if (this.idx !== index) {
    //     this.progress = 0;
    //     this.transition = false;
    //     window.clearInterval(this.progressInterval);
    //     window.setTimeout(() => {
    //       this.transition = true;
    //       this.startProgress();
    //     }, 100);
    //     this.idx = index
    //   }
    // }
    periodData(priodNum) {
      this.fillData(priodNum);
    },
    fillData(n) {
      const insertData = this.chartData;
      if (n === undefined) n = 0;
      this.datacollection = {
        labels: insertData[n][1],
        datasets: [
          {
            label: "검출 건수",
            backgroundColor: "#b3d8ff",
            borderWidth: 1,
            data: insertData[n][0],
            fill: false
          }
        ]
      };
    },
    itemRemove(comNum) {
      this.$store.dispatch(Constant.DELETE_THUMBLIST, { index: comNum });
    }
    //      getRandomInt() {
    //        return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    //      }
  },
  created() {
    // const url = "/dashboard/?method=get&resource=badfilepc";
    // this.$http.get(url).then(result => {
    //   this.resultData = result.data;
    //   console.log(result);
    //   this.chartData = this.getValueArr(result.data, this.arr);
    //   this.fillData();
    // });
    //this.fillData();
    console.log(this.propData);
  },
  computed: {},
  mounted() {},
  update() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.visual {
  margin-top: 10px;
}
</style>
