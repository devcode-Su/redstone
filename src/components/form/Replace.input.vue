<template>
  <el-form-item data-input label="검색 조건" size="small">
    <el-input type="text" v-model="q" placeholder="" @change="onInput">
    </el-input>
    <el-checkbox v-model="partial_match">
      부분 일치
    </el-checkbox>
  </el-form-item>
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
      partial_match:false
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    onInput(v) {
      console.log(v);
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    this.$emit("replace", {
      q : this.q,
      partial_match : this.partial_match
    })
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
