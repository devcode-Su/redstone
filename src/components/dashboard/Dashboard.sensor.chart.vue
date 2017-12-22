<template>
  <section data-dashboard-section="mainchart" class="chart-wrap">
    <div class="chart-header">
      <h1>
        {{responseData.title}}
      </h1>
      <dashboard-periodbtn :categorize="categorize" @periodClick="periodData"></dashboard-periodbtn>
    </div>
    <chart-line :chart-data="datacollection" ref="line" class="chart-area"></chart-line>
  </section>
</template>
<script>
//import moment from "moment";
import DashboardPeriodbtn from "./Dashboard.period.btn.vue";
import ChartLine from "../chartjs/Line";

export default {
  name: "DashboardSensorchart",
  extends: {},
  props: {},
  data() {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null,
      gradient4: null,
      datacollection: {},
      categorize: ["일일", "주간", "월간"],
      chartData: [],
      arr: ["time", "process", "network", "file"],
      responseData: [],
      interval : ''
    };
  },
  components: {
    "dashboard-periodbtn":DashboardPeriodbtn,
    "chart-line":ChartLine
  },
  computed: {},
  watch: {
  },
  methods: {
    periodData(sortNum) {
      this.fillData(sortNum);
    },
    fillData(n) {
      const insertData = this.chartData;
      if (n === undefined) n = 0;
      this.datacollection = {
        labels: insertData[n][0],
        datasets: [
          {
            label: "프로세스",
            borderColor: "#FC2525",
            pointBackgroundColor: "grey",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: insertData[n][1],
            fill: false
          },
          {
            label: "네트워크",
            borderColor: "#05CBE1",
            pointBackgroundColor: "grey",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: insertData[n][2],
            fill: false
          },
          {
            label: "파일",
            borderColor: "#8cf43d",
            pointBackgroundColor: "grey",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient3,
            data: insertData[n][3],
            fill: false
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    },
    chartStart() {
      const url = "/dashboard/?method=get&resource=events";
      this.$http
        .get(url)
        .then(response => {
          this.responseData = response.data;
          this.chartData = this.getValueToArr(response.data, this.arr);
        })
        .then(() => {
          this.fillData();
        });
    },
    relData(){
      this.interval = setInterval(this.chartStart,5000);
    }
  },
  created() {
    this.chartStart();
  },
  mounted() {
    const selectCanvas = this.$refs.line.$refs;
    this.gradient = selectCanvas.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = selectCanvas.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient3 = selectCanvas.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient4 = selectCanvas.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    this.gradient3.addColorStop(0, "rgba(122, 71, 194, 0.9)");
    this.gradient3.addColorStop(0.5, "rgba(122, 71, 194, 0.25)");
    this.gradient3.addColorStop(1, "rgba(122, 71, 194, 0)");
    this.gradient4.addColorStop(0, "rgba(78, 218, 169, 0.9)");
    this.gradient4.addColorStop(0.5, "rgba(78, 218, 169, 0.25)");
    this.gradient4.addColorStop(1, "rgba(78, 218, 169, 0)");
    // window.setInterval(() => {
    //   this.fillData()
    // }, 1000);
    this.relData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid color(default);
}
.chart-area {
  padding: 5px;
}
h1 {
  font-size: 16px;
  margin-bottom: 0;
}
</style>
