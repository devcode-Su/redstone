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
        <datetime @dateTime="dateSet"></datetime>
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
import Constant from "@/constant";
import { mapGetters } from "vuex";
import Datetime from "./Datetime";
import ReplaceInput from "./Replace.input";

export default {
  name: "FileSearchform",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      form: {
        dept_code: 1,
        nodeid: "",
        startDate: null,
        endDate: null,
      }
    };
  },
  computed: {
    ...mapGetters({ globalRangeCode: "globalRangeCode" })
  },
  components: {
    "datetime": Datetime,
    "replace-input": ReplaceInput
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
      this.$bus.$emit("update");
      this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
        dept_code: 1,
        name: "전사"
      });
    },
    dateSet(d) {
      this.form.startDate = d.start ? d.start : this.form.startDate;
      this.form.endDate = d.end ? d.end : this.form.endDate;
    },
    send() {
      console.log(this.form)
      if(this.form.startDate == null || this.form.endDate == null ){
        this.$notify.error({
          title: 'Error',
          message: '조사기간을 입력해야 합니다.'
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
    console.log(this.form.startDate);
  },
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
