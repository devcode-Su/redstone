<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      시스템로그
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="센서 로그" name="sensor">
        센서로그
        <searchform></searchform>
      </el-tab-pane>
      <el-tab-pane label="관리자 로그" name="admin">
        관리자 로그
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import Searchform from "../form/Search.form";
  export default {
    name: "Systemlog",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        activeName: "sensor"
      };
    },
    computed: {},
    components: {
      "searchform":Searchform
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
