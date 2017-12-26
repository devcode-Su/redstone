<template>
  <div class="sign-form">
    <p class="notice">
      비밀번호 유효기간이 만료되었습니다.<br>
      비밀번호를 다시 설정해주세요.
    </p>
    <form @submit.prevent="signCheck">
      <div class="input-area">
        <md-input-container>
          <label>User ID</label>
          <md-input ref="username" type="text" v-model="form.id" disabled></md-input>
        </md-input-container>
        <md-input-container md-clearable :class="{ 'md-input-invalid':isPassRequired }">
          <label>Passwrod</label>
          <md-input ref="password" type="password" placeholder="새로운 비밀번호" v-model="passWord"></md-input>
          <span class="md-error">{{passwordErrorMsg}}</span>
        </md-input-container>
      </div>
      <div class="btn-area">
        <el-button v-if="isLoading" type="primary" :loading="true">Loading</el-button>
        <md-button v-else :disabled="submitBtn" type="submit" class="md-raised md-primary">확인
        </md-button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
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
        isPassRequired: false,
        isLoading: false,
        submitBtn: false,
        passWord: "",
        showModal: false,
        form : {}
      };
    },
    watch: {
      userInfo(u){
        if(u){
          console.log(u)
        }
      }
    },
    computed: {
      ...mapGetters({ userInfo: "userInfo" }),
    },
    methods: {
      signCheck() {
        const url = "/api/admin";
        let username = this.userName;
        let password = this.passWord;

        // 'key=value; expires=current dateTime in UTC; path=/'

        this.isLoading = true;
        this.submitBtn = true;

        this.form.passwd = this.passWord;
        console.log(this.form);

        this.checkInputEmpty(username, password);

        this.$http.put(url, this.form).then( () => {
          this.$emit("change");
        });
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
      },
      passChange(val){
        console.log(val)
      }
    },
    created(){
      console.log(this.userInfo)
      this.form = this.userInfo
    },
    mounted() {

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
    .notice{
      font-size:14px;
    }
  }
</style>
