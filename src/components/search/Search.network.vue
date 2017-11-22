<template>
  <article>
    <h1 class="page-title">
      네트워크 검색
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="네트워크 기반 검색" name="network">
        <template-searchpannel :pannelType="pannelnet"></template-searchpannel>
      </el-tab-pane>
      <el-tab-pane label="PC 기반 검색" name="admin">
        <template-searchpannel :pannelType="pannelpc"></template-searchpannel>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
export default {
  name: "Searchnetwork",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "network",
      pannelnet: {
        datetime: true,
        check: "multi",
        text: true,
        placeholder: "URL/IP",
        detail: true
      },
      pannelpc: {
        datetime: true,
        check: "multi",
        text: true,
        placeholder: "URL/IP"
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
