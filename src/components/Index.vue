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
//      const userCheck = a => a.id === input.id;
//      const userValid = this.posts.filter(userCheck);
      this.crendentialFail = "";
       console.log(input);
       if (input.id !== "" && input.passwd.length !== "") {
         console.log("ok?");
         const apiURL = "/api/admin/login";
         this.$http
           .post(apiURL, input)
           .then(() => {
             this.$router.push("Redstone");
           })
           .catch(() => {
             this.errorNotice();
           });
       } else {
         console.log("???");
       }

//      console.log(input)
//
//      if (userValid.length !== 0) {
//        if (input.passwd === userValid[0].pass) {
//          //userValid
//          //console.log("login success");
//          this.$router.push("Redstone");
//        } else {
//          //console.log("password error");
//          if (input.passwd !== "") this.errorNotice();
//        }
//      } else {
//        //console.log("who are you?");
//        if (input.username !== "" && input.passwd !== "") {
//          //console.log("둘다 글자가 있음");
//          this.errorNotice();
//        }
//      }
    },
    errorNotice() {
      setTimeout(() => {
        this.crendentialFail = "Bad ID or Password";
      }, 1000);
    }
  },
  beforeCreate() {},
  created() {
    const apiURL = "./static/data/userdata.json"; // /static 폴더가 아니면 404
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
