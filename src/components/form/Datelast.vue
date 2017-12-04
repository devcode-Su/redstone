<template>
  <el-form-item label="조사기간 설정" size="small">
    <el-checkbox v-model="checked" >
      <span style="margin-right:20px;">비밀번호 미 변경자 조회</span>
    </el-checkbox>
    <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time">
    </el-date-picker>
    <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
    <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time">
    </el-date-picker>
    <div class="btn-date-wrap">
      <el-button v-for="(settime,i) in datelabel" :key="settime.i" @click="setDatelast(i)">
        {{settime}}
      </el-button>
    </div>
  </el-form-item>
</template>
<script>
import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
export default {
  name: "Datelate",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      datelabel: ["1주일전", "1개월전", "3개월전", "6개월전"],
      checked:[],
      startDate: "",
      endDate: "",

    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  mixins: [MixinsSetDatetime]
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
