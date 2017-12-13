<template>
  <section data-table-wrap>
    <header data-table="header">
      <p data-range>
        <span v-if="globalRangeCode.name">{{globalRangeCode.name}}</span>
        <span v-else>
        {{globalRangeCode.dept.name}} / {{globalRangeCode.username}}
        <button data-icon @click="resetRange">
          <i class="fa fa-times-circle"></i>
        </button>
      </span>
        에서 검색
      </p>
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
            <th v-for="(th,k,i) in localData.fields" :key="k" :class="['col-'+k,{'th-end' : i === viewChecked.length - 1}]" :ref="k">{{th}}</th>
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
          <tr data-tbody="row" v-else v-for="row in tableData" :key="row.id">
            <td class="col-connected" >
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
  import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import Paginations from "../template/Template.paginations"
  export default {
    name: "PropertyDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      formData: {
        type: Object,
        default: function () {
          return { message: 'do not' }
        }
      },
      localData : {
        type: Object,
        default: function () {
          return {message: 'do not'}
        }
      }
    },
    data() {
      return {
        more: null,
        moreBtn : false,
        responseData : [],
        tableData: [],
        pagingData:[],
        viewChecked: Object.keys(this.localData.fields),
        form: {
          page : 1,
          length : 50,
          dept_code : 1,
          nodeid : '',
          order : '',
          direction : 0
        },
        apiUrl : ''
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      },
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "paginations" :Paginations
    },
    watch: {
      globalRangeCode(c){
        if(c){
          console.log(c);
          this.form.dept_code = c.dept_code;
          this.form.nodeid = c.nodeid ? c.nodeid : '';
        }
      },
      formData(d) {
        if(d){
          console.log("alive?");
          this.apiUrl = d.url;
          this.form.order = d.order;
          this.receiveSearch();
          return d;
        }
      },
      responseData(t){
        if(t){
          console.log(t);
          this.tableData = t.data;
          this.pagingData = {
            current_page : t.current_page,
            total : t.total,
          };
          return t
        }
      },
    },
    methods: {
      resetRange() {
        this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
          dept_code: 1,
          name: "전사"
        });
      },
      receiveSearch(){
        console.log(this.form);
        const type = this.form.nodeid ? "node" : "group";
        const code = this.form.nodeid ? this.form.nodeid : this.form.dept_code;
        const url =  this.apiUrl + type + "/" + code;
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          console.log(response);
          this.responseData = response.data
        })
      },
      reorder(v){
        console.log(v);
        this.form.order = v;
        console.log(this.form);
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
      rowSearch(row){
        if(this.more === row){
          this.more = null;
        }else{
          this.more = row;
          const url = "/api/admin/search/detect/list/" + this.localData.name + "/"+ row[this.localData.apiCondition];
          this.$http.get(url, {
            params : this.form
          }).then(response => {
            console.log(response);
            this.insertTable = response.data.data;
          });
        }
      },
      pageLength(p){
        this.form.length = p.length ? p.length : this.form.length ;
        this.form.page = p.current_page ? p.current_page : this.form.page;
        this.receiveSearch();
      }
    },
    beforeCreate() {
    },
    created() {
      console.log(this.apiUrl)
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      console.log(this.formData)
    },
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:50px;
    .col-count,
    .col-sp{
      width:110px;
      text-align:center;
    }
    .col-version{
      width:auto;
    }
  }
  [data-table="header"]{
    padding-top:5px;
    border-top:1px solid color(border)
  }
  [data-range] {
    margin-bottom:0;
    padding-right:5px;
    top:-25px;
  }
  [data-tbody="tbody"]{
    height:645px !important;
  }
  [data-none-data="screen"]{
    height:644px !important;
  }
</style>
