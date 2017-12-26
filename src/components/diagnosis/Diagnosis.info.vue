<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <info-file :prop-data="infoFile.queryData" @form="receive"></info-file>
        <diagnosis-info-datatable :form-data="infoFile.formData" :local-data="infoFile.local"></diagnosis-info-datatable>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <info-ip :prop-data="infoIp.queryData" @form="receive"></info-ip>
        <diagnosis-info-datatable :form-data="infoIp.formData" :local-data="infoIp.local"></diagnosis-info-datatable>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <info-rsc :prop-data="infoRsc.queryData" @form="receive"></info-rsc>
        <diagnosis-info-datatable :form-data="infoRsc.formData" :local-data="infoRsc.local"></diagnosis-info-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import { mapGetters } from "vuex";
import InfoFile from "./Diagnosis.info.file";
  import InfoIp from "./Diagnosis.info.ip";
  import InfoRsc from "./Diagnosis.info.rsc";
import DiagnosisInfoDatatable from "./Diagnosis.info.datatable";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "first",
      infoFile: {
        queryData : {},
        formData : {},
        local: {
          name : "file",
          apiCondition : "FileHash",
          fields : {
            FileHash : "악성파일",
            count : "진단건수",
            firstSeenTime : "첫 유입일",
            lastSeenTime : "마지막 유입일"
          },
          insertFields: {
            EventTime : "날짜",
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC 명",
            userip : "IP 주소",
            ProcessName : "실행 파일명",
            ProcessImagePath : "실행 경로"
          }
        }
      },
      infoIp: {
        queryData : {},
        formData : {},
        local:{
          name : "ip",
          apiCondition : "ip",
          fields : {
            ip : "URL/IP 주소",
            count : "진단건수",
            firstSeenTime : "첫 유입일",
            lastSeenTime : "마지막 유입일"
          },
          insertFields: {
            EventTime : "날짜",
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC 명",
            userip : "IP 주소",
            ProcessName : "실행 파일명",
            ProcessImagePath : "실행 경로"
          }
        }
      },
      infoRsc: {
        queryData : {},
        formData : {},
        local:{
          name: "rsc",
          apiCondition : "name",
          fields : {
            name : "RSC 엔진 명",
            count : "진단건수",
            firstSeenTime : "첫 유입일",
            lastSeenTime : "마지막 유입일"
          },
          insertFields: {
            EventTime : "날짜",
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC 명",
            userip : "IP 주소",
            ProcessName : "실행 파일명",
            ProcessImagePath : "실행 경로"
          }
        }
      },
    };
  },
  computed: {
    ...mapGetters({
      selectData : "dashboardData"
    })
  },
  components: {
    "info-file": InfoFile,
    "info-ip": InfoIp,
    "info-rsc": InfoRsc,
    "diagnosis-info-datatable":DiagnosisInfoDatatable,
  },
  watch: {},
  methods: {
    receive(form) {
      if (this.activeName === "first") {
        this.mixData(this.infoFile, form, "file");
      } else if (this.activeName === "second") {
        this.mixData(this.infoIp, form, "ip");
      } else if (this.activeName === "third") {
        this.mixData(this.infoRsc, form, "rsc");
      }
    },
    mixData(select, form, apiUrl) {
      return select.formData = {
        url : "/api/admin/search/detect/summary/" + apiUrl,
        form : form,
        order: "count"
      }
    }
  },
  beforeCreate() {},
  created() {
    this.$bus.$on("update", this.receive);
    if(this.selectData.name === "badurlip"){
      this.activeName = "second";
    }else if(this.selectData.name === "rsc"){
      this.activeName = "third";
    }
  },
  beforeMounted() {},
  mounted() {
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      let query = this.$route.query;
      console.log("diagnosis query");
      console.log(query);
      if(query.name === 'badfile'){
        this.infoFile.queryData = query;
      }else if(query.name === 'badurlip'){
        this.activeName = "second";
        this.infoIp.queryData = query;
      }else if(query.name === 'rsc'){
        this.activeName = "third";
        this.infoRsc.queryData = query;
      }
    }
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("update")
  },
  destroyed() {}
}
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
