<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small"
           :label-position="'left'">
    <el-form-item label="PC IP 주소" prop="pcip">
      <el-input type="text" v-model="ruleForm.pcip" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="목적지 IP 주소" prop="endip">
      <el-input type="text" v-model="ruleForm.endip" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="방향" prop="direction">
      <el-select v-model="ruleForm.direction" placeholder="ANY">
        <el-option label="IN" value="in"></el-option>
        <el-option label="OUT" value="out"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="포트" prop="port">
      <el-input type="number" v-model="ruleForm.port" placeholder="ANY"></el-input>
    </el-form-item>
    <el-form-item label="프로토콜" prop="protocol">
      <el-select v-model="ruleForm.protocol" placeholder="ANY">
        <el-option label="TCP" value="tcp"></el-option>
        <el-option label="UDP" value="udp"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="btn-wrap">
      <el-button type="primary" @click="submitForm('ruleForm')">확인</el-button>
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
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";

  .btn-wrap {
    margin: 25px 0 0;
  }
</style>
