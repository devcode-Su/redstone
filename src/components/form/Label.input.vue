<template>
  <el-form-item label="검색 조건" size="small">
    <span>
      {{label}}
    </span>
    <el-input type="text" v-model="input" :placeholder="label+'을 입력하세요.'" @change="onInput">
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  name: "LabelInput",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      label: "프로그램명",
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
