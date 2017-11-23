<template>
  <article>
    <h1 class="page-title">
      위협PC기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <template-searchpannel :pannelType="pannelset" @searchData="searchFile"></template-searchpannel>
        <templatetableinsert :field="pcfile.field" :tableData="fileData"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <template-searchpannel :pannelType="pannelset" @searchData="searchUrl"></template-searchpannel>
        <templatetableinsert :field="pcurl.field" :tableData="urlData"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <template-searchpannel :pannelType="pannelset" @searchData="searchRsc"></template-searchpannel>
        <templatetableinsert :field="pcrsc.field" :tableData="rscData"></templatetableinsert>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetableinsert from "../template/Template.tableinsert.vue"
export default {
  name: "Diagnosispc",
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
      pcfile:{
        field:[
          "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수"
        ]
      },
      pcurl:{
        field:[
          "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "접근 횟수"
        ]
      },
      pcrsc:{
        field:[
          "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수"
        ]
      },
      fileData:[],
      urlData:[],
      rscData:[]
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetableinsert
  },
  watch: {},
  methods: {
    searchFile(form) {
      console.log(this.activeName);
      const url = "/api/admin/search/detect/summary/pc/file";
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
      const url = "/api/admin/search/detect/summary/pc/ip";
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
      const url = "/api/admin/search/detect/summary/pc/rsc";
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
