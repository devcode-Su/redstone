<template>
  <el-form-item label="검색 조건" size="small">
    <span v-if="label">
      {{label}}
    </span>
    <el-input type="text" v-model="form.text" :laceholder="placeholder">
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  name: "Searchinput",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    label: String
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
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
