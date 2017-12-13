<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      SW 정보
    </h1>
    <el-tabs v-model="activeName" @tab-click="tabs">
      <el-tab-pane label="운영체제" name="first">
        <property-datatable :form-data="propertyOS.formData" :local-data="propertyOS.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="브라우저" name="second">
        <property-datatable :form-data="propertyBR.formData" :local-data="propertyBR.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="소프트웨어" name="third">
        <software-datatable :form-data="propertySW.formData" :local-data="propertySW.local"></software-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import PropertyDatatable from "./Property.datatable";
import SoftwareDatatable from "./Property.software.datatable"
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
            count:"설치 PC 대수"
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
    "property-datatable" : PropertyDatatable,
    "software-datatable" : SoftwareDatatable
  },
  watch: {},
  methods: {
    receive(){
      console.log(this.activeName)
      if (this.activeName === "first") {
        this.mixData(this.propertyOS, "os");
      } else if (this.activeName === "second") {
        this.mixData(this.propertyBR, "browser");
      } else if (this.activeName === "third") {
        this.mixData(this.propertySW, "software");
      }
    },
    mixData(select, apiUrl) {
      return select.formData = {
        url : "/api/admin/node/summary/" + apiUrl + "/",
        order : "name"
      }
    },
    tabs(){
      this.receive();
    }
  },
  beforeCreate() {},
  created() {
  },
  beforeMounted() {},
  mounted() {
    this.receive()
  },
  beforeUpdate() {},
  updated() {
    console.log()
  },
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
