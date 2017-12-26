<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">검색조건</label>
          <div data-form-tag>
            <el-input placeholder="프로그램명" v-model="form.name" class="input-with-select" size="small" clearable>
              <el-button slot="append" native-type="submit" icon="el-icon-search" size="small">검색</el-button>
            </el-input>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import GlobalRange from "../form/Global.range";

  export default {
    name: "InstallSoftwareform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        form: {
          dept_code: 1,
          nodeid: "",
          name:"",
        }
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          console.log(g);
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      }
    },
    methods: {
      send() {
        console.log(this.form);
        if(this.form.name === ""){
          this.$notify.error({
            title: 'Error',
            message: '검색할 프로그램명을 입력하세요.'
          });
        }else{
          this.$emit("form", this.form);
        }
      }
    },
    beforeCreate() {},
    created() {
      this.form.dept_code = this.globalRangeCode.dept_code;
      this.form.nodeid = this.globalRangeCode.nodeid;
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
    },
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-form-tag]{
    width:600px;
  }
</style>
