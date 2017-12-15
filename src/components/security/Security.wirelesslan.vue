<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      무선 LAN 사용
    </h1>
    <wireless-forn @submit="receive"></wireless-forn>
    <wireless-datatable :form-data="formData" :local-data="local"></wireless-datatable>
  </article>
</template>
<script>
import WirelessForn from "../form/Sesurity.wireless.form";
import WirelessDatatable from "./Security.wireless.datatable";
export default {
  name: "Securitymedia",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      formData : {},
      local : {},
      search: {
        field: [
          "",
          "장착시간",
          "탈착시간",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC IP 주소",
          "종류",
          "연결방식",
          "진단개수",
          "종류",
          "연결방식",
          "경로",
          "장치명",
          "용량",
          "발생이벤트"
        ],
        data: [],
        search: [],
        url: ""
      }
    };
  },
  computed: {},
  components: {
    "WirelessForn" :WirelessForn,
    "wireless-datatable" : WirelessDatatable
  },
  watch: {},
  methods: {
    receive(form) {
      this.$bus.$emit('security-account', form);
    }
  },
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
