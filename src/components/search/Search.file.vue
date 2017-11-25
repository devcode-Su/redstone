<template>
  <article>
    <h1 class="page-title">
      파일 검색
    </h1>
    <template-searchpannel :pannelType="pannelset" @searchData="receiveData">></template-searchpannel>
    <templatetablerouter :propData="search"></templatetablerouter>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetablerouter from "../template/Template.tablerouter.vue";
export default {
  name: "Searchfile",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        datetime: true,
        text: true,
        placeholder: "text input...",
        agreement: true
      },
      search: {
        field: [
          "",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "IP",
          "파일명",
          "해시값",
          "경로명",
          "검출시간"
        ],
        data: [],
        search: [],
        url: ""
      }
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetablerouter
  },
  watch: {},
  methods: {
    receiveData(form) {
      console.log("file");
      const url = "/api/admin/search/file";
      if (form.datetime === "" || form.text === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
        console.log("aaa");
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: form.datetime[0].getTime(),
          endDate: form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order: "insertTime",
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          this.file.data = result.data.data;
        });
        this.file.search = data;
        this.file.url = url;
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
