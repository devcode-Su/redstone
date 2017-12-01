<template>
  <section data-dashboard-section="count">
    <dl>
      <dt class="sensor">센서 현황</dt>
      <dd>{{sensorCount}} /
        <small>{{sensorTotal}}
        </small>
      </dd>
    </dl>
    <dl>
      <dt class="process">일간 프로세스탐지</dt>
      <dd>{{dailyProcessCount}}</dd>
    </dl>
    <dl>
      <dt class="network">일간 네트워크 탐지</dt>
      <dd>{{dailyNetworkCount}}</dd>
    </dl>
  </section>
</template>
<script>
export default {
  name: "DashboardSensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      sensor: {
        count: "",
        total: ""
      },
      dailyProcess: {},
      dailyNetwork: []
    };
  },
  computed: {
    sensorCount() {
      return this.sensor.count;
    },
    sensorTotal() {
      return this.sensor.total;
    },
    dailyProcessCount() {
      return this.dailyProcess;
    },
    dailyNetworkCount() {
      return this.dailyNetwork;
    }
  },
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {
    const sensor = "/dashboard/?method=get&resource=sensor";
    const process = "/dashboard/?method=get&resource=process";
    const network = "/dashboard/?method=get&resource=network";

    this.$http
      .get(sensor)
      .then(response => {
        console.log("sensor get");
        this.sensor.count = response.data.data.count;
        this.sensor.total = response.data.data.total;
      })
      .catch(err => {
        console.log("get failed");
        this.sensor.count = 123;
        this.sensor.total = 123456;
      });

    this.$http
      .get(process)
      .then(response => {
        console.log("process get");
        this.dailyProcess = response.data.data.count;
      })
      .catch(err => {
        console.log("get failed");
        this.dailyProcess = 123;
      });

    this.$http
      .get(network)
      .then(response => {
        console.log("network get");
        this.dailyNetwork = response.data.data.count;
      })
      .catch(err => {
        console.log("get failed");
        this.dailyNetwork = 123;
      });
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
[data-dashboard-section="count"] {
  display: flex;
  background-color: #24c6f4;
  dl {
    flex: 1;
    padding: 0 25px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    &:first-child {
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
    margin: 0 10xp 0 0;
    line-height: 52px;
    font-size: 36px;
    text-align: right;
    color: #fff;
  }
}
</style>
