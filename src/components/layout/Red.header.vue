<template>
  <header>
    <div class="header-logo-wrap">
      <img src="../../assets/redstone.png" alt="Redstone">
      <slot></slot>
    </div>
    <div class="header-nav-wrap">
      <p>사용자</p>
      <button class="icon-btn">
        <i class="fa fa-question-circle default" aria-hidden="true"></i>
      </button>
      <button class="icon-btn" @click="fullScreen">
        <i class="fa fa-arrows-alt default" aria-hidden="true"></i>
      </button>
      <button class="icon-btn" @click="signOut">
        <i class="fa fa-sign-out default" aria-hidden="true"></i>
      </button>
    </div>
  </header>
</template>
<script>
export default {
  name: "RedHeader",
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
  methods: {
    fullScreen() {
      const element = document.documentElement;
      //document.documentElement.webkitRequestFullscreen();
      if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE
      }
    },
    signOut() {
      this.$router.replace("/");
      //this.$router.go(this.$router.currentRoute);
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

header {
  .header-logo-wrap {
    padding-left: 60px;
  }
  .header-nav-wrap {
    display: flex;
    align-items: center;
    p {
      margin: 0 5px;
      font-size: 16px;
      color: color(default);
    }
    button {
      width: 28px;
      height: 28px;
      margin: 0 5px;
      padding: 0;
    }
  }
  .group-toggle {
    width: 45px;
    height: 48px;
    position:absolute;
    top: 0;
    left: 0;
    background-color: color(default);
  }
}
</style>
