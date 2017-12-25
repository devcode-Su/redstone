<template>
  <div data-form-item>
    <label data-form-label="required">조사기간 설정</label>
    <div data-form-tag>
      <el-date-picker v-model="startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select Start" size="small"

      >
      </el-date-picker>
      <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
      <el-date-picker v-model="endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select End" size="small"
                      @change="valueChanged('end', $event)" @input="valueChanged('end', $event)">
      </el-date-picker>
      <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setDateTime(i)" size="small">
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
        dateLabel: ["1시간", "일일", "주간", "월간"],
      };
    },
    computed: {
    },
    components: {},
    watch: {
      selectDate(d){
        if(d){
          console.log(d)
        }
      }
    },
    methods: {
      valueChanged(obj, value) {
        console.log('valueChanged', obj, value);
        let data = {};
        data[obj] = value;
        this.$emit('dateTime', data);
      },
      setDateTime(i) {
        this.setDatetime(i);
        this.$emit('dateTime', {
          start: this.startDate,
          end: this.endDate,
        });
      },
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

  [data-dateset-btn] {
    display: inline-block;
  }
  button{
    margin-left:5px;
  }
</style>
