<template>
  <article class="redstone-dashboard">
    <h1 class="page-title">
      Dashboard 기본정보
    </h1>
    <section class="basic-pannel section-wrap">
      <dl class="pannel-content first">
        <dt class="sensor">센서 현황</dt>
        <dd>{{this.sensorCount}} /
          <small>{{this.sensorTotal}}
          </small>
        </dd>
      </dl>
      <dl class="pannel-content">
        <dt class="process">일간 프로세스탐지</dt>
        <dd>{{this.dailyProcessCount}}</dd>
      </dl>
      <dl class="pannel-content">
        <dt class="network">일간 네트워크 탐지</dt>
        <dd>{{this.dailyNetworkCount}}</dd>
      </dl>
    </section>
    <section class="section-wrap">
      <dashboard-chart></dashboard-chart>
    </section>
    <section class="section-wrap">
      <dashboardlogtable></dashboardlogtable>
    </section>
    <dashboardthumblist class="dashboard-list"></dashboardthumblist>
    <!--<button class="icon-btn icon-wrap dashboard-setbtn" type="button" @click="showModal = true">-->
      <!--<i class="fa fa-cog fa-lg fa-spin" aria-hidden="true"></i>-->
    <!--</button>-->
    <!--<templatemodal v-if="showModal" :target="'user-custom'" @close="showModal = false" :title="'대시보드 설정'" :compSelect="'dashboard-thumb'">-->
    <!--</templatemodal>-->
  </article>
</template>
<script>
//  import draggable from "vuedraggable";
import DashboardChart from "./Dashboard.chart";
import Dashboardthumblist from "./Dashboard.thumb.list.vue";
import Dashboardlogtable from "./Dashboardlogtable.vue"
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
      sensor :{
        count: "",
        total : ""
      },
      dailyProcess : {},
      dailyNetwork : {},
      resourceList:[]
    };
  },
  computed: {
    sensorCount(){
      return this.sensor.count
    },
    sensorTotal(){
      return this.sensor.total
    },
    dailyProcessCount(){
      return this.dailyProcess
    },
    dailyNetworkCount(){
      return this.dailyNetwork
    }
  },
  components: {
    Templatemodal,
    DashboardChart,
    //draggable,
    Dashboardlogtable,
    Dashboardthumblist
  },
  watch: {},
  methods: {
    getSensor(){
      const url = "/dashboard/?method=get&resource=sensor";
      this.$http.get(url).then(result => {
        this.sensor.count =  result.data.data.count;
        this.sensor.total = result.data.data.total
      })
    },
    getDailyProcess(){
      const url = "/dashboard/?method=get&resource=process";
      this.$http.get(url).then(result => {
        this.dailyProcess = result.data.data.count
      })
    },
    getDailyNetwork(){
      const url = "/dashboard/?method=get&resource=network";
      this.$http.get(url).then(result => {
        this.dailyNetwork = result.data.data.count
      })
    },
    getResourceList(){
      const url = "/dashboard/?method=define";
      this.$http.get(url).then(result => {
        console.log(result)
      })
    },
  },
  beforeCreate() {},
  created() {
    this.getSensor();
    this.getDailyProcess();
    this.getDailyNetwork();
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
.redstone-dashboard {
  .md-button {
    position: absolute;
    z-index: 1;
    color: color(icon);
    &.md-dense {
      top: 12px;
      right: 10px;
    }
    &.md-raised {
      min-width: auto;
      height: 28px;
      min-height: auto;
      top: 46px;
      right: 20px;
      text-shadow: 1px 2px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 0 0;
      &:hover {
        color: color(highlight);
        text-shadow: 1px 2px rgba(204, 55, 65, 0.2);
      }
    }
  }
  .md-icon {
    @include iconsize(18px);
  }
  .section-wrap {
    padding: 5px;
  }
  .basic-pannel {
    margin-top:30px;
    display: flex;
    background-color: #24c6f4;
    @include defaultShadow;
    .pannel-content {
      flex: 1;
      padding: 0 25px;
      border-left: 1px solid rgba(255, 255, 255, 0.3);
      &.first {
        border-left: 0 none;
      }
    }
    dt {
      padding: 5px 0 0 70px;
      line-height: 40px;
      font-size: 20px;
      background: no-repeat left center;
      &.sensor {
        background-image: url(../../assets/icon-sensor.png);
      }
      &.process {
        background-image: url(../../assets/icon-process.png);
      }
      &.network {
        background-image: url(../../assets/icon-network.png);
      }
    }
    dd {
      margin: 0 10px 0 0;
      line-height: 52px;
      font-size: 36px;
      text-align: right;
      color: color(white);
      small {
        font-size: 0.7em;
      }
    }
  }
  .chart-wrap {
    padding-left: 5px;
    padding-right: 5px;
    background: #fff;
    margin: 25px 0 0;
    @include defaultShadow;
  }
  .template-table-modal {
    @extend .chart-wrap;
  }
  .dashboard-setbtn{
    position:absolute;
    top:30px;
    right:30px;
  }
}

.component-thumb {
  margin: 25px 0 40px;
  .thumb-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .thumb-item {
    flex: 1 0 auto;
    width: 350px;
    padding: 5px;
    margin-bottom: 5px;
    position: relative;
    @include transition(all, 0.5s);
    @media screen and (min-width: 1459px) {
      width: 25%;
      max-width: 25%;
    }
    @media screen and (min-width: 1126px) and (max-width: 1458px) {
      max-width: 33.3333333%;
    }
    @media screen and (min-width: 776px) and (max-width: 1125px) {
      max-width: 50%;
    }
  }
}

.thumb-enter-acitve,
.thumb-leave-active {
  transition: opacity 0.5s;
}

.thumb-enter,
.thumb-leave-to {
  opacity: 0;
}
</style>
