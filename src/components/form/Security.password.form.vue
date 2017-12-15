<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <datelast @change="passSet"></datelast>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" :native-type="'submit'">
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
          all: 0,
          date: null,
        },
      };
    },
    computed: {
      ...mapGetters({globalRangeCode: "globalRangeCode"})
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
      },
    },
    methods: {
      passSet(p) {
        console.log(p)
        for ( let key in p ) {
          if ( p.hasOwnProperty(key) && (p[key] || '0' === p[key] || 0 === p[key]) ) {
            this.form[key] = p[key];
          }
        }
//        this.send();
      },
      send() {
        console.log(this.form);
        if (!this.form.date && this.form.all === 0) {
          this.$notify.error({
                               title: 'Error',
                               message: '조사기간을 설정하세요.',
                             });
        } else {
          this.$emit("submit", this.form);
        }
      },
    }
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
