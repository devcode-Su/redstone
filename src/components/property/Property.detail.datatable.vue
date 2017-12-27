<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <!--<el-button size="small">-->
          <!--파일로 저장-->
          <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k, i) in fields" :key="option" :label="option" :value="k"></el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in fields" :label="k" :key="k" :disabled="i === 0">{{check}}</el-checkbox>
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
            <th v-for="(th,k) in fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
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
          <tr data-tbody="row" v-else v-for="row in tableData" :key="row.id" @click="rowDetail(row)">
            <td class="col-connected" :class="'turn'+row.connected">
              <span class="icon">
                <i class="fa fa-power-off" aria-hidden="true"></i>
              </span>
            </td>
            <td v-for="(td,k) in fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>
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
  import Spinner from "@/components/template/Spinner";
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
      }
    },
    data() {
      return {
        getLoad : false,
        moreBtn : false,
        fields: {
          nodeid : "센서 ID",
          username : "사용자명",
          usergroup : "부서명",
          computer : "PC 명",
          ip : "PC IP 주소",
        },
        orderOption : {
          nodeid : "센서 ID",
          username : "사용자명",
          usergroup : "부서명",
          ip : "PC IP 주소",
          computer : "컴퓨터명",
          connected : "접속"
        },
        responseData : [],
        tableData: [],
        pagingData:[],
        viewChecked: null,
        urlType : "",
        api : "",
        dept_code: 1,
        nodeid : "",
        version:"",
        name : "",
        form: {
          page : 1,
          length : 50,
          order : 'nodeid',
          direction : 0
        },
        apiUrl : ''
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      },
      ...mapGetters({
        globalRangeCode: "globalRangeCode",
      })
    },
    components: {
      "paginations" :Paginations,
      "spinner":Spinner
    },
    watch: {
      formData(d) {
        if(d){
          //console.log(d);
          this.apiUrl = d.url;
          this.urlType = d.urlType;
          this.name = encodeURIComponent(d.name);
          this.version = d.version;
          this.api = d.api;
          this.receiveSearch();
          return d;
        }
      },
      responseData(t){
        if(t){
          //console.log(t);
          this.tableData = t.data;
          this.pagingData = {
            current_page : t.current_page,
            pageSize : this.form.length,
            total : t.total,
          };
          return t
        }
      },
    },
    methods: {
      defaultSet(){
        this.dept_code = this.globalRangeCode.dept_code;
        this.nodeid = this.globalRangeCode.nodeid;
      },
      receiveSearch(){
        const type = this.nodeid ? "node" : "group";
        const code = this.nodeid ? this.nodeid : this.dept_code;
        let url;
        this.getLoad = true;
        if(this.urlType === "software"){
          if(this.api === "os"){
            url = `/api/admin/node/list/${this.api}/${this.name}/${this.version}/${type}/${code}`;
          }else{
            url = `/api/admin/node/list/software/${type}/${code}/${this.name}/${this.version}`;
          }
        }else if(this.urlType === 'hardware'){
          url = `/api/admin/node/list/hardware/${this.api}/${type}/${code}/${this.name}`;
        }

        this.$http.get(url, {
          params : this.form
        }).then( response => {
          this.responseData = response.data;
          this.getLoad = false;
        });
      },
      reorder(v){
        //console.log(v);
        this.form.order = v;
        this.form.page = 1;
        this.form.length = 50;
        //console.log(this.form);
        this.receiveSearch();
      },
      colView(val){
        const checkArr = Object.keys(this.fields);
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
      rowDetail(row){
        //console.log(row);
        this.$store.commit(Constant.DETAIL_PC, row);
        this.$emit("modal");
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
      this.viewChecked = Object.keys(this.fields);
      this.defaultSet();
      this.receiveSearch();
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
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:20px;
    .col-count,
    .col-sp{
      width:100px;
      text-align:center;
    }
    .col-version{
      width:300px;
    }
  }
  [data-tbody="tbody"]{
    height:598px !important;
  }
  [data-none-data="screen"]{
    height:597px !important;
  }
  .col-username,
  .col-userdept,
  .col-userpc{
    width:auto;
  }
  .col-userip{
    width:200px;
  }
</style>
