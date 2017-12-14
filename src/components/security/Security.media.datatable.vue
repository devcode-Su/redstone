<template>
  <section data-table-wrap v-if="definition">
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-if="definition.order" v-model="selectedOrder" placeholder="정렬" size="small"
                   @change="handleOrderChange('change', $event)"
                   @input="handleOrderChange('input', $event)">
          <el-option v-for="item in definition.order" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="isOrderListOpen = !isOrderListOpen" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : isOrderListOpen }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="isOrderListOpen" @change="colView">

            <el-checkbox v-for="(check,k,i) in definition.field" :label="k" :key="k" :disabled="i === 0">{{check}}
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
            <th v-for="(th,k) in definition.field" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <tr v-if="!data || !data.data || !data.data.length">
            <td data-none-data="screen">검색된 데이터가 없습니다.</td>
          </tr>
          <tr data-tbody="row" v-else v-for="row in data.data" :key="row.id">
            <th class="col-connected">
                <span class="icon">
                  <i class="fa fa-power-off" aria-hidden="true"></i>
                </span>
            </th>
            <td v-for="(td,k) in definition.field" :key="td.id" :class="'col-'+k" :ref="k">{{row[k]}}</td>
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
    name: "DatatableTable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.

      definition: {
        type: Object,
        required: true,
        default: function () {
          return {
            url: '',
            field: [],
            order: null,
          }
        },
      },
    },
    data() {
      return {
        isOrderListOpen: false,
        data: null,
        pagination: {page: 1, length: 50, total: 0},
        viewChecked: Object.keys(this.definition.field),
        form: {
          dept_code: null,
          endDate: null,
          nodeid: null,
          startDate: null,
        },
        selectedOrder: null,
        selectedDirection: 1,
        lastOrder: null,
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      getData(page = null, length = null) {
        let url = this.definition.url;
        if (this.form.nodeid) {
          url += `/node/${this.form.nodeid}`;
        }
        else if (this.form.dept_code) {
          url += `/dept/${this.form.dept_code}`;
        }

        this.form.page = page || this.form.page;
        this.form.length = length || this.form.length;
        this.form.order = this.selectedOrder;
        this.form.direction= this.selectedDirection;
        this.lastOrder = this.form.order;

        this.$http.get(url, {params: this.form})
            .then((response) => {
              this.data = response.data;
              this.pagination.total = response.data.total;
            });
      },
      handleOrderChange(type, val) {
        switch (type) {
          case 'change':
            this.selectedOrder = val;
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
      handleSizeChange(p) {
        this.getData(null, p);
      },
      handleCurrentChange(p) {
        this.getData(p);
      },
    },
    beforeCreate() {
    },
    created() {
      this.$bus.$on('security-media', (d) => {
        for (let key in d) {
          if (d.hasOwnProperty(key)) {
            this.form[key] = d[key];
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
      this.$bus.$off('security-media');
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

  .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
</style>
