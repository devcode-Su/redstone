<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      {{title}}
    </h1>
    <detail-pannel :props="panelData"></detail-pannel>
    <detail-datatable :form-data="formData" @modal="showModal = true"></detail-datatable>
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
      panelData : {},
      formData : {}
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
      //this.$router.push("Property-sw");
    }
  },
  beforeMounted() {},
  mounted() {
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      let query = this.$route.query;
      console.log(query);
      this.title = query.title;
      this.panelData = {
        api: query.api,
        name : query.name,
        version : query.version
      };
      this.formData = {
        api: query.api,
        name : query.name,
        version : query.version,
        urlType : query.urlType
      };
      console.log(this.panelData);
      console.log(this.formData);
    }
  },
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
