<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <datetime @dateTime="dateSet"></datetime>
        <div data-form-item>
          <div data-form-tag="check">
            <label class="check">검색 항목</label>
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" true-label="on" :false-labe="null" @change="handleCheckAllChange">
              전체
            </el-checkbox>
            <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
              <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">{{search}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <replace-input @replace="inputText"></replace-input>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="onSubmit">
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
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";

  export default {
    name: "SecurityWirelessfrom",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        dateLabel: ["1시간", "일일", "주간", "월간"],
        isIndeterminate: false,
        checklistAll:    [
          "FILE", "IP", "RSC", "process", "network", "files", "registry",
        ],
        checklist:       {
          FILE:     "TI진단 이벤트",
          IP:       "악성 URL/IP 접근 이벤트",
          RSC:      "RSC 엔진 진단 이벤트",
          process:  "프로세스",
          network:  "네트워크",
          files:    "파일",
          registry: "레지스트리",
        },
        form: {
          dept_code: 1,
          nodeid: "",
          startDate: null,
          endDate: null,
          checkAll: "on",
          checkType: [
            "FILE", "IP", "RSC", "process", "network", "files", "registry",
          ],
        }
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
      "datetime" :Datetime,
      "replace-input": ReplaceInput,
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
      dateSet(d) {
        this.form.startDate = d.start ? d.start : this.form.startDate;
        this.form.endDate = d.end ? d.end : this.form.endDate;
      },
      handleCheckAllChange(val) {
        console.log(val);
        this.form.checkType = val ? this.checklistAll : [];
        this.isIndeterminate = false;
      },
      handleCheckedEngineChange(value) {
        let checkedCount = value.length;
        this.form.checkAll = checkedCount === this.checklistAll.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checklistAll.length;
      },
      inputText(t){
        this.form.q = t.q;
        this.form.partial_match = t.partial_match;
      },
      onSubmit() {
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
    created() {
      this.all = "???";
      this.form.checked = "cccccc";
      console.log(this.all);
      console.log(this.form.checked)
    },
    beforeMounted() {
    },
    mounted() {},
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
    },
    mixins: [MixinsSetDatetime],
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  button{
    margin-left:5px;
  }
  .check {
    align-self: flex-start;
  }

  [data-form-tag="check"] {
    align-items: flex-start;
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      .el-checkbox {
        width: 25%;
        margin: 0;
        padding: 0;
        &:nth-child(3) {
          width: 50%;
        }
      }
    }
  }
</style>
