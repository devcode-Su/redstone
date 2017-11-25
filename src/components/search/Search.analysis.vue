<template>
  <article>
    <h1 class="page-title">
      상세분석
    </h1>
    <propertypannel></propertypannel>
    <el-tabs v-model="activeName">
      <el-tab-pane label="프로세스 트리" name="process">
        <processtree></processtree>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import Propertypannel from "../template/Template.propertypannel.vue";
  import Processtree from "./Search.process.tree.vue";
export default {
  name: "Searchanalysis",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "process"
    };
  },
  computed: {},
  components: {
    Propertypannel,
    Processtree
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
