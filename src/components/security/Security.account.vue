<template>
  <article>
    <h1 class="page-title">
      사용자 계정
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="계정비밀번호" name="first">
        <template-searchpannel :pannelType="pannelaccount" @searchData="searchPass"></template-searchpannel>
        <templatetablerouter :field="pass.field" :tableData="pass.data"></templatetablerouter>
      </el-tab-pane>
      <el-tab-pane label="화면보호기" name="second">
        <template-searchpannel :pannelType="pannelmonitor"  @searchData="searchMonitor"></template-searchpannel>
        <templatetablerouter :field="monitor.field":tableData="monitor.data"></templatetablerouter>
      </el-tab-pane>
    </el-tabs>

  </article>
</template>
<script>
  import TemplateSearchpannel from "../template/Template.searchpannel";
  import Templatetablerouter from "../template/Template.tablerouter.vue"
  export default {
    name: "Securitymedia",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        activeName: "first",
        pannelaccount: {
          datelast: true
        },
        pannelmonitor: {
          check: "oneline"
        },
        pass:{
          field:[
            "","센서 ID", "부서명", "사용자명","IP 주소","윈도우 계정","최종 변경일시"
          ],
          data:[]
        },
        monitor:{
          field:[
            "", "센서 ID", "부서명","사용자명", "IP 주소","윈도우 계정","종류","최근 변경일시"
          ],
          data:[]
        },
      };
    },
    computed: {},
    components: {
      TemplateSearchpannel,
      Templatetablerouter
    },
    watch: {},
    methods: {
      searchPass(form) {
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
            this.pass.data = result.data.data;
          });
        }
      },
      searchMonitor(form) {
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
            this.monitor.data = result.data.data;
          });
        }
      },
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
