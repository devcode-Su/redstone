<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">조사기간 설정</label>
          <div data-form-tag>
            <el-date-picker v-model="form.startDate" type="datetime" placeholder="Select Start" size="small">
            </el-date-picker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <el-date-picker v-model="form.endDate" type="datetime" placeholder="Select End" size="small">
            </el-date-picker>
            <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setFormDateTime(i)" size="small">
              {{settime}}
            </el-button>
          </div>
        </div>
        <!--<div data-form-item>-->
          <!--<label>검색 조건</label>-->
          <!--<div data-form-tag>-->
            <!--<el-input type="text" v-model="q" placeholder="AP name" size="small">-->
            <!--</el-input>-->
          <!--</div>-->
        <!--</div>-->
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
        form: {
          page:1,
          length:50,
          dept_code: 1,
          nodeid: null,
          startDate: null,
          endDate: null,
          order:"event_time"
        }
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
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
      dataSet(){
        this.form.dept_code = this.globalRangeCode.dept_code;
        this.form.nodeid = this.globalRangeCode.nodeid;
      },
      onSubmit() {
        //console.log(this.form);
        if(this.form.startDate == null || this.form.endDate == null ){
          this.$notify.error({
            title: 'Error',
            message: '조사기간을 입력해야 합니다.'
          });
        }else{
          this.$bus.$emit("wireless", this.form);
        }
      },

    },
    created() {
      this.dataSet();
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
