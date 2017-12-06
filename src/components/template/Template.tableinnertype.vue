<template>
  <section class="template-table-wrap inner-view">
    <div class="template-table dynamic-row">
      <div class="table-head-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="(th,i) in propData.field" :key="th.id" :class="['col'+i,{ 'col-end' : propData.field.length-1 === i }]" :ref="'checkedTh'">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <tr v-for="(row, i) in tableData" :key="row.id" @click="moveRow(i)" :ref="'checkedRow'">
              <td v-for="(col, key, idx) in row" :key="col.id" :class="['col'+idx,{ 'col-end' : propData.field.length-1 === idx }]">
                {{col | snippet}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <templatepaginations :propData="pagis"></templatepaginations>
  </section>
</template>
<script>
import Templatepaginations from "./Template.paginations.vue";
export default {
  name: "Templatetablerouter",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData: {
      type: Array | Object
    }
  },
  data() {
    return {
      more: null,
      pagis: {
        total: "",
        per_page: "",
        current_page: "",
        next_page_url: null,
        prev_page_url: null
      }
    };
  },
  computed: {
    tableData() {
      return this.getValueEx(this.propData.data, this.propData.rowKey);
    }
  },
  components: {
    "templatepaginations":Templatepaginations
  },
  watch: {},
  methods: {
    viewCheck() {
      if (this.$refs.checkedRow !== undefined) {
        for (var j = 0; j < this.$refs.checkedRow.length; j++) {
          for (var i = 0; i < this.propData.field.length - 1; i++) {
            this.$refs.checkedTh[i].hidden = this.$refs.checked[i].isChecked;
            this.$refs.checkedRow[j].children[i].hidden = this.$refs.checked[
              i
            ].isChecked;
          }
        }
      } else {
        this.view = [];
      }
    },
    moveRow(index) {
      const getdata = this.propData.data[index];
      console.log(getdata);
      this.$bus.$emit("process-search-data", getdata);
      this.$router.push("Search-process");
      this.$router.push({ path: "Search-process", params: { psd: getdata } });

      //      const defaultDate = new Date(getdata.EventTime);
      //      const start = new Date(defaultDate.getTime() - 60 * 30 * 1000);
      //      const end = new Date(defaultDate.getTime() + 60 * 30 * 1000);
      //      let type = null,text = null ,processGuid = null;
      //      if(getdata.Type) {
      //        console.log(getdata);
      //        if (getdata.Type === "FILE") {
      //          type = "FILE";
      //          text = getdata.Md5Hash
      //        } else if (getdata.Type === "IP") {
      //          type = "IP";
      //          processGuid = getdata.ProcessGuid
      //        } else if (getdata.Type === "RSC") {
      //          type = "RSC";
      //            processGuid = getdata.ProcessGuid
      //        }
      //      }else if(getdata.VolumeGuid){
      //        text = getdata.VolumeGuid
      //      }
      //      this.$store.commit(Constant.PROCESS_SEARCH, {
      //        startTime : start,
      //        endTime : end,
      //        checkType : [type],
      //        text : text,
      //        processGuid : processGuid
      //      });
      //this.$store.commit(Constant.PROCESS_SEARCH, getdata)
      this.$router.push("Search-process");
    }
  },
  beforeCreate() {},
  created() {
    //console.log(this.propData);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    //console.log(this.propData);
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
tr {
  cursor: pointer;
}
</style>
