<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      HW 정보
    </h1>
    <property-pannel></property-pannel>
    <detail-datatable :form-data="formData" :local-data="local"></detail-datatable>
    <property-modal v-if="showModal" @close="showModal = false"></property-modal>
  </article>
</template>
<script>
  import PropertyPannel from "./Property.pannel"
import DetailDatatable from "./Property.detail.datatable"
  import PropertyModal from "./Property.modal";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal: false,
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
    "detail-datatable" :DetailDatatable,
    "property-modal" : PropertyModal
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
  [data-search-pannel="property"]{
    margin-top:30px !important;
  }
</style>
