<template>
  <article>
    <h1 class="page-title">
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <template-searchpannel :pannelType="pannelset" @searchData="searchFile"></template-searchpannel>
        <templatetableinsert class="diagosis-info-table" :field="infofile.field" :tableData="fileData"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <template-searchpannel :pannelType="pannelset" @searchData="searchUrl"></template-searchpannel>
        <templatetableinsert  class="diagosis-info-table" :field="infourl.field" :tableData="urlData"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <template-searchpannel :pannelType="pannelset" @searchData="searchRsc"></template-searchpannel>
        <templatetableinsert  class="diagosis-info-table" :field="inforsc.field" :tableData="rscData"></templatetableinsert>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetableinsert from "../template/Template.tableinsert.vue"
import Datatableinfofile from "./Diagnosis.infofile";
import Datatableinfourl from "./Diagnosis.infourl";
import Datatableinfosrc from "./Diagnosis.inforsc";
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
      infofile:{
        field:[
          "악성 파일", "진단 건수", "첫 유입일", "마지막 유입일"
        ]
      },
      infourl:{
        field:[
          "URL/IP 주소", "진단 건수", "첫 유입일", "마지막 유입일"
        ]
      },
      inforsc:{
        field:[
          "RSC 엔진 명", "진단 건수", "첫 유입일", "마지막 유입일"
        ]
      },
      fileData:[],
      urlData:[],
      rscData:[]
    };
  },
  computed: {
    tableDefault(){
      return this.tableData.length === 0 ? false : true
    }
  },
  components: {
    TemplateSearchpannel,
    Templatetableinsert,
    Datatableinfofile,
    Datatableinfourl,
    Datatableinfosrc
  },
  watch: {},
  methods: {
    searchFile(form) {
      console.log(this.activeName);
      const url = "/api/admin/search/detect/summary/file";
      if (form.datetime === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: form.datetime[0].getTime(),
          endDate: form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order: "count",
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          this.fileData = result.data.data;
        });
      }
    },
    searchUrl(form) {
      console.log(this.activeName);
      const url = "/api/admin/search/detect/summary/ip";
      if (form.datetime === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: form.datetime[0].getTime(),
          endDate: form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order: "count",
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          this.urlData = result.data.data;
        });
      }
    },
    searchRsc(form) {
      console.log(this.activeName);
      const url = "/api/admin/search/detect/summary/rsc";
      if (form.datetime === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: form.datetime[0].getTime(),
          endDate: form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order: "count",
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          this.rscData = result.data.data;
        });
      }
    }
  },
  beforeCreate() {},
  created() {
  },
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
