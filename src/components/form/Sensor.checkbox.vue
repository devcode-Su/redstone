<template>
  <el-form-item class="none-label" size="small">
    <el-checkbox v-model="checked">일주일 이상 미로그인 센서
    </el-checkbox>
  </el-form-item>
</template>
<script>
export default {
  name: "LoginCheck",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
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
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
