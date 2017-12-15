<template>
  <section data-thumbcomp="thumb">
    <h1 data-thumbcomp="title">
      {{propData.title}}
    </h1>
    <dashboard-periodbtn v-if="propData.button_type === '1'" :categorize="categorize" @periodClick.self="periodNumber"></dashboard-periodbtn>
    <thumb-datatable-select v-if="propData.button_type === '1'" :fields="propData.column" :prop-data="compData" :prop-index="selectNum" @rowRouter="rowRouter"></thumb-datatable-select>
    <thumb-datatable v-else :fields="propData.column" :prop-data="compData" @rowRouter="rowRouter2"></thumb-datatable>
     <button data-icon class="more-link" @click.stop="link">
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
import ThumbDatatable from "./Thumb.datatable";
import ThumbDatatableSelect from "./Thumb.datatable.select";
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
      return this.btnNum;
    },
  },
  components: {
    "dashboard-periodbtn":DashboardPeriodbtn,
    "thumb-datatable":ThumbDatatable,
    "thumb-datatable-select":ThumbDatatableSelect
  },
  watch: {},
  methods: {
    periodNumber(periodNum) {
      this.btnNum = periodNum;
    },
    link(){
      this.$store.commit(Constant.DASHBOARD_DATA, {
        name : this.propData.resource,
        num : this.btnNum + 1
      });
      this.$router.push(this.propData.link);
    },
    rowRouter(data){
      this.$store.commit(Constant.DASHBOARD_DATA, {
        name : this.propData.resource,
        num : this.btnNum + 1,
        rowNum : data.rowNum
      });
      this.$router.push(this.propData.link);
    },
    rowRouter2(data){

    },
    itemRemove(comNum) {
      console.log(comNum)
      // this.$store.dispatch(Constant.DELETE_THUMBLIST, { index: comNum });
      // const getHide =
      //   "/dashboard/?method=set&resource=config&from=&to=&name=hidelist&time=";
      // const getView =
      //   "/dashboard/?method=set&resource=config&from=&to=&name=viewlist&time=";
      //
      // this.$http.post(getHide, JSON.stringify(this.hideList));
      // this.$http.post(getView, JSON.stringify(this.viewList));
      // this.$bus.$emit("thumb-data");
    }
  },
  beforeCreate() {},
  created() {
    const url = "/dashboard/?method=get&resource=" + this.propData.resource;
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
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
