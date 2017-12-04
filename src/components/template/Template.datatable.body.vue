<template>
  <div data-table="table">
    <div data-thead="thead">
      <table>
        <thead>
          <tr>
            <th v-for="(th, k, i) in fields" :key="th.i" :class="['col-'+k, {'col-end' : fields.length-1 === i }]" @click.stop="reOrder(key, i)">{{th}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div data-tbody="tbody">
      <table>
        <tbody>
        <tr data-tbody="row" v-if="rowCheck">
          <td data-tbody="column" :colspan="fieldKeys.length - 1">
            검색된 데이터가 없습니다.
          </td>
        </tr>
          <tr data-tbody="row" v-else v-for="(tr, h) in rowData" :key="tr.h" @click.stop="rowClick(tr)">
            <td data-tbody="column" v-for="(td, j) in fieldKeys" :key="td.j" :class="['col-'+td,{'col-end' : fields.length-1 === j }]">
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
    },
  },
  data() {
    return {
      fieldKeys: [],
      rowData : [],
      rowCheck : false
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
        console.log(data.data)
        if(!data.data.indexOf(null)){
          this.rowCheck = true;
          // for(var i =0; i< data.data.length; i++){
          //   this.rowData = data.data[i] = "Not data"
          // }
        }
        this.rowData = data.data
        console.log(this.rowData)
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
  created() {
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
