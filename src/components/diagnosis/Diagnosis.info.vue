<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <date-searchform @form="receive"></date-searchform>
        <diagnosis-datatable :form-data="formData" :local-data="localFile"></diagnosis-datatable>
        <!--<templatetableinsert class="diagosis-info-table" :propData="infofile" @reorder="reorder"></templatetableinsert>-->
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <date-searchform></date-searchform>
        <!--<templatetableinsert class="diagosis-info-table" :propData="infoip" @reorder="reorder"></templatetableinsert>-->
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <date-searchform></date-searchform>
        <!--<templatetableinsert class="diagosis-info-table" :propData="inforsc" @reorder="reorder"></templatetableinsert>-->
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import DateSearchform from "../form/Date.search.form";
import DiagnosisDatatable from "./Diagnosis.datatable";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "first",
      formData : {},
      localFile: {
        fields : {
          FileHash : "악성파일",
          count : "진단건수",
          firstSeenTime : "첫 유입일",
          lastSeenTime : "마지막 유입일"
        },
        moreData: {
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
      ip: {
        field: ["URL/IP 주소", "진단 건수", "첫 유입일", "마지막 유입일", ""],
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
        innerKey: [
          "EventTime",
          "nodeid",
          "username",
          "userdept",
          "userpc",
          "userip",
          "ProcessName",
          "ProcessImagePath"
        ],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ],
        search: [],
        url: "",
        data: [],
        order: "count"
      },
      rsc: {
        field: ["RSC 엔진 명", "진단 건수", "첫 유입일", "마지막 유입일", ""],
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
        innerKey: [
          "EventTime",
          "nodeid",
          "username",
          "userdept",
          "userpc",
          "userip",
          "ProcessName",
          "ProcessImagePath"
        ],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ],
        search: [],
        url: "",
        data: [],
        order: "count"
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
      console.log(form);
      if (this.activeName === "first") {
        this.mixData(this.file, form, "file");
      } else if (this.activeName === "second") {
        this.mixData(this.infoip, form, "ip");
      } else if (this.activeName === "third") {
        this.mixData(this.inforsc, form, "rsc");
      }
    },
    mixData(local, form, apiUrl) {
      return this.formData = {
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
