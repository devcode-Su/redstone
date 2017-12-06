<template>
  <article class="prtperty-detail-review">
    <propertypannel :text="false"></propertypannel>
    <div class="info-wrap">
      <h2 class="title-label">소프트 웨어 정보</h2>
      <propertydatatable class="info-wrap-list" :propData="tableData" :header="false"></propertydatatable>
    </div>
    <div class="info-wrap">
      <h2 class="title-label">소프트 웨어 정보</h2>
      <div class="info-wrap-list">
        <div class="template-table dynamic-row">
          <div class="table-body-wrap">
            <table>
              <tbody>
                <tr v-for="(row,i) in tableData" :key="i.id">
                  <td v-for="(col, k, idx) in row" :key="k" :class="['col'+idx,{ 'col-end' : propData.field.length-1 === idx }]">
                    {{col}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import Templatemodal from "../template/Template.modal";
import Propertypannel from "./Property.pannel.vue";
import Propertydatatable from "./Property.datatable.vue";

export default {
  name: "Propertydetailreview",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      hwinfo: [
        { device: "CPU", explain: "" },
        { device: "Memory 0", explain: "" },
        { device: "Memory 1", explain: "" },
        { device: "HDD 0", explain: "" },
        { device: "HDD 1", explain: "" },
        { device: "Display", explain: "" },
        { device: "Bios", explain: "" }
      ]
    };
  },
  computed: {},
  components: {
    "templatemodal":Templatemodal
  },
  watch: {},
  methods: {},
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
