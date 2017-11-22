<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small" :label-position="'left'">
    <el-form-item label="PC IP 주소" prop="pcip">
      <el-input type="text" v-model="ruleForm.pcip" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="목적지 IP 주소" prop="endip">
      <el-input type="text" v-model="ruleForm.endip" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="방향" prop="direction">
      <el-select v-model="ruleForm.direction" placeholder="IN">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="포트" prop="port">
      <el-input type="number" v-model="ruleForm.port" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="프로토콜" prop="protocol">
      <el-select v-model="ruleForm.protocol" placeholder="TCP">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('ruleForm')">검색</el-button>
      <el-button @click="$emit('close')">닫기</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "Templatesearchdetail",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    const validateIp = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("IP 주소를 입력하세요."));
      } else {
        if (!this.$ipValid(value)) {
          callback(new Error("IP 주소를 확인하세요."));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pcip: "",
        endip: "",
        direction: "",
        port: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        pcip: [
          {
            required: true,
            validator: validateIp,
            trigger: "blur"
          }
        ],
        endip: [
          {
            required: true,
            validator: validateIp,
            trigger: "blur"
          }
        ],
        direction: [
          {
            required: true,
            message: "방향을 설정하세요.",
            trigger: "change"
          }
        ],
        port: [
          {
            required: true,
            message: "포트번호를 입력하세요.",
            trigger: "blur"
          }
        ],
        protocol: [
          {
            required: true,
            message: "프로토콜을 설정하세요.",
            trigger: "change"
          }
        ]
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
          console.log("submit!");
          this.$emit("close");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
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
.btn-wrap {
  margin: 25px 0 0;
}
</style>
