<template>
  <section data-index="index">
    <loading v-if="isLoading"></loading>
    <img src="../assets/logo.png">
    <signin-form v-if="status" idErrorMsg="아이디를 입력하세요." passwordErrorMsg="비밀번호를 입력하세요." :signFailedMsg="crendentialFail" @signCrendentials="signAttempt">
    </signin-form>
    <sign-pass v-else @change="status = true"></sign-pass>
  </section>
</template>
<script>
import Constant from "@/constant";
import Loading from "./template/Loading";
import SigninForm from "./form/Signin.form";
import SignPass from "./form/Sign.pass.form"

export default {
  name: "AppIndex",

  data() {
    return {
      status : true,
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
    "signin-form":SigninForm,
    "sign-pass":SignPass
  },
  methods: {
    signAttempt(input) {
      this.crendentialFail = "";
      if (input.id !== "" && input.passwd.length !== "") {
        const apiURL = "/api/admin/login";
        this.$http
          .post(apiURL, input)
          .then(response => {
            console.log(response);
            if(response.data.status === 2){
              console.log("change");
              this.$store.commit(Constant.USER_INFO, response.data);
              this.status = false;
            }else{
              this.$router.push("Redstone");
            }
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
