<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="submit(form)">
      <fieldset>
        <datetime @dateTime="dateset"></datetime>
        <replace-input @replace="inputset"></replace-input>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="submit" clearable>
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
import Datetime from "./Datetime";
import ReplaceInput from "./Replace.input";

export default {
  name: "FileSearchform",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    pannelType: {
      type: Array | Object,
      default: false
    },
    widthsize: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      form: {
        dept_code:1,
        nodeid:'',
        startDate: "",
        endDate: "",
        q: "",
        partial_match: false
      }
    };
  },
  computed: {
    ...mapGetters({ globalRangeCode: "globalRangeCode" })
  },
  components: {
    "global-range" : GlobalRange,
    "datetime": Datetime,
    "replace-input": ReplaceInput
  },
  watch: {
    globalRangeCode(g) {
      if (g) {
        //console.log(g);
        this.form.dept_code = g.dept_code;
        this.form.nodeid = g.nodeid;
      }
    }
  },
  methods: {
    dateset(dateTime) {
      this.form.startDate = dateTime.start ? dateTime.start : this.form.startDate;
      this.form.endDate = dateTime.end ? dateTime.end : this.form.endDate;
    },
    inputset(replace) {
      //console.log("inputset", replace);
      this.form.q = replace.q;
      this.form.partial_match = replace.partial_match;
    },
    submit(form) {
      this.$bus.$emit("search-file-form", form);
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
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
