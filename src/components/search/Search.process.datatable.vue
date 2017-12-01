<template>
  <section class="template-table-wrap">
    <header>
      <span>전체 : {{propData && propData.data ? propData.data.total : '-'}}건</span>
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
              <th v-for="(th, i) in propData.field" :key="th.id" :class="['col'+i,{ 'col-end' : propData.field.length-1 === i }]" :ref="'checkedTh'">{{th}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
            <template v-for="(row,i) in propData.data">
              <tr :ref="'checkedRow'" :key="row.id" @click="rowRoute(row)">
                <td class="col0">{{row.EventTime}}</td>
                <td class="col1">{{row.ProcessName}}</td>
                <td class="col2">{{row.username}}</td>
                <td class="col3">{{row.userdept}}</td>
                <td class="col4">{{row.nodeid}}</td>
                <td class="col5">
                  <span>프로세스:{{row.AggProcess}}, </span>
                  <span>네트워크:{{row.AggNetwork}}, </span>
                  <span>파일:{{row.AggFile}}, </span>
                  <span>레지스트리:{{row.AggRegistry}}</span>
                </td>
                <td class="col6">
                  <span v-if="row.DetectFILE">TI 진단 이벤트 : {{row.DetectFILE}}</span>
                  <span v-if="row.DetectIP">악성 URL/IP 접근 이벤트 : {{row.DetectIP}}</span>
                  <span v-if="row.DetectRSC">RSC 엔진 진단 이벤트 : {{row.DetectRSC}}</span>
                </td>
                <td class="col-btn">
                  <button class="icon-btn icon-wrap" @click.stop="moreRow(row, i)" :class="{on : row === more}">
                    <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
                  </button>
                </td>
              </tr>
              <transition name="fade">
                <tr v-if="row === more" class="show-row">
                  <td :colspan="collength" :key="row.id">
                    <processinnerview :propData="innerData"></processinnerview>
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
import Processinnerview from "./Search.process.innerview.vue";
//import { EventBus } from "@/main"
export default {
  name: "Processdatatable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData: {
      type: Array | Object
    }
  },
  data() {
    return {
//      collength: this.propData.field.length,
      collength: 0,
      more: null,
      order: "",
      view: [],
      viewText: null,
      morebtn: false,
      innerData: {
        processData: [],
        fileData: [],
        checkData: []
      }
    };
  },
  computed: {},
  components: {
    Processinnerview
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
    rowRoute(val){
      this.$router.push({path:"Search-analysis", query: {ProcessGuid: val.ProcessGuid, nodeid: val.nodeid}});
    },
    moreRow(row) {
      const prcessUrl = "/api/admin/search/process/info/" + row.ProcessGuid;
      const fileUrl =
        "/api/admin/search/file/info/master/process_guid/" + row.ProcessGuid;
      const cehckUrl = "/api/admin/search/process/detect/" + row.ProcessGuid;
      if (this.more === row) {
        this.more = null;
      } else {
        this.more = row;
        console.log(row);
        this.$http.get(prcessUrl).then(result => {
          console.log(result.data);
          this.innerData.processData = result.data.rows;
        });
        this.$http.get(fileUrl).then(result => {
          console.log(result.data);
          this.innerData.fileData = result.data;
        });
        this.$http.get(cehckUrl).then(result => {
          console.log(result.data);
          this.innerData.checkData = result.data;
        });
        //this.innerData.data = row
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
    //console.log(this.propData.data);
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
