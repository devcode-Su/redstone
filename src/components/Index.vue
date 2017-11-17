<template>
  <section class="app-index">
    <img src="../assets/logo.png">
    <sign-in-form idErrorMsg="아이디를 입력하세요." passwordErrorMsg="비밀번호를 입력하세요." :signFailedMsg="crendentialFail" @signCrendentials="signAttempt">
    </sign-in-form>
  </section>
</template>

<script>
import SignInForm from "./sign/Sign.in.form";

export default {
  name: "AppIndex",
  components: {
    SignInForm
  },
  data() {
    return {
      posts: {},
      crendentialFail: ""
    };
  },
  methods: {
    signAttempt(input) {
      const userCheck = a => a.id === input.username;
      //const userValid = this.posts.find(userCheck);
      const userValid = this.posts.filter(userCheck);
      this.crendentialFail = ''

      if (userValid.length !== 0) {
        if (input.password === userValid[0].pass) {
          //userValid
          //console.log("sign success");
          this.$router.push("Redstone");
        } else {
          //console.log("password error");
          if (input.password !== "") this.errorNotice();
        }
      } else {
        //console.log("who are you?");
        if (input.username !== "" && input.password !== "") {
          //console.log("둘다 글자가 있음");
          console.log("ddd??")
          this.errorNotice();
        }
      }
    },
    errorNotice() {
      setTimeout(() => {
        this.crendentialFail = "Bad ID or Password";
      }, 1000);
    }
  },
  beforeCreate() {
    // if (self.name !== 'reload') {
    //   self.name = 'reload';
    //   this.$router.go(this.$router.currentRoute);
    //   window.location.reload()
    // }
    // else self.name = '';
  },
  created() {
    const apiURL = "./static/data/userdata.json";
    this.$http.get(apiURL).then(result => {
      this.posts = result.data;
    });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
