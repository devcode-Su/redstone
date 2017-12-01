<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      환경설정
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="내부 IP 대역 설정" name="internal">
        <enviroment-template :inputTitle="'내부 IP 대역 추가'" :viewTitle="'내부 IP 대역 목록'"></enviroment-template>
      </el-tab-pane>
      <el-tab-pane label="주요 IP 대역 설정" name="important">
        <enviroment-template :inputTitle="'주요 IP 대역 추가'" :viewTitle="'주요 IP 대역 목록'" :addList="true"></enviroment-template>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import EnviromentTemplate from "./System.enviroment.template";
export default {
  name: "Systemenviroment",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "internal"
    };
  },
  computed: {},
  components: {
    EnviromentTemplate
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
