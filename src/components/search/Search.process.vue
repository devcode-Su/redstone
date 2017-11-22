<template>
  <article>
    <h1 class="page-title">
      프로세스 검색
    </h1>
    <template-searchpannel :pannelType="pannelset"></template-searchpannel>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
export default {
  name: "Searchprocess",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        datetime: true,
        check: "double",
        text: true,
        placeholder: "text input...",
        agreement: true
      }
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel
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
