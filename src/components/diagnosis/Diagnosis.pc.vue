<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협 PC 기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <pc-file @form="receive"></pc-file>
        <diagnosis-datatable :form-data="pcFile.formData" :local-data="pcFile.local"></diagnosis-datatable>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <pc-ip @form="receive"></pc-ip>
        <diagnosis-datatable :form-data="pcIp.formData" :local-data="pcIp.local"></diagnosis-datatable>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <pc-rsc @form="receive"></pc-rsc>
        <diagnosis-datatable :form-data="pcRsc.formData" :local-data="pcRsc.local"></diagnosis-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import { mapGetters } from "vuex";
  import PcFile from "./Diagnosis.pc.file";
  import PcIp from "./Diagnosis.pc.ip";
  import PcRsc from "./Diagnosis.pc.rsc";
import DiagnosisDatatable from "./Diagnosis.pc.datatable";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        datetime: true
      },
      activeName: "first",
      pcFile: {
        formData : {},
        local: {
          name : "file",
          fields : {
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC명",
            userip : "PC IP 주소",
            count : "진단건수"
          },
          insertFields: {
            EventTime : "날짜",
            ProcessName : "실행 파일명",
            ProcessImagePath : "실행 경로"
          }
        }
      },
      pcIp: {
        formData : {},
        local: {
          name : "ip",
          fields : {
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC명",
            userip : "PC IP 주소",
            count : "접근 횟수"
          },
          insertFields: {
            EventTime : "날짜",
            PathInfo1 : "악성 URL/IP",
            ProcessName : "실행 파일명",
            ProcessImagePath : "실행 경로"
          }
        }
      },
      pcRsc: {
        formData : {},
        local: {
          name : "rsc",
          fields : {
            nodeid : "센서 ID",
            username : "사용자명",
            userdept : "부서명",
            userpc : "PC명",
            userip : "PC IP 주소",
            count : "진단건수"
          },
          insertFields: {
            EventTime : "날짜",
            RuleId : "RSC 엔진 명",
            ProcessImagePath : "실행 경로",
            AdditionalInfo: "연관 파일",
            Score : "위험도"
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
    "pc-file": PcFile,
    "pc-ip": PcIp,
    "pc-rsc": PcRsc,
    "diagnosis-datatable":DiagnosisDatatable
  },
  watch: {},
  methods: {
    receive(form) {
      if (this.activeName === "first") {
        this.mixData(this.pcFile, form, "file");
      } else if (this.activeName === "second") {
        this.mixData(this.pcIp, form, "ip");
      } else if (this.activeName === "third") {
        this.mixData(this.pcRsc, form, "rsc");
      }
    },
    mixData(select, form, apiUrl){
      return select.formData = {
        url : "/api/admin/search/detect/summary/pc/" + apiUrl,
        form : form,
        order: "count"
      }
    }
  },
  beforeCreate() {},
  created() {
    this.$bus.$on("update", this.receive);
    if(this.selectData.name === "badurlippc"){
      this.activeName = "second";
    }else if(this.selectData.name === "rscpc"){
      this.activeName = "third";
    }
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
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
</style>
