<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      사용자 계정
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="계정비밀번호" name="first">
        <template-searchpannel :pannelType="pannelaccount" @searchData="receiveData"></template-searchpannel>
        <templatetablerouter :propData="pass"></templatetablerouter>
      </el-tab-pane>
      <el-tab-pane label="화면보호기" name="second">
        <template-searchpannel :pannelType="pannelmonitor" @searchData="receiveData"></template-searchpannel>
        <templatetablerouter :propData="monitor"></templatetablerouter>
      </el-tab-pane>
    </el-tabs>
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
      activeName: "first",
      pannelaccount: {
        datelast: true
      },
      pannelmonitor: {
        check: "oneline"
      },
      pass: {
        field: ["", "센서 ID", "부서명", "사용자명", "IP 주소", "윈도우 계정", "최종 변경일시"],
        search: [],
        url: "",
        data: [],
        order: "count"
      },
      monitor: {
        field: ["", "센서 ID", "부서명", "사용자명", "IP 주소", "윈도우 계정", "종류", "최근 변경일시"],
        search: [],
        url: "",
        data: [],
        order: "count"
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
      if (form.datetime === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
      } else {
        if (this.activeName === "first") {
          this.mixData(this.infofile, form, "file");
        } else {
          this.mixData(this.infoip, form, "ip");
        }
      }
    },
    mixData(local, receive, apiurl) {
      const url = "/api/admin/account/password/expired/TYPE/CODE";
      let data = {
        page: 1,
        length: 50,
        startDate: receive.datetime[0].getTime(),
        endDate: receive.datetime[1].getTime(),
        dept_code: receive.data.dept_code || "",
        node_id: receive.data.node_id || "",
        order: local.order,
        direction: 1
      };
      this.$http.get(url, data).then(result => {
        local.data = result.data.data;
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
            this.infofile.data = result.data.data;
          });
      } else {
        val.form.order = val.order;
        this.$http
          .get(val.url, {
            params: val.form
          })
          .then(result => {
            this.infoip.data = result.data.data;
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
