<template>
  <article data-layout="Route-article">
    디테일
    <property-pannel></property-pannel>
    <detail-datatable :form-data="formData" :local-data="local"></detail-datatable>
  </article>
</template>
<script>
  import PropertyPannel from "./Property.pannel"
import DetailDatatable from "./Property.detail.datatable"
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      formData: {},
      local : {
        fields: {
          nodeid : "센서 ID",
          username : "사용자명",
          userdept : "부서명",
          userpc : "PC 명",
          userip : "PC IP 주소",
        }
      }
    };
  },
  computed: {},
  components: {
    "property-pannel" : PropertyPannel,
    "detail-datatable" :DetailDatatable
  },
  watch: {},
  methods: {
  },
  beforeCreate() {},
  created() {},
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
