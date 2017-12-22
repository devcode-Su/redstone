<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k, i) in localData.fields" :key="option" :label="option" :value="k"></el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in localData.fields" :label="k" :key="k" :disabled="i === 0">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div data-table="table">
      <span data-table="total">전체 : {{responseData.total || "-"}} 건</span>
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th class="col-connected"><span>접속</span></th>
            <th v-for="(th,k) in localData.fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
            <tr v-if="stateReorder">
              <td data-none-data="screen">검색된 데이터가 없습니다.</td>
            </tr>
            <tr data-tbody="row" v-for="row in tableData" :key="row.id">
              <td class="col-connected" :class="'status'+ row.wifi_status" >
              <span class="icon">
                <i class="fa fa-power-off" aria-hidden="true"></i>
              </span>
              </td>
              <td v-for="(td,k) in localData.fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <paginations :paging="pagingData" @pageLength="pageLength"></paginations>
  </section>
</template>
<script>
  import { mapGetters } from "vuex";
  import Paginations from "../template/Template.paginations"
  export default {
    name: "WirelessDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      localData : {
        type: Object,
        default: function () {
          return {message: 'do not'}
        }
      }
    },
    data() {
      return {
        moreBtn : false,
        responseData : [],
        tableData: [],
        insertTable:[],
        pagingData:[],
        viewChecked: "",
        form:{
          page:1,
          length:50,
          dept_code : 1,
          nodeid : null,
          startDate : null,
          endDate : null,
          order : ""
        }
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      },
      ...mapGetters({
        selectData : "dashboardData"
      })
    },
    components: {
      "paginations" :Paginations
    },
    watch: {
      responseData(t){
        if(t){
          //console.log(t);
          this.tableData = t.data;
          this.pagingData = {
            current_page : t.current_page,
            total : t.total,
          };
          return t
        }
      },
      tableData(t){
        if(t){
          console.log(this.selectData.rowNum);
          if(this.selectData.rowNum !== undefined){
            console.log("ready!");
            this.rowSearch(this.selectData.rowNum);
          }
        }
      }
    },
    methods: {
      receiveSearch(){
        console.log(this.form);
        const type = this.form.nodeid ? "nodeid" : "dept";
        const code = this.form.dept_code || this.form.nodeid;
        const url = `/api/admin/network/wireless/${type}/${code}`;
        console.log(url)
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          console.log(response);
          this.responseData = response.data
        });
      },
      reorder(v){
        //console.log(v);
        this.form.order = v;
        //console.log(this.form);
        this.receiveSearch();
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
      rowSearch(num){
        //console.log(num);
        //console.log(this.localData.name );
          let row = this.tableData[num];
          //console.log(row[this.localData.apiCondition]);
          const url = `/api/admin/search/detect/list/${this.localData.name }/${row[this.localData.apiCondition]}`;
          //console.log(url)
          this.$http.get(url, {
            params : this.form
          }).then(response => {
            //console.log(response);
            this.insertTable = response.data.data;
          });
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
      this.$bus.$on("wireless", form => {
        this.form.page = form.page;
        this.form.length = form.legnth;
        this.form.dept_code = form.dept_code;
        this.form.nodeid = form.nodeid;
        this.form.startDate = form.startDate;
        this.form.endDate = form.endDate;
        this.form.order = form.order;
        this.receiveSearch();
      })
    },
    beforeMounted() {
    },
    mounted() {
      //this.rowSearch(this.selectData.rowNum);
    },
    beforeUpdate() {
    },
    updated() {
      //this.rowSearch(this.selectData.rowNum);
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off("wireless")
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:30px;
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
