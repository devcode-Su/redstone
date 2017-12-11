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
        <diagnosis-datatable :form-data="pcFile.formData" :local-data="pcFile.local"></diagnosis-datatable>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-datatable :form-data="pcFile.formData" :local-data="pcFile.local"></diagnosis-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import DateSearchform from "../form/Date.search.form";
import DiagnosisDatatable from "./Diagnosis.info.datatable";
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
        },
        field: ["센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수", ""],
        innerField: [
          "날짜",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "IP 주소",
          "실행 파일명",
          "실행 경로"
        ],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ]
      },
      pcIp: {
        field: ["센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "접근 횟수", ""],
        innerField: [
          "날짜",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "IP 주소",
          "실행 파일명",
          "실행 경로"
        ],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ]
      },
      pcRsc: {
        field: ["센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수", ""],
        innerField: [
          "날짜",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "PC IP 주소",
          "실행 경로",
          "연관 파일"
        ],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ]
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
