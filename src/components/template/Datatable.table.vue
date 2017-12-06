<template>
  <div data-table="table">
    <span data-table="total">전체 : {{}} 건</span>
    <div data-thead="thead">
      <table>
        <thead>
        <tr>
          <th>th</th>
        </tr>
        </thead>
      </table>
    </div>
    <div data-tbody="tbody">
      <table>
        <tbody>
        <tr>
          <td>td</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "DatatableTable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData : {
      type : Array | Object,
      default(){
        return {message : "do not"}
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {
    propData(){

    }
  },
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
