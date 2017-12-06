<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      위협 PC 기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <date-searchform></date-searchform>
        <templatetableinsert class="diagosis-pc-table" :propData="pcfile" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <date-searchform></date-searchform>
        <templatetableinsert class="diagosis-pc-table" :propData="pcip" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <date-searchform></date-searchform>
        <templatetableinsert class="diagosis-pc-table" :propData="pcrsc" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import DateSearchform from "../form/Date.search.form";
import Templatetableinsert from "../template/Template.tableinsert.vue";
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
      pcfile: {
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
        ],
        search: [],
        url: "",
        data: [],
        order: "count"
      },
      pcip: {
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
        ],
        search: [],
        url: "",
        data: [],
        order: "count"
      },
      pcrsc: {
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
    "templatetableinsert":Templatetableinsert
  },
  watch: {},
  methods: {
    receiveData(form) {
      console.log(form);
      if (this.activeName === "first") {
        this.mixData(this.pcfile, form, "file");
      } else if (this.activeName === "second") {
        this.mixData(this.pcip, form, "ip");
      } else if (this.activeName === "third") {
        this.mixData(this.pcrsc, form, "rsc");
      }
    },
    mixData(local, receive, apiurl) {
      const url = "/api/admin/search/detect/summary/pc/" + apiurl;
      let data = {
        page: 1,
        length: 50,
        startDate: receive.startDate ? receive.startDate.getTime() : null,
        endDate: receive.endDate ? receive.endDate.getTime() : null,
        dept_code: receive.dept_code,
        node_id: receive.node_id,
        order: local.order,
        direction: 1
      };
      this.$http
        .get(url, {
          params: data
        })
        .then(result => {
          local.data = result.data.data;
          console.log(data);
        });
      local.search = data;
      local.url = url;
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
