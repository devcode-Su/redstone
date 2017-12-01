<template>
  <div data-table="table">
    <div data-thead="thead">
      <table>
        <thead>
          <tr>
            <th v-for="(th, k, i) in tableField" :key="th.id" :class="'col-'+k">{{th}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div data-tbody="tbody">
      <table>
        <tbody>
          <tr data-tbody="row" v-for="(tr, k, i) in propData.data" :key="tr.id" @click.stop="rowClick(tr)">
            <td data-tbody="column" v-for="(td, j) in fieldKeys" :key="td.id" :class="'col-'+td">
              {{ tr[td] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
//import _ from "lodash";
export default {
  name: "TemplateDatatable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    tableField: {
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
    }
  },
  data() {
    return {
      fieldKeys: [],
      bodyData: []
    };
  },
  computed: {
    // tableData() {
    //   return this.propData.length > 1 ? this.propData : console.log("delay~~");
    // }
  },
  components: {},
  watch: {
    propData: function(data) {
      if (data) {
        this.fieldKeys = Object.keys(this.tableField);
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
[data-table] {
  table {
    width: 100%;
    table-layout: fixed;
  }
  thead {
    color: #fff;
    background-color: color(default);
    border-bottom: 1px solid #d8dce5;
  }
  th,
  td {
    padding: 0 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  th {
    height: 32px;
    line-height: 32px;
  }
  td {
    height: 28px;
    line-height: 28px;
  }
  [data-tbody="row"] {
    border-bottom: 1px solid #e6ebf5;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .col-count,
  .col-score {
    width: 75px;
    text-align: center;
  }
  .col-time {
    width: 170px;
  }
  .col-ip {
    width: 115px;
  }
  [data-tbody="column"] {
  }
}
</style>
