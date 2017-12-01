<template>
  <div class="dashboard-period-btn">
    <el-button v-for="(sort, i) in categorize" :key="sort.id" size="small" @click="btnClick(i)">{{sort}}</el-button>
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
    return {};
  },
  components: {
    idx: 0
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
  height: 30px;
}
</style>
