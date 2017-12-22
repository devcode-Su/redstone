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
  import Constant from "@/constant";
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
      rowKey: ["EventTime", "Type", "username", "userdept", "userip", "Score"],
      interval : ''
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
    moveRow(row) {
      console.log("moverow");
      console.log(row);
      this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
        nodeid: row.nodeid,
        username: row.username
      });
      this.$router.push({path: "Search-analysis", query: {ProcessGuid: row.ProcessGuid, nodeid: row.nodeid}});
    },
    getData(){
      const url = "/dashboard/?method=get&resource=detect";
      this.$http.get(url).then(result => {
        this.fieldsData = result.data.data.fields;
        this.receiveData = result.data;
      });
    },
    relData(){
      this.interval = setInterval(this.getData,5000);
    },
    dataReceive() {}
  },
  beforeCreate() {},
  created() {
    this.getData();
  },
  beforeMounted() {},
  mounted() {
    this.relData();
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {
    clearInterval(this.interval)
  },
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
