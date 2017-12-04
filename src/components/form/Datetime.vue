<template>
  <el-form-item label="조사기간 설정" size="small">
    <el-date-picker v-model="startTime" type="datetime" placeholder="Select Start date and time">
    </el-date-picker>
    <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
    <el-date-picker v-model="endTime" type="datetime" placeholder="Select End date and time">
    </el-date-picker>
    <div class="btn-date-wrap">
      <el-button v-for="(settime,i) in datelabel" :key="settime.i" @click="setDatetime(i)">
        {{settime}}
      </el-button>
    </div>
  </el-form-item>
</template>
<script>
import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
export default {
  name: "Datetime",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      datelabel: ["1시간", "일일", "주간", "월간"]
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
