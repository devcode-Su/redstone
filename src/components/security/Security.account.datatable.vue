<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <!--<el-button size="small">-->
          <!--파일로 저장-->
          <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
        <el-select v-model="selectedOrder" placeholder="정렬" size="small" @change="handleOrderChange" disabled>
          <el-option v-for="(option, k, i) in definition.order" :key="k" :label="option.label"
                     :value="option.value"></el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in definition.fields" :label="k" :key="k" :disabled="i === 0">
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
            <th v-for="(th,k) in definition.fields" :key="k" :class="'col-'+k" :ref="k">{{th.label ? th.label : th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <template v-if="!tableData">
            <tr>
              <td data-none-data="screen">검색된 데이터가 없습니다.</td>
            </tr>
          </template>
          <template v-else>
            <tr data-tbody="row" v-for="row in tableData" :key="row.id">
              <td class="col-connected" :class="'turn'+row.node_connected.connected">
                <span class="icon">
                  <i class="fa fa-power-off" aria-hidden="true"></i>
                </span>
              </td>
              <td v-for="(td,k) in definition.fields" :key="td.id" :class="'col-'+k" :ref="k">
                {{td.data ? td.data(row, k) : row[k]}}
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <spinner v-if="getLoad"></spinner>
    </div>
    <!--<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"-->
                   <!--:current-page.sync="pagination.page" :page-sizes="[50, 100, 200, 500]" :page-size="50"-->
                   <!--layout="sizes, prev, pager, next" :total="pagination.total">-->
    <!--</el-pagination>-->
    <paginations :paging="pagingData" @pageLength="pageLength"></paginations>
  </section>
</template>
<script>
  import Spinner from "@/components/template/Spinner";
  import Paginations from "../template/Template.paginations";
  export default {
    name: "DatatableTable",
    props: {
      formData: {
        type: Object,
        default: function () {
          return { message: 'do not' }
        }
      },
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
        getLoad : false,
        selectedOrder: null,
        moreBtn: false,
        responseData:[],
        viewChecked: Object.keys(this.definition.fields),
        pagination: {
          total: 0,
          page: 1,
        },
        pagingData:[],
        form: {},
        tableData: [],
        hasSearchOption: false,
      };
    },
    computed: {},
    components: {
      "paginations" :Paginations,
      "spinner":Spinner
    },
    watch: {
      definition(n, o) {
        this.hasSearchOption = false;
        this.form = {};
        this.data = [];
        this.viewChecked = Object.keys(this.definition.fields);
      },
      formData(d){
        if(d){
          console.log(d);
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
          this.form.page = 1;
          this.form.length = 50;
          console.log(this.form);
          this.receiveSearch()
        }
      },
      responseData(t){
        if(t){
          console.log(t);
          let data = t.data.data.map(d => {
            if (d.hasOwnProperty('info')) {
              d.info = d.info.reduce((p, c) => {
                p[c.name] = c.value;
                return p;
              }, {});
            }
            return d;
          });
          this.tableData = data;
          this.pagingData = {
            current_page : t.data.current_page,
            pageSize : this.form.length,
            total : t.data.total,
          };
          return t
        }
      },
    },
    methods: {
      receiveSearch(){
        //console.log(this.form);
        const type = this.form.nodeid ? "node" : "dept";
        const url = `${this.definition.url}/${type}/${this.form.dept_code}`;
        this.getLoad = true;
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          console.log(response);
          this.responseData = response;
          this.getLoad = false;
        })
      },
      getData() {
        this.getLoad = true;
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

        let url = `${this.definition.url}/${type}/${code}`;
        this.$http.get(url, {params: this.form})
          .then((response) => {
            //console.log(response)
            let data = response.data.data.map(d => {
              if (d.hasOwnProperty('info')) {
                d.info = d.info.reduce((p, c) => {
                  p[c.name] = c.value;
                  return p;
                }, {});
              }
              return d;
            });
            //console.log(data);
            this.data = data;
            this.pagination.total = response.data.total;
            this.getLoad = false;
          });
      },
      handleOrderChange(v) {
        this.form.order = v;
        this.form.page = 1;
        this.getData(1);
      },
      handleSizeChange(v) {
        this.form.lenght = v;
        this.getData();
      },
      handlePageChange(v) {
        this.form.page = v;
        this.getData(v);
      },
      colView(val) {
        const checkArr = Object.keys(this.definition.fields);
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
      pageLength(p){
        //console.log(p)
        this.form.length = p.length ? p.length : this.form.length ;
        this.form.page = p.current_page ? p.current_page : this.form.page;
        this.receiveSearch();
      }
    },
    beforeCreate() {
    },
    created() {
      // this.$bus.$on('security-account', (d) => {
      //   //console.log(d)
      //   this.hasSearchOption = true;
      //   for (let key in d) {
      //     if (d.hasOwnProperty(key)) {
      //       if (d[key] instanceof Date) {
      //         this.form[key] = d[key].getTime();
      //       }
      //       else {
      //         this.form[key] = d[key];
      //       }
      //     }
      //   }
      //   //console.log(this.form)
      //   this.getData(1);
      // });
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
