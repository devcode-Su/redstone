<template>
  <section class="user-set admin-add">
    <h1 class="user-set-title">
      {{title}}
    </h1>
    <div class="user-set-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="'left'" label-width="100px">
        <el-form-item label="ID" prop="useId">
          <el-input v-model="ruleForm.useId"></el-input>
        </el-form-item>
        <el-form-item label="IP Address" prop="ipAddress">
          <el-input type="text" v-model="ruleForm.ipAddress"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">등록</el-button>
          <el-button @click="resetForm('ruleForm')">입력취소</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
export default {
  name: "Systemadminadd",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    title: {
      type: String
    }
  },
  data() {
    const validateIp = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("IP 주소를 입력하세요."));
      } else {
        if (!this.isIpValid(value)) {
          callback(new Error("IP 주소를 확인하세요."));
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const confirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        useId: "",
        ipAddress: "",
        email: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        useId: [
          {
            required: true,
            message: "Please input Use ID",
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: "Length should be 5 to 16",
            trigger: "blur"
          }
        ],
        ipAddress: [
          {
            required: true,
            validator: validateIp,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: "blur,change"
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true, validator: confirmPass, trigger: "blur" }]
      }
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //console.log(this.$refs[formName])
      this.$refs[formName].resetFields();
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.el-form {
  width: 100%;
}
</style>
