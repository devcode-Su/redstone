<template>
  <section data-dashboard-section="detect-table">
    <h1>{{receiveData.title}}</h1>
    <div data-table="table">
      <div data-thead="thead">
        <table>
          <thead>
            <tr>
              <th v-for="(th,k, i) in fields" :key="th.id" :class="['col-'+k,{ 'col-end' : fields.length-1 === i }]">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody">
        <table>
          <tbody>
            <tr data-tbody="row" v-for="(tr,i) in columns" :key="i.id" @click="moveRow(tr)">
              <td data-tbody="column" v-for="(td, j) in rowKey" :key="td.id" :class="['col-'+td,{'col-end' : rowKey.length-1 === j }]">
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
  </section>
</template>
<script>
export default {
  name: "DashboardDetectiontable",
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
      fieldsData: [],
      receiveData: [],
      columns: [],
      fieldKeys: [],
      rowKey: ["EventTime", "Type", "username", "userdept", "userip", "Score"]
    };
  },
  computed: {},
  components: {},
  watch: {
    receiveData(data) {
      if (data) {
        let fields = {};
        for (var i = 0; i < this.rowKey.length; i++) {
          fields[this.rowKey[i]] = this.fieldsData[i];
        }
        this.fields = fields;
        return (this.columns = data.data.columns);
      }
    }
  },
  methods: {
    moveRow(val) {
      console.log("moverow");
      console.log(val);
    },
    dataReceive() {}
  },
  beforeCreate() {},
  created() {
    //this.dataReceive();
    const url = "/dashboard/?method=get&resource=detect";
    this.$http.get(url).then(result => {
      this.fieldsData = result.data.data.fields;
      this.receiveData = result.data;
    });
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
h1 {
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 0;
}
</style>
