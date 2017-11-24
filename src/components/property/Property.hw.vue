<template>
  <article>
    <h1 class="page-title">
      HW 정보
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="CPU" name="first">
        CPU content
      </el-tab-pane>
      <el-tab-pane label="Memory" name="second">
        Memory content
      </el-tab-pane>
      <el-tab-pane label="HDD" name="third">
        HDD content
      </el-tab-pane>
      <el-tab-pane label="Display" name="four">
        Display content
      </el-tab-pane>
      <el-tab-pane label="Bios" name="five">
        Bios content
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import TemplateSearchpannel from "../template/Template.searchpannel";
  import Templatetablerouter from "../template/Template.tablerouter.vue";
export default {
  name: "Propertyhw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetablerouter
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
