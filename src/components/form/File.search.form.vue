<template>
  <div data-search-pannel>
    <el-form ref="form" :model="form" :label-width="widthsize+'px'" :label-position="'left'">
      <fieldset>
        <datetime @dateTime="dateset"></datetime>
        <replace-input @replace="inputset"></replace-input>
      </fieldset>
      <div data-search-submit>
        <el-button  type="primary" plain size="small" @click="submit">
          검색
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Datetime from "./Datetime";
  import ReplaceInput from "./Replace.input";

  export default {
    name: "FileSearchform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      pannelType: {
        type: Array | Object,
        default: false
      },
      widthsize: {
        type: Number,
        default: 120
      }
    },
    data() {
      return {
        form: {
          startTime: "",
          endTime: "",
          q: "",
          partial_match: false
        }
      };
    },
    computed: {},
    components: {
      datetime: Datetime,
      "replace-input": ReplaceInput
    },
    watch: {},
    methods: {
      dateset(dateTime){
        this.form.startTime = dateTime.start;
        this.form.endTime = dateTime.end
      },
      inputset(replace){
        this.form.q = replace.text;
        this.form.parcial_match = replace.checked;
      },
      submit(){
        console.log(this.form);
      }
    },
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
