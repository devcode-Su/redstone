<template>
  <div id="spinner">
    <span class="symbol">
      <img src="../../assets/spinner.png" alt="Redstone">
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
      transform: rotate(144000deg);
    }
  }
  #spinner {
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .8);
    .symbol {
      animation: loading 10s cubic-bezier(0.600, 0, 0.735, 0.045) infinite;
    }
  }
</style>
