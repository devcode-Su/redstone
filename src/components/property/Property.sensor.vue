<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      센서 정보
    </h1>
    <template-searchpannel :pannelType="pannelset"></template-searchpannel>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
export default {
  name: "Propertysensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        version: true,
        placeholder: "버전 번호",
        check: "sensor"
      }
    };
  },
  computed: {},
  components: {
    "template-searchpannel":TemplateSearchpannel
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
