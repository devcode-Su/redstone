<template>
  <el-form-item label="검색 조건" size="small">
    <span>
      {{label}}
    </span>
    <el-input type="text" v-model="input" :laceholder="label+'을 입력하세요.'" @change="onInput">
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  name: "Input",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    label: String
  },
  data() {
    return {
      input: ""
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
