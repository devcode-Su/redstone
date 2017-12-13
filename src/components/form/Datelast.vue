<template>
  <div data-form-item>
    <div data-form-tag>
      <el-checkbox v-model="all" :true-label="1" :false-label="0">비밀번호 미 변경자 조회</el-checkbox>
      <el-date-picker v-model="startDate" type="date" placeholder="Start date" size="small" >
      </el-date-picker>
      <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
      <el-date-picker v-model="endDate" type="date" placeholder="End date" size="small">
      </el-date-picker>
    </div>
    <div data-dateset-btn>
      <el-button v-for="(setDate,i) in dateLabel" :key="setDate.id" @click="setDatelast(i)" size="small">
        {{setDate}}
      </el-button>
    </div>
  </div>
</template>
<script>
import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
export default {
  name: "Datelast",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      dateLabel: ["1주일전", "1개월전", "3개월전", "6개월전"],
      all : 0,
      startDate: null,
      endDate: null,
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
  updated() {
    this.$emit('pass', {
      all : this.all,
      start: this.startDate,
      end: this.endDate,
    });
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  mixins: [MixinsSetDatetime]
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
[data-form-item] {
  label{
    width:auto;
  }
  .el-date-editor.el-input{
    width:135px;
  }
}
</style>
