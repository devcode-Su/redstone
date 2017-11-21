<template>
  <article>
    <h1 class="page-title">
      네트워크 검색
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="네트워크 기반 검색" name="network">
        네트워크 기반 검색
      </el-tab-pane>
      <el-tab-pane label="관리자 로그" name="admin">
        PC 기반 검색
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
export default {
  name: "Searchnetwork",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "network"
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
