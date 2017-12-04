<template>
  <section data-dashboard-section="detect-table">
    <div class="template-table dynamic-row">
      <h1>{{receiveData.title}}</h1>
      <div data-table="table">
        <div data-thead="thead">
          <table>
            <thead>
            <tr>
              <th v-for="(th, i) in fields" :key="th.id" :class="['col-'+k,{ 'col-end' : fields.length-1 === i }]">
                <span>{{th}}</span>
              </th>
              </tr>
            </thead>
          </table>
        </div>
        <div data-tbody="tbody">
          <table>
            <tbody>
            <tr data-tbody="row" v-for="(row,i) in rowData" :key="i.id" @click="moveRow(i)">
              <td data-tbody="column" v-for="(td, j) in fieldKeys" :key="td.id" :class="['col-'+td,{'col-end' : fieldKeys.length-1 === i }]">
                <span>{{ tr[td] }}</span>
                <span data-score v-if="td === 'score'" :class="[{'normal' : tr[td] >= 0 && tr[td] <= 50 },{'alpha' :tr[td] > 50 && tr[td] <= 70 },{'bravo' : tr[td] > 70 && tr[td] <= 80 },{'charile' : tr[td] > 80 && tr[td] <= 90 },{'delta' : tr[td] > 90 && tr[td] <= 100 }]">
                  <i class="fa fa-excalmation-triangle fa-lg"></i>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Dashboardlogtable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    //        propData: {
    //          type: Array | Object
    //        }
  },
  data() {
    return {
      showModal: false,
      fields: [],
      rowData: [],
      receiveData: [],
      fieldKeys: [],
      rowKey: ["EventTime", "Type", "username", "userdept", "userip", "Score"]
    };
  },
  computed: {},
  components: {},
  watch: {
    receiveData: data => {
      if (data) {
        this.fieldKeys = Object.keys(this.tableField);
        return data;
      }
    }
  },
  methods: {
    moveRow() {
      console.log("moverow");
    },
    dataReceive() {
      const url = "/dashboard/?method=get&resource=detect";
      this.$http.get(url).then(result => {
        console.log(result);
        this.fields = result.data.data.fields;
        this.receiveData = result.data;
      });
    }
  },
  beforeCreate() {},
  created() {
    this.dataReceive();
  },
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
.template-table-wrap {
  box-shadow: 0px 2px 5px rgba(25, 25, 25, 0.27);
  h1 {
    padding: 10px;
    font-size:16px;
    margin-bottom: 0;
  }
  &.dashboard-table {
    .col0 {
      width: 200px;
    }
    .col1 {
      width: 150px;
    }
    .col2 {
      width: 150px;
    }
    .col3 {
    }
  }
}
</style>
