<template>
  <div data-search="target">
    <span v-if="form.dept_code === 1">{{searchNavi}}에서 검색</span>
    <span v-else>
      {{searchNavi}}에서 검색
      <button class="icon-btn icon-wrap" style="display:inline-block; padding:0" @click.prevent="searchArea">
        <i class="fa fa-times-circle"></i>
      </button>
    </span>
  </div>
</template>
<script>
export default {
  name: "이름 꼭 적기",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
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
