<template>
  <div data-form-item>
    <label data-form-label="required">조사기간 설정</label>
    <div data-form-tag>
      <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time" size="small"
                      @change="valueChanged('start', $event)" @input="valueChanged('start', $event)">
      </el-date-picker>
      <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
      <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time" size="small"
                      @change="valueChanged('end', $event)" @input="valueChanged('end', $event)">
      </el-date-picker>
    </div>
    <div data-dateset-btn>
      <el-button v-for="(settime,i) in datelabel" :key="settime.i" @click="setDatetime(i)" size="small">
        {{settime}}
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
        datelabel: ["1시간", "일일", "주간", "월간"],
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      valueChanged(obj, value) {
        let data = {};
        data[obj] = value;
        this.$emit('dateTime', data);
      },
      // setDatetime() {
      //   this.$emit('dateTime', {
      //     start: this.startDate,
      //     end: this.endDate,
      //   });
      // },
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
