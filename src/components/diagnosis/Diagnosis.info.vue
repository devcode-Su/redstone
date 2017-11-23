<template>
  <article>
    <h1 class="page-title">
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <template-searchpannel :pannelType="pannelset" @searchData="searchData"></template-searchpannel>
        <templatetableinsert></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <template-searchpannel :pannelType="pannelset" @searchData="searchData"></template-searchpannel>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <template-searchpannel :pannelType="pannelset" @searchData="searchData"></template-searchpannel>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetableinsert from "../template/Template.tableinsert";
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
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetableinsert,
  },
  watch: {},
  methods: {
    searchData(form) {
      const url = "/api/admin/search/detect/summary/file";
      if(form.datetime === ""){
        this.$notify.error({
          title: 'Error',
          message: '검색 조건을 입력하세요.'
        });
      }else{
        const data = {
          page:1,
          length:50,
          startDate : form.datetime[0].getTime(),
          endDate : form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order:"count",
          direction:1
        };
        this.$http.get(url, data).then(result => {
          console.log(result)
        })
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
