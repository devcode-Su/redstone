<template>
  <div data-form-item>
    <label>검색 조건</label>
    <div data-form-tag>
    <el-input type="text" v-model="q" placeholder="" @change="onInput" size="small">
    </el-input>
    <el-checkbox v-model="partial_match" @change="onInput">
      부분 일치
    </el-checkbox>
  </div>
  </div>
</template>
<script>
export default {
  name: "ReplaceInput",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      q: "",
      partial_match: true
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    onInput(v) {
      this.$emit("replace", {
        q: this.q,
        partial_match: this.partial_match
      });
      console.log(v);
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
