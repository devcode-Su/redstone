<template>
  <div class="sign-form">
    <form @submit.prevent="signCheck">
      <div class="input-area">
        <md-input-container md-clearable :class="{ 'md-input-invalid':isIdRequired }">
          <label>User ID</label>
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
        <el-button v-if="isLoading" type="primary" :loading="true">Loading</el-button>
        <md-button v-else :disabled="submitBtn" type="submit" class="md-raised md-primary">Sign
        </md-button>

        <span class="sign-failed-msg" v-if="signFailedMsg">{{signFailedMsg}}</span>
      </div>
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
          id: username,
          passwd: password
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
    margin-top:50px;
    width: 420px;
    padding: 5px;
    position: relative;
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
      justify-content: flex-end;
      posiiton: relative;
      .el-button{
        margin: 6px 8px;
        height:36px;
        background-color:#000;
        border-color:#000;
        border-radius:2px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
      }
    }
    .sign-failed-msg {
      position: absolute;
      left: 0;
      font-size: 16px;
      font-weight: bold;
      color: color(highlight-color);
    }
  }
</style>
