<template>
  <section data-thumbcomp="thumb">
    <h1>
      {{propData.title}}
    </h1>
    <dashboard-periodbtn v-if="propData.button_type === '1'" :categorize="categorize" @periodClick.self="periodNumber"></dashboard-periodbtn>
    <div data-chart-none v-if="dataCheck">검출된 내역이 없습니다.</div>
    <chart-horizontalbar v-else :chart-data="datacollection" :width="500" :height="216"></chart-horizontalbar>
    <button data-icon class="more-link">
      More
      <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button data-icon class="remove" @click.stop="itemRemove(index)">
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
      dataCheck: false,
      categorize: ["일일", "주간", "월간"],
      datacollection: {},
      responseData: [],
      chartData: [],
      arr: ["ip", "count"]
    };
  },
  components: {
    "dashboard-periodbtn":DashboardPeriodbtn,
    "chart-horizontalbar":ChartHorizontalbar
  },
  watch: {
    responseData(data) {
      if (data) {
        //console.log(data);
        if (data.data[0] === null) {
          this.dataCheck = true;
        } else {
          console.log(data.data[0]);
          //this.chartData = data.data[0];
        }
      }
    }
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
    periodNumber(periodNum) {
      console.log(periodNum);
      //this.fillData(priodNum);
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
    const url = "/dashboard/?method=get&resource=" + this.propData.resource;
    this.$http.get(url).then(response => {
      this.responseData = response.data;
    });
    //this.fillData();
    //console.log(this.propData);
  },
  computed: {},
  mounted() {},
  update() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
[data-chart-none] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;
  border: 1px solid color(border);
}
</style>
