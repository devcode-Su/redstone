<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="propData.data.current_page" :page-sizes="[25, 50, 100, 200, 500]" :page-size="25" layout="sizes, prev, pager, next" :total="1000">
  </el-pagination>
</template>
<script>
  export default {
    name: "Templatepaginations",
    extends: {},
    props: {
      propData:{
      type : Array | Object
      }
    },
    data() {
      return {
      };
    },
    computed: {},
    components: {
    },
    watch: {},
    methods: {
      handleSizeChange(val) {
        console.log(`${val} items per page`);
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
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
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
