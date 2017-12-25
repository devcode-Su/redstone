<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      {{title}}
    </h1>
    <detail-pannel></detail-pannel>
    <detail-datatable @modal="showModal = true"></detail-datatable>
    <property-modal v-if="showModal" @close="showModal = false"></property-modal>
  </article>
</template>
<script>
  import { mapGetters } from "vuex";
import DetailPannel from "./Property.detail.pannel"
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
      title : "자산 상세 정보",
    };
  },
  computed: {
    ...mapGetters({ detailTitle: "propertyDetailInfo" })
  },
  components: {
    "detail-pannel" : DetailPannel,
    "detail-datatable" :DetailDatatable,
    "property-modal" : PropertyModal
  },
  watch: {},
  methods: {
  },
  beforeCreate() {},
  created() {
    if(this.detailTitle.title){
      this.title = this.detailTitle.title
    }else{
      this.$router.push("Property-sw");
    }
  },
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
  [data-search-pannel="property"]{
    margin-top:30px !important;
  }
</style>
