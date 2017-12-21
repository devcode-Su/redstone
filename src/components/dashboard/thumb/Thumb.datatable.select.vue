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
          <tr data-tbody="row" v-if="dataCheck">
            <td data-tbody="column" :colspan="fieldKeys.length - 1">
              {{indexDate}} 검출된 내역이 없습니다.
            </td>
          </tr>
          <tr data-tbody="row" v-else v-for="(tr, h) in rowData" :key="h" @click.stop="rowClick(tr, h)">
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
    propIndex: {
      type : Number,
      default : 0
    }
  },
  data() {
    return {
      fieldKeys: [],
      rowData: [],
      dataCheck: false,
    };
  },
  computed: {
    indexDate() {
      if(this.propIndex === 0) return "일일";
      else if(this.propIndex === 1) return "주간";
      else return "월간";
    }
  },
  components: {},
  watch: {
    propIndex(num) {
      if (this.propData.data[num] === null) {
        this.dataCheck = true;
      } else {
        this.dataCheck = false;
        this.rowData = this.propData.data[num];
      }
    },
    propData(data) {
      if (data) {
        this.fieldKeys = Object.keys(this.fields);
        if (data.data[this.propIndex] === null) {
          this.dataCheck = true;
        }else {
          this.dataCheck = false;
          this.rowData = data.data[this.propIndex]
        }
        return data;
      }
    }
  },
  methods: {
    rowClick(row, num) {
      this.$emit("rowRouter",{
        row : row,
        rowNum : num
      })
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.col-ip{
  width: 115px;
}
</style>
