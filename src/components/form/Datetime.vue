<template>
  <el-form-item label="조사기간 설정" size="small">
    <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time">
    </el-date-picker>
    <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
    <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time">
    </el-date-picker>
    <div data-dateset-btn>
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
        startDate: "",
        endDate: "",
        datelabel: ["1시간", "일일", "주간", "월간"]
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      this.$emit("dateTime", {
        start: this.startDate,
        end: this.endDate
      })
    },
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    mixins: [MixinsSetDatetime]
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";

  [data-dateset-btn] {
    display: inline-block;
  }
</style>
