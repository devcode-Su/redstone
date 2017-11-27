<template>
  <!--<md-button-toggle md-single>-->
    <!--<md-button :class="{'md-toggle' : i === 0 }" v-for="(sort, i) in categorize" :key="sort.id" @click="btnClick(i)">{{sort}}</md-button>-->
  <!--</md-button-toggle>-->
  <div>
    <el-button v-for="(sort, i) in categorize" :key="sort.id" size="small" @click="btnClick(i)">{{sort}}</el-button>
  </div>
</template>
<script>
  export default {
    name: "SortButton",
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
          this.$emit("btnSortClick", index);
          this.idx = index;
        }
      }
    },
    mounted() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .el-button{
    height:30px;
  }
</style>
