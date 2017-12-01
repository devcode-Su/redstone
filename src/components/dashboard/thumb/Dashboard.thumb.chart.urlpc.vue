<template>
  <section class="dashboard-thumb">
    <h1>
      {{resultData.title}}
    </h1>
    <dashboard-periodbtn :categorize="categorize" @periodClick="periodData"></dashboard-periodbtn>
    <div class="visual">
      <chart-horizontalbar :chart-data="datacollection" :width="500" :height="216"></chart-horizontalbar>
    </div>
    <button class="icon-btn icon-wrap more-link">
      More <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button class="icon-wrap icon-btn thumb-remove">
      <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>

import DashboardPeriodbtn from "../Dashboard.period.btn.vue";
import ChartHorizontalbar from "../../chartjs/HorizontalBar";
  export default {
    name: "DashboardThumbchatUrlpc",
    extends: {},
    props: {
      title: {
        type: String
      },
      thumbData: {
        type: Array | Object
      }
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
        resultData : [],
        chartData : []
      };
    },
    components: {
      DashboardPeriodbtn,
      ChartHorizontalbar
    },
    methods: {
      periodData(sortNum) {
        this.fillData(sortNum);
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
//      getRandomInt() {
//        return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
//      }
    },
    created() {
      const url = "/dashboard/?method=get&resource=badurlippc";
      this.$http.get(url).then( result => {
        this.resultData = result.data;
        this.chartData = this.getValueArr(result.data);
        this.fillData();
      });
      //this.fillData();
    },
    computed: {},
    mounted() {

    },
    update() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .visual{
    margin-top:10px;
  }
</style>
