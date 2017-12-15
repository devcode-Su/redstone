<template>
  <div data-search-pannel>
    <p data-range>
      <span v-if="globalRangeCode.name">{{globalRangeCode.name}}</span>
      <span v-else>
        <span v-if="globalRangeCode.dept">{{globalRangeCode.dept.name}} / </span>{{globalRangeCode.username}}
        <button data-icon @click="resetRange">
          <i class="fa fa-times-circle"></i>
        </button>
      </span>
      에서 검색
    </p>
    <form @submit.prevent="send">
      <fieldset>
        <datetime @dateTime="dateSet"></datetime>
        <process-checkbox @change="checked"></process-checkbox>
        <replace-input @replace="inputText"></replace-input>
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
  import ProcessCheckbox from "./Process.checkbox"
  import ReplaceInput from "./Replace.input";

  export default {
    name: "FileSearchform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        all: ">>",
        form: {
          dept_code: 1,
          nodeid: "",
          startDate: null,
          endDate: null,
          checked : "??",
          ti_event: true,
          url_ip_event: true,
          engine_event: true,
          process_event: true,
          network_event: true,
          file_event: true,
          registry_event: true,
          q:"",
          partial_match: ""
        }
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "datetime": Datetime,
      "process-checkbox":ProcessCheckbox,
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
      checked(c){
        console.log(c);
        console.log(c.all);
        console.log(this.form.checked);
        this.from.checked = c.all;
        this.form.ti_event = c.ti_event;
        this.form.url_ip_event = c.url_ip_event;
        this.form.engine_event = c.engine_event;
        this.form.process_event = c.process_event;
        this.form.network_event = c.network_event;
        this.form.file_event = c.file_event;
        this.form.registry_event = c.registry_event;
      },
      inputText(t){
        console.log(t);
        this.form.q = t.q;
        this.form.partial_match = t.partial_match;
      },
      send() {
        console.log(this.form);
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
    created() {
      this.all = "???";
      this.form.checked = "cccccc";
      console.log(this.all)
      console.log(this.form.checked)
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
</style>
