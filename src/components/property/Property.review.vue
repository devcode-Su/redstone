<template>
  <section class="template-table-wrap">
    <header>
      <span>전체</span>
      <div class="btn-wrap">
        <!--<el-button size="small">-->
        <!--파일로 저장-->
        <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
        <!--<el-select v-model="order" placeholder="정렬" size="small">-->
        <!--<el-option v-for="item in propData.orderOption" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <div class="view-check">
          <el-button @click="morebtn = !morebtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : morebtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
            <el-checkbox v-for="(check,i) in field" :label="i" :key="check.i" :ref="'checked'" v-if="i !== 0">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div class="template-table dynamic-row">
      <div class="table-head-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="(th, i) in field" :key="th.id" :class="['col'+i,{ 'col-end' : field.length-1 === i }]" :ref="'checkedTh'" @click="sort(th)">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <tr v-for="(row,i) in tableData" :key="i.id" @click="moveRow" :ref="'checkedRow'">
              <td v-for="(col, k, idx) in row" :key="k" :class="['col'+idx,{ 'col-end' : field.length-1 === idx }]">
                {{col}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <templatepaginations :propData="pagis"></templatepaginations>
    <templatemodal v-if="showModal" @close="showModal = false" :target="'user-custom'" :compSelect="'property'" :title="'상세정보'"></templatemodal>
  </section>
</template>
<script>
import Templatepaginations from "../template/Template.paginations.vue";
export default {
  name: "Templatetablerouter",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    header: {
      type: Boolean,
      default: true
    },
    propData: {
      type: Array | Object
    }
  },
  data() {
    return {
      showModal: false,
      field: ["", "센서 ID", "사용자명", "부서명", "PC 명", "PC IP 주소"],
      rowKey: ["센서 ID", "사용자명", "부서명", "PC 명", "PC IP 주소"],
      edited: null,
      orderField: "id",
      direction: "asc",
      more: null,
      order: "",
      morebtn: false,
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
      return this.getValueEx(this.propData.data, this.rowKey);
    }
  },
  components: {
    Templatepaginations
  },
  watch: {},
  methods: {
    viewCheck() {
      if (this.$refs.checkedRow !== undefined) {
        for (var j = 0; j < this.$refs.checkedRow.length; j++) {
          for (var i = 0; i < this.propData.field.length - 1; i++) {
            this.$refs.checkedTh[i + 1].hidden = this.$refs.checked[
              i + 1
            ].isChecked;
            this.$refs.checkedRow[j].children[
              i + 1
            ].hidden = this.$refs.checked[i].isChecked;
          }
        }
      } else {
        this.view = [];
      }
    },
    reOrder(select, index) {
      if (this.orderField === select) {
        let check = (this.reverse = !this.reverse);
        this.direction = check ? "asc" : "desc";
      } else {
        this.selected = index;
        this.orderField = select;
        this.direction = "asc";
      }
    },
    moveRow() {
      console.log("moverow");
      this.showModal = !this.showModal;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
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
.template-table.dynamic-row {
  max-height: 700px;
}
</style>
