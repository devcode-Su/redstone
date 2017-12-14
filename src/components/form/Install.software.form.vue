<template>
  <div data-search-pannel>
    <p data-range>
      <span v-if="globalRangeCode.name">{{globalRangeCode.name}}</span>
      <span v-else>
        {{globalRangeCode.dept.name}} / {{globalRangeCode.username}}
        <button data-icon @click="resetRange">
          <i class="fa fa-times-circle"></i>
        </button>
      </span>
      에서 검색
    </p>
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
  import Constant from "@/constant";
  import { mapGetters } from "vuex";

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
      resetRange() {
        this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
          dept_code: 1,
          name: "전사"
        });
      },
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
    created() {},
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
    },
    actvated() {},
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
