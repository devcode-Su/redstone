<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      SW 정보
    </h1>
    <el-tabs v-model="activeName" @tab-click="tabs">
      <el-tab-pane label="운영체제" name="os">
        <property-datatable :from-data="propertyOS.formData" :local-data="propertyOS.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="브라우저" name="second">
        <property-datatable :from-data="propertyBR.formData" :local-data="propertyBR.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="소프트웨어" name="third">
        <property-datatable :from-data="propertySW.formData" :local-data="propertySW.local"></property-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import PropertyDatatable from "./Property.datatable";
export default {
  name: "Propertysw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "first",
      propertyOS: {
        formData: {},
        local : {
          fields: {
            name :"운영체제",
            sp :"서비스팩",
            count:"PC 대수"
          }
        }
      },
      propertyBR: {
        formData: {},
        local:{
          fields: {
            name:"소프트웨어",
            version:"버전",
            count:"설치 PC 대수"
          }
        }
      },
      propertySW: {
        formData: {},
        local:{
          fields: {
            name:"소프트웨어",
            version:"버전",
            count:"설치 PC 대수"
          }
        }
      }
    };
  },
  computed: {},
  components: {
    "property-datatable" : PropertyDatatable
  },
  watch: {},
  methods: {
    tabs(tab){
      console.log(tab)
    }
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
.search-id {
  display: block;
  transform: translateY(20px);
}
</style>
