<template>
  <section data-index="index">
    <loading v-if="isLoading"></loading>
    <img src="../assets/logo.png">
    <signin-form idErrorMsg="아이디를 입력하세요." passwordErrorMsg="비밀번호를 입력하세요." :signFailedMsg="crendentialFail" @signCrendentials="signAttempt">
    </signin-form>
    <el-button style="border:1px solid" @click="test">test</el-button>
  </section>
</template>

<script>
import Constant from "@/constant";
import Loading from "./Loading";
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
      return this.$store.state.loadingState;
    }
  },
  components: {
    Loading,
    SigninForm
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
    // setTimeout(() => {
    //   console.log("created : " + new Date());
    //   this.$store.dispatch(Constant.LOADING_STATE, false);
    //   console.log(this.isLoading);
    // }, 3000);
  },
  mounted() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
