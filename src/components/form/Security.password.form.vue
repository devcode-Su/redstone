<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <datelast @pass="passSet"></datelast>
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
  import Datelast from "./Datelast";

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
          all:"",
          startDate: null,
          endDate: null,
        }
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
      "datelast": Datelast,
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
      passSet(p) {
        //console.log(dateTime);
        this.form.all = p.all;
        this.form.startDate = p.start ? p.start : this.form.startDate;
        this.form.endDate = p.end ? p.end : this.form.endDate;
      },
      send() {
        //console.log(this.form);
        if(this.form.startDate == null || this.form.endDate == null ){
          this.$notify.error({
            title: 'Error',
            message: '조사기간을 설정하세요.'
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
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
