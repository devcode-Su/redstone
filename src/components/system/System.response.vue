<template>
  <article>
    <h1 class="page-title">
      대응
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="파일 차단 리스트" name="file">
        <response-template :addList="true"></response-template>
      </el-tab-pane>
      <el-tab-pane label="네트워크 차단 리스트" name="network">
        <response-template></response-template>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import ResponseTemplate from "./System.response.template";
export default {
  name: "Systemrespones",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "file"
    };
  },
  computed: {},
  components: {
    ResponseTemplate
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
