<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <div data-form-item>
          <div data-form-tag>
            <el-input v-model="form.version" type="text" placeholder="version" size="small"></el-input>
          </div>
        </div>
        <div data-form-item>
          <div data-form-tag>
            <el-checkbox v-model="form.all" true-label="1" false-label="0" @change="checked">일주일 이상 미로그인 센서</el-checkbox>
          </div>
        </div>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="submit">
          검색
        </el-button>
      </div>
    </form>
  </div>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import GlobalRange from "./Global.range";

  export default {
    name: "SecurityMediaform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        form: {
          dept_code: 1,
          nodeid: "",
          version:'',
          OnlyNoLoginLong:0,
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
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      }
    },
    methods: {
      checked(val){
        this.form.OnlyNoLoginLong = val;
      },
      send() {
        //console.log(this.form);
        this.$emit("form", this.form);
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
    width:500px;
    height:32px;
    label{
      width:auto;
    }
  }
</style>
