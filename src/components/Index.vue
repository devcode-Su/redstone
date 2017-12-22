<template>
  <section data-index="index">
    <loading v-if="isLoading"></loading>
    <img src="../assets/logo.png">
    <signin-form idErrorMsg="아이디를 입력하세요." passwordErrorMsg="비밀번호를 입력하세요." :signFailedMsg="crendentialFail" @signCrendentials="signAttempt">
    </signin-form>
  </section>
</template>

<script>
import Constant from "@/constant";
import Loading from "./template/Loading";
import SigninForm from "./form/Signin.form";

export default {
  name: "AppIndex",

  data() {
    return {
      posts: {},
      crendentialFail: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.load.loadingState;
    }
  },
  components: {
    "loading":Loading,
    "signin-form":SigninForm
  },
  methods: {
    signAttempt(input) {
      this.crendentialFail = "";
      if (input.id !== "" && input.passwd.length !== "") {
        const apiURL = "/api/admin/login";
        this.$http
          .post(apiURL, input)
          .then(() => {
            this.$router.push("Redstone");
          })
          .catch(() => {
            this.errorNotice();
          });
      }
    },
    errorNotice() {
      setTimeout(() => {
        this.crendentialFail = "Bad ID or Password";
      }, 1000);
    },
    test() {
      this.$store.dispatch(Constant.LOADING_STATE, false);
      //console.log(`"isLoading change" ` + payload);
      this.$router.push("Redstone");
    }
  },
  beforeCreate() {},
  created() {
    setTimeout(() => {
      console.log("created : " + new Date());
      this.$store.dispatch(Constant.LOADING_STATE, false);
      console.log(this.isLoading);
    }, 3300);
  },
  mounted() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
