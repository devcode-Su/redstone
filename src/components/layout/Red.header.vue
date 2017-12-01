<template>
  <header data-layout="Header">
    <div class="header-logo-wrap">
      <img src="../../assets/redstone.png" alt="Redstone">
      <slot></slot>
    </div>
    <div class="header-nav-wrap">
      <p>{{username}}</p>
      <button data-icon v-if="false">
        <i class="fa fa-question-circle fa-24" aria-hidden="true"></i>
      </button>
      <button data-icon @click="fullScreen">
        <i class="fa fa-arrows-alt fa-24" aria-hidden="true"></i>
      </button>
      <button data-icon @click="signOut">
        <i class="fa fa-sign-out fa-24" aria-hidden="true"></i>
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
    username: String
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
      //const apiURL = "/api/admin/login";
      //this.$http.get(apiURL);
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
    position: absolute;
    top: 0;
    left: 0;
    background-color: color(default);
  }
}
</style>
