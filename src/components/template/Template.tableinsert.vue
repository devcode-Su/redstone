<template>
  <section class="template-table-wrap">
    <header>
      <span>전체 : {{this.propData.data.total || "-"}}건</span>
      <div class="btn-wrap">
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="order" placeholder="정렬" size="small" @change="reorder" :disabled="!propData.search.length">
          <el-option v-for="item in propData.orderOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="morebtn = !morebtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : morebtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
            <el-checkbox v-for="(check,i) in propData.field" :label="check" :key="check" :ref="'checked'" v-if="i !== propData.field.length -1">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div class="template-table dynamic-row">
      <div class="table-head-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="(th, i) in propData.field" :key="th" :class="['col'+i,{ 'col-end' : propData.field.length-1 === i }]" :ref="'checkedTh'">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <template v-for="row in propData.data.data">
              <tr :ref="'checkedRow'" :key="row">
                <td v-for="(col, key, idx) in row" :key="col.i" :class="['col'+idx,{ 'col-end' : propData.field.length-1 === idx }]">
                  {{col | snippet}}
                </td>
                <td class="col-btn">
                  <button class="icon-btn icon-wrap" @click="moreRow(row, row.FileHash)" :class="{on : row === more}">
                    <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
                  </button>
                </td>
              </tr>
              <transition name="fade" :key="row">
                <tr v-if="row === more" class="show-row">
                  <td :colspan="collength" :key="row.id">
                    <templatetableinnertype :propData="innerData" class="inner-view-file"></templatetableinnertype>
                  </td>
                </tr>
              </transition>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="propData.data.current_page" :page-sizes="[25, 50, 100, 200]" :page-size="25" layout="sizes, prev, pager, next" :total="1000">
    </el-pagination>
  </section>
</template>
<script>
import Templatetableinnertype from "./Template.tableinnertype.vue";
export default {
  name: "Templatetableinsert",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData: {
      type: Array | Object
    }
  },
  data() {
    return {
      collength: this.propData.field.length,
      more: null,
      order: "",
      view: [],
      viewText: null,
      morebtn: false,
      innerData: {
        field: this.propData.innerField,
        data: [],
        rowKey: this.propData.innerKey
      }
    };
  },
  computed: {},
  components: {
    Templatetableinnertype
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
    moreRow(row, key) {
      const url = "/api/admin/search/detect/list/file/" + key;
      if (this.more === row) {
        this.more = null;
      } else {
        this.more = row;
        console.log(url);
        const data = {
          page: 1,
          length: 9007199254740991,
          dept_code: this.propData.dept_code || "",
          node_id: this.propData.node_id || "",
          startDate: this.propData.startDate,
          endDate: this.propData.endDate
        };
        this.$http
          .get(url, {
            params: data
          })
          .then(result => {
            //this.innerData.data = result.data.data;
            console.log(result.data.data);
            //this.innerData.data  = this.getValueEx(result.data.data, this.propData.innerKey);
            this.innerData.data = result.data.data;
          });
      }
    },
    reorder(val) {
      this.$emit("reorder", {
        order: val,
        form: this.propData.search,
        url: this.propData.url
      });
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
    //console.log(this.propData)
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fa {
    transition: all 0.3s ease;
    &.rotate {
      transform: rotateZ(-180deg);
      transform-origin: 44% 50%;
    }
  }
  .col-end[hidden] {
    display: none;
  }
  .show-row:hover {
    background-color: transparent;
  }
  .el-pagination {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
