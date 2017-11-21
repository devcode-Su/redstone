<template>
  <article>
    <h1 class="page-title">
      상세분석
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="프로세스 트리" name="process">
        프로세스 트리
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
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
  components: {},
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
