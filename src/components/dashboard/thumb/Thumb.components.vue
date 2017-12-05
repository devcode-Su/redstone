<template>
  <section data-thumbcomp="thumb">
    <h1 data-thumbcomp="title">
      {{propData.title}}
    </h1>
    <dashboard-periodbtn v-if="propData.button_type === '1'" :categorize="categorize" @periodClick.self="periodNumber"></dashboard-periodbtn>
    <template-datatable-select  v-if="propData.button_type === '1'"  :fields="propData.column" :prop-data="compData" :prop-index="selectNum"></template-datatable-select>
    <template-datatable v-else :fields="propData.column" :prop-data="compData"></template-datatable>
    <button data-icon class="more-link">
      More
      <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button data-icon class="remove" @click.stop="itemRemove(index)">
      <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>
  import Constant from "@/constant";
  import DashboardPeriodbtn from "../Dashboard.period.btn.vue";
  import TemplateDatatable from "../../template/Template.datatable";
  import TemplateDatatableSelect from "../../template/Template.datatable.select";
  export default {
    name: "ThumbComponent",
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
      selectNum() {
        return this.btnNum
      }
    },
    components: {
      DashboardPeriodbtn,
      TemplateDatatable,
      TemplateDatatableSelect
    },
    watch: {},
    methods: {
      periodNumber(periodNum) {
        //console.log(btnNum);
        this.btnNum = periodNum;
        //console.log(this.btnNum);
        //console.log(this.compData)
      },
      itemRemove(comNum) {
        this.$store.dispatch(Constant.DELETE_THUMBLIST, { index: comNum });
      }
    },
    beforeCreate() {},
    created() {
      const url = "/dashboard/?method=get&resource="+this.propData.resource;
      this.$http.get(url).then(response => {
        //console.log(response);
        this.compData = response.data;
      });
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
      //console.log(this.selectNum);
    },
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
