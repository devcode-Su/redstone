<template>
  <section data-thumbcomp="thumb">
    <h1>
      {{propData.title}}
    </h1>
    <dashboard-periodbtn v-if="propData.button_type === '1'" :categorize="categorize" @periodClick.self="periodNumber"></dashboard-periodbtn>
    <div data-chart-none v-if="dataCheck">{{indexDate}} 검출된 내역이 없습니다.</div>
    <chart-horizontalbar v-else :chart-data="datacollection" :width="500" :height="216"></chart-horizontalbar>
    <button data-icon class="more-link" @click.stop="link">
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
      btnNum : 0,
      arr: ["ip", "count"]
    };
  },
  computed : {
    selecNum(){
      return this.btnNum;
    },
    indexDate() {
      if(this.btnNum === 0) return "일일";
      else if(this.btnNum === 1) return "주간";
      else return "월간";
    }
  },
  components: {
    "dashboard-periodbtn":DashboardPeriodbtn,
    "chart-horizontalbar":ChartHorizontalbar
  },
  watch: {
    responseData(data) {
      if (data) {
        console.log(data);
        if (data.data[0] === null) {
          this.dataCheck = true;
        } else {
          this.dataCheck = false;
          console.log(data.data[0]);
          this.chartData = this.getValueToArr2(this.responseData.data[0],this.arr);
        }
      }
    },
    selecNum(num){
      console.log(num);
      if(this.responseData.data[num] === null ){
        console.log("없음");
        this.dataCheck = true;
      }else{
        console.log("있음");
        this.dataCheck = false;
        this.chartData = this.getValueToArr2(this.responseData.data[num],this.arr);
        this.fillData();
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
      //console.log(periodNum);
      this.btnNum = periodNum;
    },
    fillData() {
      this.datacollection = {
        labels: this.chartData[0],
        datasets: [
          {
            label: "검출 건수",
            backgroundColor: "#b3d8ff",
            borderWidth: 1,
            data: this.chartData[1],
            fill: false
          }
        ]
      };
    },
    link(){
      this.$store.commit(Constant.DASHBOARD_DATA, {
        name : this.propData.resource,
        num : this.btnNum + 1
      });
      this.$router.push(this.propData.link);
    },
    itemRemove(comNum) {
      this.$store.dispatch(Constant.DELETE_THUMBLIST, { index: comNum });
    }
  },
  created() {
    const url = "/dashboard/?method=get&resource=" + this.propData.resource;
    this.$http.get(url).then(response => {
      this.responseData = response.data;
    });
    //this.fillData();
    //console.log(this.propData);
  },
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
