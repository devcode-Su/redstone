<template>
  <article>
    <h1 class="page-title">
      SW 정보
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="운영체제" name="os">
        운영체제 content
      </el-tab-pane>
      <el-tab-pane label="브라우저" name="browser">
        브라우저 content
      </el-tab-pane>
      <el-tab-pane label="소프트웨어" name="sw">
        소프트웨어 content
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
export default {
  name: "Propertysw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "os"
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
