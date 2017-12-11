<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-info-datatable :form-data="infoFile.formData" :local-data="infoFile.local"></diagnosis-info-datatable>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-info-datatable :form-data="infoIp.formData" :local-data="infoIp.local"></diagnosis-info-datatable>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-info-datatable :form-data="infoRsc.formData" :local-data="infoRsc.local"></diagnosis-info-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import DateSearchform from "../form/Date.search.form";
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
  computed: {},
  components: {
    "date-searchform":DateSearchform,
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
    },
    reorder(val) {
      //console.log(val)
      console.log(this.activeName);
      if (this.activeName === "first") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            console.log(result.data);
            this.infofile.data = result.data.data;
          });
      } else if (this.activeName === "second") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            this.infoip.data = result.data.data;
          });
      } else if (this.activeName === "third") {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            console.log(result.data);
            this.inforsc.data = result.data.data;
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
}
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
