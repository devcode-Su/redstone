<template>
  <div data-search-pannel>
    <el-form ref="form" :model="form" :label-width="widthsize+'px'" :label-position="'left'">
      <fieldset>
        <datetime @dateTime="dateset"></datetime>
        <replace-input @replace="inputset"></replace-input>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" @click="submit">
          검색
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Datetime from "./Datetime";
  import ReplaceInput from "./Replace.input";

  export default {
    name: "NetworkSearchForm",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      widthsize: {
        type: Number,
        default: 120
      }
    },
    data() {
      return {
        form: {
          startDate: "",
          endDate: "",
          q: "",
          partial_match: false
        }
      };
    },
    computed: {},
    components: {
      "datetime": Datetime,
      "replace-input": ReplaceInput
    },
    watch: {},
    methods: {
      dateset(dateTime) {
        this.form.startDate = dateTime.start;
        this.form.endDate = dateTime.end
      },
      inputset(replace) {
        //console.log('inputset', replace);
        this.form.q = replace.q;
        this.form.partial_match = replace.partial_match;
      },
      submit() {
        this.$bus.$emit('network-search-form', this.form);
      }
    },
    beforeCreate() {
    },
    created() {
      this.form.dept_code = this.globalRangeCode.dept_code;
      this.form.nodeid = this.globalRangeCode.nodeid;
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
</style>
