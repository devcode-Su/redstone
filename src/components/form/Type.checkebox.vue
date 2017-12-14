<template>
  <el-form-item label="검색 항목" size="small">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">
      전체
    </el-checkbox>
    <el-checkbox-group v-model="checked">
      <el-checkbox v-for="search in searchs" :label="search" :key="search">{{search}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>
<script>
export default {
  name: "TypeCheckbox",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      searchs: ["이동식 디스크", "외장 디스크", "CD-ROM"],
      checkAll: false,
      isIndeterminate: true,
      checked: []
    };
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
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
