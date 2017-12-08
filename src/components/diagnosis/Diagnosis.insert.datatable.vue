<template>
  <div data-table="table">
    <div data-thead="thead">
      <table>
        <thead>
        <tr>
          <th>head</th>
        </tr>
        </thead>
      </table>
    </div>
    <div data-tbody="tbody">
      <table>
        <tbody>
        <tr data-tbody="row">
          <td>td</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  //import _ from "lodash";
  export default {
    name: "InsertDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      fields: {
        type: Object,
        default() {
          return { message: "wait receive data" };
        }
      },
      propData: {
        type: Object | Array,
        default() {
          return { message: "wait receive data" };
        }
      },
      reorder: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fieldKeys: [],
        rowData: [],
        rowCheck: false
      };
    },
    computed: {
      // tableData() {
      //   return this.propData.length > 1 ? this.propData : console.log("delay~~");
      // }
    },
    components: {},
    watch: {
      propData(data) {
        if (data) {
          this.fieldKeys = Object.keys(this.fields);
          if (!data.data.indexOf(null)) {
            this.rowCheck = true;
          }
          this.rowData = data.data;
          return data;
        }
      }
    },
    methods: {
      rowClick(val) {
        console.log('"this clicked row"');
        console.log(val);
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
