<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">조사기간 설정</label>
          <div data-form-tag>
            <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time" size="small"
                            @change="valueChanged" @input="valueChanged">
            </el-date-picker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time" size="small"
                            @change="valueChanged" @input="valueChanged">
            </el-date-picker>
            <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setDatetime(i)" size="small">
              {{settime}}
            </el-button>
          </div>
        </div>
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
  import GlobalRange from "./Global.range";
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";

  export default {
    name: "FileSearchform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        dateLabel: ["1시간", "일일", "주간", "월간"],
        dept_code: 1,
        nodeid: "",
        startDate: null,
        endDate: null,
      };
    },
    computed: {
      ...mapGetters({
        globalRangeCode: "globalRangeCode",
        selectData : "dashboardData"
      })
    },
    components: {
      "global-range" : GlobalRange,
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          console.log(g);
          this.dept_code = g.dept_code;
          this.nodeid = g.nodeid;
        }
      }
    },
    methods: {
      valueChanged(){
        this.$store.commit(Constant.DASHBOARD_DATA, {});
      },
      send() {
        if(this.startDate == null || this.endDate == null ){
          this.$notify.error({
            title: 'Error',
            message: '조사기간을 입력해야 합니다.'
          });
        }else{
          this.$emit("form", {
            dept_code: this.dept_code,
            nodeid: this.nodeid,
            startDate: this.startDate,
            endDate: this.endDate,
          });
        }
      }
    },
    beforeCreate() {},
    created() {
      if(this.selectData.name === "badfilepc"){
        this.setDatetime(this.selectData.num);
        this.send();
      }
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
    },
    activated() {},
    deactivated() {},
    beforeDestroy() {
      this.$bus.$off("badfille")
    },
    destroyed() {},
    mixins: [MixinsSetDatetime],
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  button{
    margin-left:5px;
  }
</style>
