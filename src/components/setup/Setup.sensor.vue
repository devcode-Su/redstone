<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      센서설정
    </h1>
    <div data-form-setup>
      <form data-setup-item="sensor" @submit.prevent="submitForm(form)">
        <fieldset>
          <legend data-item-title>미 접속 센서 삭제</legend>
          <div data-form-tag>
            <el-checkbox v-model="checked"></el-checkbox>
            <el-select v-model="form.deletedSensor" :disabled="!checked" size="mini" placeholder="기간" clearable>
              <el-option v-for="item in options" :key="item.time" :label="item.name" :value="item.name" ></el-option>
            </el-select>
            일 이상 미 접속 시 삭제
          </div>
        </fieldset>
        <div data-form-button>
          <el-button type="info" plain size="small" @click="resetForm">취소</el-button>
          <el-button size="small" native-type="submit">저장</el-button>
        </div>
      </form>
    </div>
  </article>
</template>
<script>
export default {
  name: "Systemsensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      checked : false,
      options:[
        { name : 30, time: 30 },
        { name : 60, time: 60 },
        { name : 90, time: 90 },
        { name : 180, time: 180 },
        { name : 356, time: 365 }
      ],
      form: {
        deletedSensor:""
      }
    };
  },
  computed: {
    radioDidabled() {
      return this.form.radio === "" || this.form.radio === "1" ? true : false;
    }
  },
  components: {},
  watch: {},
  methods: {
    submitForm(form) {
      //console.log(form);
    },
    resetForm() {
      this.checked = false;
      this.form.deletedSensor = "";
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.radioDidabled);
  },
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
  [data-setup-item="sensor"]{
    width:50%;
  }
[data-item-title]{
  top:100px;
}
  [data-form-tag]{
    .el-checkbox{
      margin-right:15px;
    }
    .el-select{
      margin-right:10px;
      width:80px;
    }
  }
  [data-form-button]{
    margin-top:15px;
  }
fieldset{
  padding:120px 100px 200px;
}
</style>
