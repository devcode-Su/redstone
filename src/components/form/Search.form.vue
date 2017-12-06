<template>
  <el-form ref="form" :model="form" :label-width="widthsize+'px'" :label-position="'left'">
    <fieldset>
      <datetime></datetime>
      <datelast></datelast>
      <type-checkbox></type-checkbox>
      <sensor-checkbox></sensor-checkbox>
      <normal-input></normal-input>
      <label-input></label-input>
      <replace-input></replace-input>
    </fieldset>
  </el-form>
</template>
<script>
import Datetime from "./Datetime";
import Datelast from "./Datelast";
import TypeCheckbox from "./Type.checkebox";
import SensorCheckbox from "./Sensor.checkbox";
import NormalInput from "./Normal.input";
import LabelInput from "./Label.input";
import ReplaceInput from "./Replace.input";

export default {
  name: "Searchform",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    widthsize: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      form: {
        data: "",
        startDate: "",
        endDate: "",
        version: "",
        checkeType: [],
        text: "",
        agreement: false
      }
    };
  },
  computed: {},
  components: {
    datetime: Datetime,
    datelast: Datelast,
    "type-checkbox": TypeCheckbox,
    "sensor-checkbox": SensorCheckbox,
    "normal-input": NormalInput,
    "label-input": LabelInput,
    "replace-input": ReplaceInput
  },
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
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
