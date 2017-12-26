<template>
  <header data-layout="Header">
    <div class="header-logo-wrap">
      <img src="../../assets/redstone.png" alt="Redstone" @click="dashboard">
      <slot></slot>
    </div>
    <div class="header-nav-wrap">
      <div>
        <button class="user-info" @click="showForm = true">{{username}}</button>
        <user-info v-if="showForm" @close="showForm = false"></user-info>
      </div>
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
  import Constant from "@/constant";
  import UserInfo from "../form/User.info.form";
export default {
  name: "RedHeader",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    username: String
  },
  data() {
    return {
      showForm : false
    };
  },
  computed: {},
  components: {
    "user-info" :UserInfo
  },
  watch: {},
  methods: {
    dashboard() {
      this.$router.push({path: "Dashboard"});
    },
    fullScreen() {
      const element = document.documentElement;
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
      const apiURL = "/api/admin/logout";
      this.$http.get(apiURL).then(() => {
        this.$store.dispatch(Constant.LOADING_STATE, true);
        this.$router.replace("/");
      })
      .catch(() => {
        this.$store.dispatch(Constant.LOADING_STATE, true);
        this.$router.replace("/");
      });
      //
      //this.$router.go(this.$router.currentRoute);
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
//noinspection CssUnknownTarget
@import "~styles/variables";

header {
  .header-logo-wrap {
    padding-left: 60px;
    > img {
      cursor: pointer;
    }
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
    .user-info{
      width:auto;
      font-size:14px;
    }
  }
  .group-toggle {
    position: absolute;
    top: 0;
    left: 0;
    z-index:51;
    width: 45px;
    height: 48px;
    background-color: color(default);
    border-radius: 0;
  }
}
</style>
