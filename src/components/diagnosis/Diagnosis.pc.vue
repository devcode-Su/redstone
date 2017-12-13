<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협 PC 기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-datatable :form-data="pcFile.formData" :local-data="pcFile.local"></diagnosis-datatable>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-datatable :form-data="pcIp.formData" :local-data="pcIp.local"></diagnosis-datatable>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-datatable :form-data="pcRsc.formData" :local-data="pcRsc.local"></diagnosis-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import DateSearchform from "../form/Date.search.form";
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
  computed: {},
  components: {
    "date-searchform":DateSearchform,
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
    },
    reorder(val) {
      console.log(this.activeName);
      if (this.activeName === "first") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            console.log(result.data.data);
            this.pcfile.data = result.data.data;
          });
      } else if (this.activeName === "second") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            this.pcip.data = result.data.data;
          });
      } else if (this.activeName === "third") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            this.pcrsc.data = result.data.data;
          });
      }
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
</style>
