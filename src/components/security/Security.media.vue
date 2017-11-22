<template>
  <article>
    <h1 class="page-title">
      매체접근
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="계정비밀번호" name="first">
        <template-searchpannel :pannelType="pannelaccount"></template-searchpannel>
      </el-tab-pane>
      <el-tab-pane label="화면보호기" name="second">
        <template-searchpannel :pannelType="pannelmonitor"></template-searchpannel>
      </el-tab-pane>
    </el-tabs>

  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
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
      }
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel
  },
  watch: {},
  methods: {},
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
