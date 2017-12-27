<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[25, 50, 100, 200]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
  </el-pagination>
</template>
<script>
export default {
  name: "Templatepaginations",
  extends: {},
  props: {
    paging: {
      type: Array | Object
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize : 50,
      total : 1
    };
  },
  computed: {},
  components: {},
  watch: {
    paging(p){
      if(p){
        console.log(p);
        this.currentPage = p.current_page;
        this.pageSize = p.pageSize;
        this.total = p.total;
        return p;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      //console.log(val);
      //console.log(`${val} items per page`);
      this.pageSize = val;
      this.$emit("pageLength", {
        'length' : val
      });
    },
    handleCurrentChange(val) {
      //console.log(`current page: ${val}`);
      this.$emit("pageLength", {
        'current_page' : val
      });
    }
  },
  beforeCreate() {},
  created() {
    //EventBus.$on("processtree", this.receiveBus)
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
  .el-pagination{
    display:flex;
    justify-content: flex-end;
  }
</style>
