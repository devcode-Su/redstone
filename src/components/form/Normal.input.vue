<template>
  <div data-form-item>
    <label>검색 조건</label>
    <div data-form-tag>
      <el-input type="text" v-model="q" placeholder="" @change="onInput" size="small">
      </el-input>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NormalInput",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        q: "",
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      onInput(v) {
        this.$emit("replace", {
          q: this.q
        });
        //console.log(v);
      }
    },
    beforeCreate() {},
    created() {},
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
  .el-checkbox{
    margin-left:10px;
  }
</style>
