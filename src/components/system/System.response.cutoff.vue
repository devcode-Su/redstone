<template>
  <section class="user-set admin-add">
    <h1 class="user-set-title">
      {{title}}
    </h1>
    <div class="user-set-wrap">
      <el-form :model="cutForm" ref="cutForm" :label-position="'left'" label-width="130px">
        <el-form-item label="MD5" prop="md5">
          <el-input type="text" v-model="cutForm.md5"></el-input>
        </el-form-item>
        <el-form-item label="설명" prop="explain">
          <el-input type="text" v-model="cutForm.explain"></el-input>
        </el-form-item>
        <el-form-item label="차단 적용 그룹" prop="group">
          <el-select v-model="cutForm.group" multiple filterable allow-create placeholder="Choose group">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('cutForm')">등록</el-button>
          <el-button @click="resetForm('cutForm')">취소</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
export default {
  name: "Responsecutoff",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    title: String
  },
  data() {
    return {
      options: [
        { value: "연구소", label: "연구소" },
        { value: "영업1팀", label: "영업1팀" },
        { value: "개발1팀", label: "개발1팀" },
        { value: "기획1팀", label: "기획1팀" },
        { value: "개발2팀", label: "개발2팀" },
        { value: "경영지원팀", label: "경영지원팀" },
        { value: "영업2팀", label: "영업2팀" },
        { value: "기획2팀", label: "기획2팀" },
        { value: "개발2팀", label: "개발2팀" }
      ],
      cutForm: {
        md5: "",
        explain: "",
        group: ""
      }
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    submitForm(formName) {
      const data = this.$refs[formName].model;
      console.log("submit : " + JSON.stringify(data));
    },
    resetForm(formName) {
      //console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.el-form,
.el-select {
  width: 100%;
}
</style>
