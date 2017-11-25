<template>
  <article>
    <h1 class="page-title">
      매체접근
    </h1>
    <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
    <templatetablerouter class="security-media-table" :propData="search"></templatetablerouter>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetablerouter from "../template/Template.tablerouter.vue";
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
        check: "single"
      },
      search: {
        field: [
          "",
          "장착시간",
          "탈착시간",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC IP 주소",
          "종류",
          "연결방식",
          "진단개수",
          "종류",
          "연결방식",
          "경로",
          "장치명",
          "용량",
          "발생이벤트"
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
      const url = "/api/admin/volume/TYPE/CODE";
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
