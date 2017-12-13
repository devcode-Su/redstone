<template>
  <div data-form-item>
    <label data-form-label="required">조사기간 설정</label>
    <div data-form-tag>
      <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time" size="small" >
      </el-date-picker>
      <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
      <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time" size="small">
      </el-date-picker>
    </div>
    <div data-dateset-btn>
      <el-button v-for="(setTime,i) in dateLabel" :key="setTime.id" @click="setDatetime(i)" size="small">
        {{setTime}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";

  export default {
    name: "Datetime",
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        startDate: null,
        endDate: null,
        dateLabel: ["1시간", "일일", "주간", "월간"],
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
    },
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
      this.$emit('dateTime', {
        start: this.startDate,
        end: this.endDate,
      });
    },
    actvated() {
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

  [data-dateset-btn] {
    display: inline-block;
  }
</style>
