<template>
  <section data-thumbcomp="thumb" class="dashboard-thumb">
    <h1>
      {{propData.title}}
    </h1>
    <dashboard-periodbtn v-if="propData.btnType" :categorize="categorize" @periodClick="periodData"></dashboard-periodbtn>
    <template-datatable :table-field="propData.column" :prop-data="compData"></template-datatable>
    <button class="icon-btn icon-wrap more-link">
      More
      <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button class="icon-wrap icon-btn" @click.stop="itemRemove(index)">
      <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>
import Constant from "@/constant";
import DashboardPeriodbtn from "../Dashboard.period.btn.vue";
import TemplateDatatable from "../../template/Template.datatable.contents";
export default {
  name: "Test",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData: {
      type: Object,
      default() {
        return { message: "do not" };
      }
    },
    index: Number
  },
  data() {
    return {
      categorize: ["일일", "주간", "월간"],
      compData: [],
      btnNum: 0
    };
  },
  computed: {
    // tableData() {
    //   return this.compData.length > 1 ? this.compData.data : false;
    // }
  },
  components: {
    DashboardPeriodbtn,
    TemplateDatatable
  },
  watch: {},
  methods: {
    periodData(btnNum) {
      console.log(btnNum);
      this.btnNum = btnNum;
    },
    itemRemove(comNum) {
      this.$store.dispatch(Constant.DELETE_THUMBLIST, { index: comNum });
    }
  },
  beforeCreate() {},
  created() {
    const url = "/static/data/exippc.json";
    this.$http.get(url).then(response => {
      this.compData = response.data;
    });
  },
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
