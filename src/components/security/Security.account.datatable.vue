<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="selectedOrder" placeholder="정렬" size="small" @change="handleOrderChange">
          <el-option v-for="(option, k, i) in definition.order" :key="k" :label="option.label"
                     :value="option.value"></el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in definition.field" :label="k" :key="k" :disabled="i === 0">
              {{check.label ? check.label : check}}
            </el-checkbox>
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
            <th v-for="(th,k) in definition.field" :key="k" :class="'col-'+k" :ref="k">{{th.label ? th.label : th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <template v-if="!data || data.length === 0">
            <tr>
              <td data-none-data="screen">검색된 데이터가 없습니다.</td>
            </tr>
          </template>
          <template v-else>
            <tr data-tbody="row" v-for="row in data" :key="row.id">
              <th class="col-connected">
                <span class="icon">
                  <i class="fa fa-power-off" aria-hidden="true"></i>
                </span>
              </th>
              <td v-for="(td,k) in definition.field" :key="td.id" :class="'col-'+k" :ref="k">
                {{td.data ? td.data(row, k) : row[k]}}
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
                   :current-page.sync="pagination.page" :page-sizes="[50, 100, 200, 500]" :page-size="50"
                   layout="sizes, prev, pager, next" :total="pagination.total">
    </el-pagination>
  </section>
</template>
<script>
  export default {
    name: "DatatableTable",
    props: {
      definition: {
        type: Object,
        required: true,
        default: function () {
          return {field: {}, order: []};
        },
      },
    },
    data() {
      return {
        selectedOrder: null,
        moreBtn: false,
        viewChecked: Object.keys(this.definition.field),
        pagination: {
          total: 0,
          page: 1,
        },
        form: {},
        data: [],
        hasSearchOption: false,
      };
    },
    computed: {},
    components: {},
    watch: {
      definition(n, o) {
        this.hasSearchOption = false;
        this.form = {};
        this.data = [];
        this.viewChecked = Object.keys(this.definition.field);
      },
    },
    methods: {
      getData(page, length) {
        if (!this.hasSearchOption) {
          return false;
        }
        let type;
        let code;
        if (this.form.nodeid) {
          type = 'node';
          code = this.form.nodeid;
        }
        else {
          type = 'dept';
          code = this.form.dept_code || 1;
        }

        this.form.order = this.selectedOrder;

        let url = `${this.definition.url}/${type}/${code}`;
        this.$http.get(url, {params: this.form})
            .then((response) => {
              let data = response.data.data.map(d => {
                if (d.hasOwnProperty('info')) {
                  d.info = d.info.reduce((p, c) => {
                    p[c.name] = c.value;
                    return p;
                  }, {});
                }
                return d;
              });
              this.data = data;
              this.pagination.total = response.data.total
            });
      },
      handleOrderChange(v) {
        this.selectedOrder = v;
        this.getData(1);
      },
      handleSizeChange(v) {
        this.getData(null, v);
      },
      handlePageChange(v) {
        this.getData(v);
      },
      colView(val) {
        const checkArr = Object.keys(this.definition.field);
        for (let i = 0; i < checkArr.length; i++) {
          let f = val.indexOf(checkArr[i]);
          if (f === -1) {
            let j = this.$refs[checkArr[i]].length;
            while (j--) {
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
    },
    beforeCreate() {
    },
    created() {
      this.$bus.$on('security-account', (d) => {
        this.hasSearchOption = true;
        for (let key in d) {
          if (d.hasOwnProperty(key)) {
            if (d[key] instanceof Date) {
              this.form[key] = d[key].getTime();
            }
            else {
              this.form[key] = d[key];
            }
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
      this.$bus.$off('security-account');
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

  [data-table-wrap] {
    margin-top: 30px;
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
    .show-row:hover {
      background-color: transparent;
    }
  }

  [data-tbody] {

  }
</style>
