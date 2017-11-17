<template>
  <div class="sign-form">
    <form @submit.prevent="signCheck">
      <div class="input-area">
        <md-input-container md-clearable :class="{ 'md-input-invalid':isIdRequired }">
          <label for="username">User ID</label>
          <md-input ref="username" type="text" v-model="userName"></md-input>
          <span class="md-error">{{idErrorMsg}}</span>
        </md-input-container>
        <md-input-container md-clearable :class="{ 'md-input-invalid':isPassRequired }">
          <label>Passwrod</label>
          <md-input ref="password" type="password" v-model="passWord"></md-input>
          <span class="md-error">{{passwordErrorMsg}}</span>
        </md-input-container>
      </div>
      <div class="btn-area">
        <md-checkbox id="remember-me" name="remember-me" v-model="rememberMe" class="md-primary">Remmeber Me</md-checkbox>
        <div>
          <md-button :disabled="submitBtn" type="submit" class="md-raised md-primary">
            <span v-if="isLoading">Loading...</span>
            <span v-else>sign</span>
          </md-button>
        </div>
      </div>
      <span class="sign-failed-msg" v-if="signFailedMsg">{{signFailedMsg}}</span>
    </form>
  </div>
</template>

<script>
export default {
  name: "sign",
  props: {
    idErrorMsg: {
      type: String
    },
    signFailedMsg: {
      type: String
    },
    passwordErrorMsg: {
      type: String
    }
  },
  data() {
    return {
      isIdRequired: false,
      isPassRequired: false,
      isLoading: false,
      submitBtn: false,
      rememberMe: false,
      userName: "",
      passWord: "",
      showModal: false
    };
  },
  watch: {
    signFailedMsg() {
      if (this.signFailedMsg !== "") {
        this.isLoading = false;
        this.submitBtn = false;
      }
    }
  },
  components: {},
  methods: {
    signCheck() {
      console.log(this.signFailedMsg)
      console.log(this.isLoading)
      let username = this.userName;
      let password = this.passWord;


      // 'key=value; expires=current dateTime in UTC; path=/'
      if (this.rememberMe) {
        let d = new Date();
        d.setTime(d.getTime() + 180 * 24 * 60 * 60 * 1000); //
        document.cookie =
          "username=" + username + ";expires=" + d.toUTCString() + ";path=/";
        document.cookie =
          "password=" + password + ";expires=" + d.toUTCString() + ";path=/";
        //console.log('We just set the cookies: ' + document.cookie)
      } else {
        document.cookie =
          "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //console.log('We just deleted the cookies: ' + document.cookie)
      }

      this.isLoading = true;
      this.submitBtn = true;

      this.$emit("signCrendentials", {
        username: username,
        password: password
      });

      this.checkInputEmpty(username, password);
    },
    checkInputEmpty(u, p) {
      if (u === "" || p === "") {
        this.isLoading = false;
        this.submitBtn = false;
        if (u === "" && p === "") {
          this.isIdRequired = true;
          this.isPassRequired = true;
        } else if (u === "") {
          this.isIdRequired = true;
          this.isPassRequired = false;
        } else if (p === "") {
          this.isIdRequired = false;
          this.isPassRequired = true;
        }
      } else {
        this.isIdRequired = false;
        this.isPassRequired = false;
      }
    }
  },
  mounted() {
    let username = document.cookie.match(
      "(^|;)\\s*" + "username" + "\\s*=\\s*([^;]+)"
    );
    let password = document.cookie.match(
      "(^|;)\\s*" + "password" + "\\s*=\\s*([^;]+)"
    );

    this.userName = username ? username.pop() : "";
    this.passWord = password ? password.pop() : "";
    if (username) this.submitBtn = false;
    //console.log('We just check to see if there were cookies: ' + document.cookie)
  }
};
</script>

<style lang="scss" scoped>
@import "~styles/variables";

.sign-form {
  width: 320px;
  padding: 5px;
  position:relative;
  .md-input-invalid {
    &:after {
      background-color: color(highlight-color);
    }
    label,
    .md-error {
      color: color(highlight-color);
    }
  }
  .btn-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sign-failed-msg{
    position:absolute;
    bottom:50px;
    font-size:16px;
    font-weight:bold;
    color:color(highlight-color)
  }
}
</style>
