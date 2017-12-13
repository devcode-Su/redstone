<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      네트워크 환경설정
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="내부 IP 대역 설정" name="first">
        <enviroment-template :prop-data="internal"></enviroment-template>
      </el-tab-pane>
      <el-tab-pane label="주요 IP 대역 설정" name="second">
        <enviroment-template :prop-data="major"></enviroment-template>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import EnviromentTemplate from "./Setup.enviroment.template";
export default {
  name: "Systemenviroment",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "first",
      data : [],
      internal :{
        inputTitle : "내부 IP 대역 추가",
        viewTitle : "내부 IP 대역 목록",
        api : "internal",
        select : false
      },
      major :{
        inputTitle : "내부 IP 대역 추가",
        viewTitle : "내부 IP 대역 목록",
        api : "major",
        select: true
      }
    };
  },
  computed: {},
  components: {
    "enviroment-template":EnviromentTemplate
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {
    this.data = this.internal;
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    // if(this.activeName === "first"){
    //   this.data = this.internal;
    // }else{
    //   this.data = this.major;
    // }
  },
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
