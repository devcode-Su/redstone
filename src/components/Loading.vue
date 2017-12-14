<template>
  <div id="isLoading">
    <span class="symbol">
      <img src="../assets/symbol.png" alt="Redstone">
    </span>
  </div>
</template>
<script>
export default {
  name: "Loading",
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
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
@keyframes loading {
  // 0% {
  //   transform: rotate(0deg) scale(0.8);
  // }
  // 25% {
  //   transform: rotate(270deg) scale(0.3);
  // }
  // 50% {
  //   transform: rotate(720deg) scale(1.3);
  // }
  // 75% {
  //   transform: rotate(540deg) scale(0.6);
  // }
  100% {
    transform: rotate(3600deg);
  }
}
#isLoading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  .symbol {
    animation: loading 3s cubic-bezier(0.41, 0.77, 0.66, -1.41) infinite;
  }
}
</style>
