<template>
  <section class="template-table-wrap process-data-table">
    <header>
      <span>전체 : {{pagination.total}}건</span>
      <div class="btn-wrap">
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="selectedOrder" placeholder="정렬" size="small"
                   @change="handleOrderChange('change', $event)"
                   @input="handleOrderChange('input', $event)"
                   :disabled="!definition.order.length">
          <el-option v-for="item in definition.order" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="morebtn = !morebtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : morebtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
            <el-checkbox v-for="(check,i) in definition.field" :label="check" :key="check" :ref="'checked'"
                         v-if="i !== definition.field.length -1">
              {{check}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div class="template-table dynamic-row">
      <div class="table-head-wrap">
        <table>
          <thead>
          <tr>
            <th v-for="(th, i) in definition.field" :key="th.id"
                :class="'col'+i" :ref="'checkedTh'">{{th}}
            </th>
            <th class="col7">
              <span>더보기</span>
            </th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody v-if="data">
          <template v-for="(row,i) in data.rows">
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
              <td class="col7">
                <button class="icon-btn icon-wrap" @click.stop="moreRow(row, i)" :class="{on : row === more}">
                  <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
                </button>
              </td>
            </tr>
            <transition name="fade">
              <tr v-if="row === more" class="show-row">
                <td :colspan="colLength+1" :key="row.id">
                  <processinnerview :ProcessGuid="row.ProcessGuid"></processinnerview>
                </td>
              </tr>
            </transition>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="pagination.page" :page-sizes="[25, 50, 100, 200]" :page-size="pagination.length"
                   layout="sizes, prev, pager, next" :total="pagination.total">
    </el-pagination>
  </section>
</template>
<script>
  import Processinnerview from "./Search.process.innerview.vue";
  export default {
    name: "Processdatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      definition: {
        type: Object,
        required: true,
        default: {
          order: [],
          field: [],
          url: '',
        },
      },
    },
    data() {
      return {
        colLength: 0,
        more: null,
        view: [
          "프로세스 시작 시각", "프로세스 이름", "이름", "부서", "센서 ID", "검색된 이벤트 수", "위협정보"
        ],
        morebtn: false,
        pagination: {
          page: 1,
          length: 50,
          total: 0,
        },
        data: null,
        searchOption: {},
        selectedOrder: null,
        selectedDirection: 1,
        lastOrder: null,
        hasSearchOption: false,
      };
    },
    computed: {},
    components: {
      "processinnerview": Processinnerview,
    },
    watch: {},
    methods: {
      getData(page = null, length = null) {
        if (!this.hasSearchOption) {
          return false;
        }
        if (page) {
          this.pagination.page = page;
        }
        if (length) {
          this.pagination.length = length
        }

        this.searchOption.page = this.pagination.page;
        this.searchOption.legnth = this.pagination.length;
        this.searchOption.order = this.selectedOrder ? this.selectedOrder : null;
        this.searchOption.direction = this.selectedDirection;
        this.lastOrder = this.searchOption.order;

        this.$http.get(this.definition.url, {params: this.searchOption})
            .then((result) => {
              if (result.data) {
                if (result.data.metrics && result.data.metrics.resultCount) {
                  this.pagination.total = result.data.metrics.resultCount;
                }
                else {
                  this.pagination.total = 0;
                }
                this.data = result.data;
              }
            });
      },
      viewCheck(val) {
        console.log(val)
        if (this.$refs.checkedRow !== undefined) {
          for (let j = 0; j < this.$refs.checkedRow.length; j++) {
            for (let i = 0; i < this.definition.field.length - 1; i++) {
              this.$refs.checkedTh[i].hidden = !this.$refs.checked[i].isChecked;
              this.$refs.checkedRow[j].children[i].hidden = !this.$refs.checked[i].isChecked;
            }
          }
        } else {
          this.view = [];
        }
      },
      rowRoute(val) {
        this.$router.push({path: "Search-analysis", query: {ProcessGuid: val.ProcessGuid, nodeid: val.nodeid}});
      },
      moreRow(row) {
        this.more = this.more ? null : row;
      },
      handleSizeChange(val) {
        this.pagination.length = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
        this.getData();
      },
      handleOrderChange(type, val) {
        switch (type) {
          case 'change':
            this.selectedDirection = 1;
            this.getData();
            break;
          case 'input':
            if (val === this.lastOrder) {
              this.selectedDirection = (this.selectedDirection - 1) * -1;
              this.getData();
            }
            break;
        }
      },
    },
    beforeCreate() {
    },
    created() {
      if (this.definition && this.definition.field) {
        this.colLength = this.definition.field.length;
      }
      if (this.definition && this.definition.order && this.definition.order.length > 0) {
        this.selectedOrder = this.definition.order[0].value;
      }

      this.$bus.$on('process-search-data', (data) => {
        console.log(data)
        this.hasSearchOption = true;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.searchOption[key] = data[key] ? data[key] : null;
          }
        }
        this.getData(1);
      });
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off('process-search-data');
    },
    destroyed() {
    },
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
    th,td{
      padding:0 10px;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow:hidden;
    }
    .col0{
      width:175px;
    }
    .col1{
      width:auto;
    }
    .col2,
    .col3{
      width:170px;
    }
    .col4{
      width:75px;
    }
    .col5,
    .col6{
      width: auto;
      span{
        display:inline;
      }
    }
    .col7{
      width:30px;
    }
    th.col7{
      span{
        visibility: hidden;
      }
    }
    td.col7{
      button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
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
    .el-checkbox-group{
      right:35px;
    }
    .template-table.dynamic-row{
      min-height:496px;
    }
  }
</style>
