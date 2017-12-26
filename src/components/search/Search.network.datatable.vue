<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small" v-if="false">
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
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in definition.fields" :label="k" :key="k" :disabled="i < 2">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div data-table="table">
      <span data-table="total">전체 : {{pagination.total || "-"}} 건</span>
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th class="col-connected"><span>접속</span></th>
            <th v-for="(th, i) in definition.fields" :key="th.id"
                :class="['col-'+i]">{{th}}
            </th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <tr v-if="!data">
            <td data-none-data="screen">검색된 데이터가 없습니다.</td>
          </tr>
          <tr data-tbody="row" v-else v-for="(row,i) in data.rows" :key="row.id" @click.stop="rowRoute(row)">
            <td class="col-connected" :class="'turn'+ row.connected" >
                <span class="icon">
                  <i class="fa fa-power-off" aria-hidden="true"></i>
                </span>
            </td>
            <td class="col-nodeid">{{row.nodeid}}</td>
            <td class="col-username">{{row.username}}</td>
            <td class="col-userdept">{{row.userdept}}</td>
            <td class="col-userpc">{{row.userpc}}</td>
            <td class="col-Direction">{{row.Direction}}</td>
            <td class="col-LocalIp">{{row.LocalIp}}</td>
            <td class="col-LocalPort">{{row.LocalPort}}</td>
            <td class="col-RemoteIp">{{row.RemoteIp}}</td>
            <td class="col-RemotePort">{{row.RemotePort}}</td>
            <td class="col-Protocol">{{row.Protocol}}</td>
            <td class="col-EventTime">{{row.EventTime}}</td>
          </tr>
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
    name: "SearchNetworkDataTable",
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
        moreBtn: false,
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
    computed: {
    },
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
              console.log(result.data)
            }
          });
      },
      colView(val){
        const checkArr = Object.keys(this.localData.fields);
        for(var i=0; i < checkArr.length; i++){
          let f = val.indexOf(checkArr[i]);
          if(f === -1){
            let j = this.$refs[checkArr[i]].length;
            while(j--){
              this.$refs[checkArr[i]][j].hidden = true;
            }
          }
          else {
            this.$refs[checkArr[i]].forEach((item) => {
              item.hidden = false;
            });
          }
        }
      },
      rowRoute(val) {
        console.log(val);
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
      console.log(this.definition)
      if (this.definition && this.definition.field) {
        this.colLength = this.definition.field.length;
      }
      if (this.definition && this.definition.order && this.definition.order.length > 0) {
        this.selectedOrder = this.definition.order[0].value;
      }

      this.$bus.$on('network-search-data', (data) => {
        console.log(data);
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
      this.$bus.$off('network-search-data');
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
