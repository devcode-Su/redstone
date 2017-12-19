<template>
  <div class="dashboard-period-btn">
    <el-button v-for="(sort, i) in categorize" :key="sort.id" size="small" @click="btnClick(i)" :class="{selected : i === idx}">{{sort}}</el-button>
  </div>
</template>
<script>
  export default {
    name: "DashboardPeriodbtn",
    extends: {},
    props: {
      categorize: {
        type: Array
      }
    },
    data() {
      return {
        idx: 0
      };
    },
    components: {

    },
    methods: {
      btnClick(index) {
        if (this.idx !== index) {
          this.$emit("periodClick", index);
          this.idx = index;
        }
      }
    },
    mounted() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .el-button {
    height: 24px;
    padding: 0 10px;
    &.selected{
      color:#409eff;
      background-color:#ecf5ff;
      border-color:#c6e2ff;
      span{
        color:#409eff;
      }
    }
  }
</style>
