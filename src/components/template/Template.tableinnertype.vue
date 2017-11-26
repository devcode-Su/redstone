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
            <tr v-for="(row, i) in tableData" :key="row" @click="moveRow(i)" :ref="'checkedRow'">
              <td v-for="(col, key, idx) in row" :key="col" :class="['col'+idx,{ 'col-end' : propData.field.length-1 === idx }]">
                {{col | snippet}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
import { EventBus } from "@/main";
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
      more: null
    };
  },
  computed: {
    tableData() {
      return this.getValueEx(this.propData.data, this.propData.rowKey);
    }
  },
  components: {},
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
      console.log(this.propData.data[index]);
      this.$router.push("Search-process");
      EventBus.$emit("infofile", this.propData.data[index]);
    }
  },
  beforeCreate() {},
  created() {
    console.log(this.propData);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.propData);
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
