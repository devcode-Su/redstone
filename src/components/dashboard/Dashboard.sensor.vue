<template>
  <section data-sensor="counnt">
    <dl class="pannel-content first">
      <dt class="sensor">센서 현황</dt>
      <dd>{{sensorCount}} /
        <small>{{sensorTotal}}
        </small>
      </dd>
    </dl>
    <dl class="pannel-content">
      <dt class="process">일간 프로세스탐지</dt>
      <dd>{{dailyProcessCount}}</dd>
    </dl>
    <dl class="pannel-content">
      <dt class="network">일간 네트워크 탐지</dt>
      <dd>{{dailyNetworkCount}}</dd>
    </dl>

    <!-- <dl class="pannel-content first">
      <dt class="sensor">센서 현황</dt>
      <dd>{{sensorCount}} /
        <small>{{sensorTotal}}
        </small>
      </dd>
    </dl>
    <dl class="pannel-content">
      <dt class="process">일간 프로세스탐지</dt>
      <dd>{{dailyProcessCount}}</dd>
    </dl>
    <dl class="pannel-content">
      <dt class="network">일간 네트워크 탐지</dt>
      <dd>{{dailyNetworkCount}}</dd>
    </dl> -->
  </section>
</template>
<script>
export default {
  name: "이름 꼭 적기",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {};
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

    this.
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
</style>
