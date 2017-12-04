<template>
  <el-form-item label="검색 조건" size="small">
    <el-input type="text" v-model="input" placeholder="" @change="onInput">
    </el-input>
    <el-checkbox class="agreement" v-model="checked">
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
      input: "",
      checked:false
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
