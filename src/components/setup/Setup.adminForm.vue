<template>
  <section>
    <div>
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
          <div data-form-item>
            <label data-form-label="required">Host</label>
            <div data-form-tag>
              <el-input id="host" type="text" v-model="form.host" size="small" :class="{ 'is-error' : required.host}" clearable multiple @blur="requiredCheck"></el-input>
              <span data-required-msg v-if="required.host">Host IP 를 입력하세요.</span>
            </div>
          </div>
          <!--<div data-form-item>-->
            <!--<label data-form-label="required">이메일</label>-->
            <!--<div data-form-tag>-->
              <!--<el-input id="email" type="email" v-model="form.email" size="small" :class="{ 'is-error' : required.email}" clearable @blur="requiredCheck" required></el-input>-->
              <!--<span data-required-msg v-if="required.email">이메일을 입력하세요.</span>-->
            <!--</div>-->
          <!--</div>-->
          <div data-form-item v-if="formBtnType">
            <label data-form-label="required">비밀번호</label>
            <div data-form-tag>
              <el-input id="passwd" type="password" v-model="form.passwd" size="small" :class="{ 'is-error' : required.passwd}" clearable @blur="requiredCheck"></el-input>
              <span data-required-msg v-if="required.passwd">빈칸을 채워주세요.</span>
            </div>
          </div>
          <div data-form-item>
            <label>설명</label>
            <div data-form-tag>
              <el-input id="description" type="text" v-model="form.description" size="small" clearable></el-input>
            </div>
          </div>
          <div data-button v-if="formBtnType" >
            <el-button size="small" native-type="submit">등록</el-button>
            <el-button type="info" size="small" plain @click="setCancel">취소</el-button>
          </div>
          <div data-button v-else>
            <el-button size="small" native-type="submit">수정</el-button>
            <el-button type="danger" size="small" plain @click="remove">삭제</el-button>
            <el-button type="info" size="small" plain @click="setCancel">취소</el-button>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
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
        host : false,
        //email : false,
        passwd : false
      },
      form: {
        id: "",
        name:"",
        host: "",
        //email: "",
        passwd: "",
        description: ""
      },
    };
  },
  computed: {
    ...mapGetters({
      insertForm :"pickAdmin",
      formBtnType : "setupFormType"
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
      }else if(val.target.id === "host"){
        if(val.target.value === "") this.required.host = true;
        else this.required.host = false
      }
      // else if(val.target.id === "email"){
      //   if(val.target.value === "") this.required.email = true;
      //   else this.required.email = false
      // }
      else if(val.target.id === "passwd"){
        if(val.target.value === "") this.required.passwd = true;
        else this.required.passwd = false
      }
    },
    submitForm(form) {
      console.log(form);
      if(form.id === "" || form.name === "" || form.host === "" || form.passwd === ""){
        if(form.id === "") this.required.id = true;
        if(form.name === "") this.required.name = true;
        if(form.host === "") this.required.host = true;
        //if(form.email === "") this.required.email = true;
        if(form.passwd === "") this.required.passwd = true;
      }else {
        if (this.formBtnType) {
          //console.log("등록");
          //const url = "/api/admin";
          // this.$http.post(url, this.form);
          // this.$bus.$emit("admin");
          // this.$bus.$emit("modalClose", false);
          this.$store.dispatch(Constant.ADD_ADMIN, form);
          this.$store.commit(Constant.SETUP_MODAL, false);
          this.$store.commit(Constant.SETUP_FORMTYPE, true);
        } else {
          //console.log("수정");
          this.$store.dispatch(Constant.UPDATE_ADMIN, form);
          this.$store.commit(Constant.SETUP_MODAL, false);
          this.$store.commit(Constant.SETUP_FORMTYPE, true);
        }
      }
    },
    setCancel(){
      // this.form.id = "";
      // this.form.name = "";
      // this.form.host = "";
      // this.form.email = "";
      // this.form.passwd = "";
      // this.form.description = "";
      this.$store.commit(Constant.SETUP_MODAL, false);
      this.$store.commit(Constant.SETUP_FORMTYPE, true);
      this.$store.commit(Constant.PICK_ADMIN, null);
    },
    remove(){
      this.$confirm('관리자를 삭제합니까?', '주의', {
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '삭제가 완료됐습니다.'
        });
        //let id = this.form.id;
        this.$store.dispatch(Constant.DELETE_ADMIN, this.form.id);
        this.setCancel();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '삭제가 취소됐습니다.'
        });
        this.setCancel();
      });
    }
  },
  beforeCreate() {},
  created() {
    if(this.insertForm.length){
      const form = this.insertForm[0];
      this.form.id = form.id;
      this.form.name = form.name;
      this.form.host = form.host;
      this.form.email = form.email;
      this.form.passwd = form.passwd;
      this.form.description = form.description;
    }
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("modify")
  },
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
section{
  padding:30px;
}
.el-form {
  width: 100%;
}
 [data-button]{
    display:flex;
    justify-content: flex-end;
  }
</style>
