<template>
  <div class="user-info-form">
    <form @submit.prevent="submitForm(form)">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">아이디</label>
          <div data-form-tag>
            <el-input id="id" type="text" v-model="form.id" size="small" :class="{ 'is-error' : required.id}" clearable @blur="requiredCheck"></el-input>
            <span data-required-msg v-if="required.id">빈칸을 채워주세요.</span>
          </div>
        </div>
        <div data-form-item>
          <label data-form-label="required">이름</label>
          <div data-form-tag>
            <el-input id="name" type="text" v-model="form.name" size="small" :class="{ 'is-error' : required.name}" clearable @blur="requiredCheck"></el-input>
            <span data-required-msg v-if="required.name">이름을 입력하세요.</span>
          </div>
        </div>
        <!--<div data-form-item>-->
          <!--<label data-form-label="required">Host</label>-->
          <!--<div data-form-tag>-->
            <!--<el-input id="host" type="text" v-model="form.host" size="small" :class="{ 'is-error' : required.host}" clearable multiple @blur="requiredCheck"></el-input>-->
            <!--<span data-required-msg v-if="required.host">Host IP 를 입력하세요.</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div data-form-item>-->
        <!--<label data-form-label="required">이메일</label>-->
        <!--<div data-form-tag>-->
        <!--<el-input id="email" type="email" v-model="form.email" size="small" :class="{ 'is-error' : required.email}" clearable @blur="requiredCheck" required></el-input>-->
        <!--<span data-required-msg v-if="required.email">이메일을 입력하세요.</span>-->
        <!--</div>-->
        <!--</div>-->
        <div data-form-item>
          <label data-form-label="required">비밀번호</label>
          <div data-form-tag>
            <el-input id="passwd" type="password" v-model="form.passwd" placeholder="비밀번호 수정시 로그인 페이지로 이동합니다." size="small" :class="{ 'is-error' : required.passwd}" clearable></el-input>
            <span data-required-msg v-if="required.passwd">빈칸을 채워주세요.</span>
          </div>
        </div>
        <div data-form-item>
          <label>설명</label>
          <div data-form-tag>
            <el-input id="description" type="text" v-model="form.description" size="small" clearable></el-input>
          </div>
        </div>
        <div data-button>
          <el-button size="small" native-type="submit">수정</el-button>
          <el-button type="info" size="small" plain @click="setCancel">취소</el-button>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import Constant from "@/constant";
  import { mapGetters } from "vuex";
  export default {
    name: "Systemadminadd",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        required: {
          id: false,
          name : false,
          //host : false,
          //email : false,
          passwd : false
        },
        form: {
          id: "",
          name:"",
          //host: "",
          //email: "",
          passwd: "",
          description: ""
        },
      };
    },
    computed: {
      ...mapGetters({
        userInfo :"userInfo",
      })
    },
    components: {},
    watch: {
    },
    methods: {
      requiredCheck(val){
        console.log(val);
        if(val.target.id === "id"){
          if(val.target.value === "") this.required.id = true;
          else this.required.id = false
        }else if(val.target.id === "name"){
          if(val.target.value === "") this.required.name = true;
          else this.required.name = false
        }
        // else if(val.target.id === "host"){
        //   if(val.target.value === "") this.required.host = true;
        //   else this.required.host = false
        // }
        // else if(val.target.id === "email"){
        //   if(val.target.value === "") this.required.email = true;
        //   else this.required.email = false
        // }
        // else if(val.target.id === "passwd"){
        //   if(val.target.value === "") this.required.passwd = true;
        //   else this.required.passwd = false
        // }
      },
      submitForm(form) {
        console.log(form);
        if(form.id === "" || form.name === "" || form.host === "" || form.passwd === ""){
          if(form.id === "") this.required.id = true;
          if(form.name === "") this.required.name = true;
          //if(form.host === "") this.required.host = true;
          //if(form.email === "") this.required.email = true;
          //if(form.passwd === "") this.required.passwd = true;
        }else {
          const url = "/api/admin";
          this.$http.put(url, this.form).then(() => {
            const adminInfo = "/api/admin/info";
            this.$http
              .get(adminInfo)
              .then(response => {
                this.$store.commit(Constant.USER_INFO, response.data);
              });
          }).then( ()=> {
            console.log(form.passwd);
            if(form.passwd !== undefined){
              console.log("다시 접속");
              this.$router.push("/");
            }else{
              this.$emit("close");
            }
          });
        }
      },
      setCancel(){
        this.$emit("close");
      },
      // submitForm(form){
      //   this.$confirm('관리자 정보를 수정합니까?', '주의', {
      //     confirmButtonText: '삭제',
      //     cancelButtonText: '취소',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '관리자 정보가 수정됐습니다.'
      //     });
      //
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '관리자 정보 수정을 취소합니다.'
      //     });
      //     this.setCancel();
      //   });
      // }
    },
    beforeCreate() {},
    created() {
        this.form.id = this.userInfo.id;
        this.form.name = this.userInfo.name;
        //this.form.host = form.host;
        //this.form.email = form.email;
        this.form.passwd = this.userInfo.passwd;
        this.form.description = this.userInfo.description;
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeDestroy() {
    },
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .user-info-form{
    position:absolute;
    right:80px;
    z-index: 3;
    width:470px;
    padding:25px;
    background-color:#fff;
    border:1px solid color(border)
  }
  [data-button]{
    display:flex;
    justify-content: flex-end;
  }
</style>
