<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="submit(form)">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">조사기간 설정</label>
          <div data-form-tag>
            <el-date-picker v-model="form.startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select Start" size="small">
            </el-date-picker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <el-date-picker v-model="form.endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select End e" size="small">
            </el-date-picker>
            <el-button class="date-select" v-for="(settime,i) in dateLabel" :key="settime.i" @click="setFormDateTime(i)" size="small">
              {{settime}}
            </el-button>
          </div>
        </div>
        <div data-form-item>
          <label>검색 조건</label>
          <div data-form-tag>
            <el-input type="text" v-model="form.q" size="small">
            </el-input>
            <el-checkbox style="margin-left:10px" v-model="form.partial_match" true-label="on" :flase-label="null">
              부분 일치
            </el-checkbox>
          </div>
        </div>
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
import ReplaceInput from "./Replace.input";
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";

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
      dateLabel: ["1시간", "일일", "주간", "월간"],
      form: {
        dept_code:1,
        nodeid:null,
        startDate: null,
        endDate: null,
        q: null,
        partial_match: "on"
      }
    };
  },
  computed: {
    ...mapGetters({ globalRangeCode: "globalRangeCode" })
  },
  components: {
    "global-range" : GlobalRange,
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
    submit(form) {
      //console.log(form);
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
  destroyed() {},
  mixins: [MixinsSetDatetime],
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
