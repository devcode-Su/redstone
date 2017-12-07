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
  import Constant from "@/constant";
  import { mapGetters } from "vuex";
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
      this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
        dept_code: 1,
        name: "전사"
      });
    },
    dateset(dateTime) {
      this.form.startDate = dateTime.start;
      this.form.endDate = dateTime.end;
    },
    inputset(replace) {
      console.log("inputset", replace);
      this.form.q = replace.q;
      this.form.partial_match = replace.partial_match;
    },
    submit(form) {
      console.log(form)
      this.$bus.$emit("search-option", form);
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
</style>
