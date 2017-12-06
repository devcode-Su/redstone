<template>
  <section>
    데이터 테이블
    <datatable-option></datatable-option>
    <datatable-table></datatable-table>
  </section>
</template>
<script>
  import DatatableOption from "./Datatable.option"
  import DatatableTable from "./Datatable.table"
export default {
  name: "Datatable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    "datatable-option":DatatableOption,
    "datatable-table":DatatableTable
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
