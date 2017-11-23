<template>
  <div class="template-table dynamic-row">
    <div class="table-head-wrap">
      <table>
        <thead>
        <tr>
          <th v-for="(th, i) in field" :key="th.id" :class="'col'+i">{{th}}</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="table-body-wrap">
      <table>
        <tbody>
          <tr v-for="row in tableData" @click="moveRow">
            <td v-for="(col, key, idx) in row" :class="['col'+idx,{ 'col-end' : field.length-1 === idx }]">
              {{col}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Templatetablerouter",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      field:Array,
      tableData:{
        type: Array | Object
      }
    },
    data() {
      return {
        more : null
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      moveRow(){
        console.log("moverow")
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
