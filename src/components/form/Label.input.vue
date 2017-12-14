<template>
  <div data-form-item>
    <label>검색 조건</label>
    <div data-form-tag>
      <span>
      {{label}}
    </span>
      <el-input type="text" v-model="q" :placeholder="label+'을 입력하세요.'" @change="onInput" size="small">
      </el-input>
    </div>
  </div>
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
      q: ""
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
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
