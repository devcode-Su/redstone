<template>
  <section data-table-wrap v-if="definition">
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-if="definition.order" v-model="selectedOrder" placeholder="정렬" size="small"
                   @change="changeOrder('change', $event)"
                   @input="changeOrder('input', $event)">
          <el-option v-for="item in definition.order" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in definition.field" :label="k" :key="k" :disabled="i === 0">{{check}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div data-table="table">
      <span data-table="total">전체 : {{pagingData.total || "-"}} 건</span>
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
    <paginations :paging="pagingData" @pageLength="pageLength"></paginations>
    <input v-model="pagingData.current_page">
  </section>
</template>
<script>
  import Paginations from "../template/Template.paginations"

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
        moreBtn: false,
        insertTable: [],
        data: null,
        pagingData: {current_page: 1, total: 0},
        viewChecked: Object.keys(this.definition.field),
        apiUrl: "",
        form: {
          page: 1,
          length: 50,
          dept_code: '',
          endDate: '',
          nodeid: '',
          startDate: '',
          order: '',
          direction: 1,
        },
        selectedOrder: null,
      };
    },
    computed: {},
    components: {
      "paginations": Paginations,
    },
    watch: {
      formData(d) {
        if (d) {
          this.form.dept_code = d.form.dept_code;
          this.form.nodeid = d.form.nodeid;
          this.form.startDate = d.form.startDate ? d.form.startDate.getTime() : null;
          this.form.endDate = d.form.endDate ? d.form.endDate.getTime() : null;
          this.form.order = d.form.order;
          this.apiUrl = d.url;
          this.receiveSearch();
          return d;
        }
      },
    },
    methods: {
      receiveSearch() {
        const url = this.definition.url;
        this.$http.get(url, {
          params: this.form,
        }).then(response => {
          console.log(response);
          this.responseData = response.data
        })
      },
      getData(page = null, length = null) {


        let url = this.definition.url;
        if (this.form.nodeid) {
          url += `/node/${this.form.nodeid}`;
        }
        else if (this.form.dept_code) {
          url += `/dept/${this.form.dept_code}`;
        }

        this.$http.get(url, {params: this.formData,})
            .then((response) => {
              this.data = response.data;
            });
      },
      changeOrder(type, val) {

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
      pageLength(p) {
        this.form.length = p.length;
        this.form.page = p.current_page;
        this.receiveSearch();
      },
    },
    beforeCreate() {
    },
    created() {
      this.$bus.$on('search-option', (d) => {
        console.log('recv', d, this.definition);
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
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off('search-option');
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
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
