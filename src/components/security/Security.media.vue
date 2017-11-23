<template>
  <article>
    <h1 class="page-title">
      매체접근
    </h1>
    <template-searchpannel :pannelType="pannelset" @searchData="searchFile"></template-searchpannel>
    <templatetablerouter class="security-media-table" :field="media.field" :tableData="tableData"></templatetablerouter>
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
      pannelset: {
        datetime: true,
        check:'single'
      },
      media:{
        field:[
          "", "장착시간", "탈착시간","센서 ID", "사용자명","부서명", "PC IP 주소","종류","연결방식", "진단개수","종류","연결방식","경로","장치명","용량","발생이벤트"
        ]
      },
      tableData:[]
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetablerouter
  },
  watch: {},
  methods: {
    searchFile(form) {
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
          this.tableData = result.data.data;
          console.log(this.tableData)
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
