<template>
  <article>
    <h1 class="page-title">
      위협정보기반
    </h1>
    <template-searchpannel></template-searchpannel>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      form: {
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel
  },
  watch: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
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
