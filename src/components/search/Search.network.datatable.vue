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
                         v-if="i !== 0">
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
                :class="['col'+i,{ 'col-end' : definition.field.length-1 === i }]" :ref="'checkedTh'">{{th}}
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
              <td class="col0">{{row.connected}}</td>
              <td class="col1">{{row.nodeid}}</td>
              <td class="col2">{{row.username}}</td>
              <td class="col3">{{row.userdept}}</td>
              <td class="col4">{{row.userpc}}</td>
              <td class="col5">{{row.Direction}}</td>
              <td class="col6">{{row.LocalIp}}</td>
              <td class="col7">{{row.LocalPort}}</td>
              <td class="col6">{{row.RemoteIp}}</td>
              <td class="col7">{{row.RemotePort}}</td>
              <td class="col8">{{row.Protocol}}</td>
              <td class="col8">{{row.EventTime}}</td>
            </tr>
            <transition name="fade">
              <tr v-if="row === more" class="show-row">
                <td :colspan="colLength" :key="row.id">
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

  export default {
    name: "NetworkDataTable",
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
        view: [],
        morebtn: false,
        innerData: {
          processData: [],
          fileData: [],
          checkData: [],
        },
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
    components: {},
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
                if (result.data.total) {
                  this.pagination.total = result.data.total;
                }
                else {
                  this.pagination.total = 0;
                }
                this.data = result.data;
              }
            });
      },
      viewCheck() {
        if (this.$refs.checkedRow !== undefined) {
          for (let j = 0; j < this.$refs.checkedRow.length; j++) {
            for (let i = 0; i < this.definition.field.length - 1; i++) {
              this.$refs.checkedTh[i+1].hidden = this.$refs.checked[i].isChecked;
              this.$refs.checkedRow[j].children[i+1].hidden = this.$refs.checked[i].isChecked;
            }
          }
        } else {
          this.view = [];
        }
      },
      rowRoute(val) {
        this.$router.push({path: "Search-analysis", query: val});
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

      this.$bus.$on('network-search-form', (data) => {
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
      this.$bus.$off('network-search-form');
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
