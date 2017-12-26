<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      무선 LAN 사용
    </h1>
    <wireless-form></wireless-form>
    <wireless-datatable :local-data="local"></wireless-datatable>
  </article>
</template>
<script>
import WirelessForm from "./Security.wireless.form";
import WirelessDatatable from "./Security.wireless.datatable";
export default {
  name: "Securitymedia",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      local: {
        fields: {
          nodeid : "센서 ID",
          adapter_guid: "장치",
          mac : "MAC",
          ssid : "SSID",
          name : "장치명",
          dns : "DNS",
          gateway : "GATEWAY",
          ip : "IP",
          event_time : "접속시각",
          insert_time : "종료시각"
        },
        order:{
          name : "장치명",
          ssid : "SSID",
          event_time : "접속시각",
        }
      }
    };
  },
  computed: {},
  components: {
    "wireless-form" :WirelessForm,
    "wireless-datatable" : WirelessDatatable
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
</style>
