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
        <property-datatable :form-data="propertySW.formData" :local-data="propertySW.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="설치된 S/W" name="four">
        <install-software @form="receiveSW"></install-software>
        <software-datatable :form-data="installSW.formData" :local-data="installSW.local"></software-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import { mapGetters } from "vuex";
import PropertyDatatable from "./Property.datatable";
import SoftwareDatatable from "./Property.software.datatable";
import InstallSoftware from "./Install.software.form"
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
      },
      installSW:{
        formData:{},
        local:{
          fields: {
            nodeid : "센서ID",
            username : "사용자명",
            usergroup : "부서명",
            computer : "PC 명",
            ip : "PC IP 주소",
            name : "소프트웨어"
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      selectData : "dashboardData"
    })
  },
  components: {
    "property-datatable" : PropertyDatatable,
    "software-datatable" : SoftwareDatatable,
    "install-software" : InstallSoftware
  },
  watch: {

  },
  methods: {
    receive(){
      console.log(this.activeName);
      if (this.activeName === "first") {
        this.mixData(this.propertyOS, "os" ,"name", "운영체제 정보", "software");
      } else if (this.activeName === "second") {
        this.mixData(this.propertyBR, "browser", "name", "브라우저 정보","software");
      } else if (this.activeName === "third") {
        this.mixData(this.propertySW, "software", "name", "소프트웨어 정보","software");
      } else if (this.activeName === "four") {
        this.receiveSW();
      }
    },
    mixData(select, apiUrl, order, title, urlType) {
      return select.formData = {
        url : `/api/admin/node/summary/${apiUrl}/`,
        urlType : urlType,
        order : order,
        api : apiUrl,
        title : title
      }
    },
    receiveSW(form){
      console.log(form);
      if(form){
        return this.installSW.formData = {
          url : `/api/admin/node/search/software/${form.name}`,
          urlType : "software",
          order : "nodeid",
          form : form,
          api : "software",
          title : "소프트웨어 정보"
        }
      }
    },
    tabs(){
      this.receive();
    }
  },
  beforeCreate() {},
  created() {
    this.$bus.$on("update", this.receive);
    if(this.selectData.name === "program"){
      this.activeName = "third";
    }
  },
  beforeMounted() {},
  mounted() {
    this.receive();
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      let query = this.$route.query;
      if(query.api === 'software') this.activeName = "third";
    }
  },
  beforeUpdate() {},
  updated() {
    console.log()
  },
  activated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("update");
  },
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
