<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <!--<el-button size="small">-->
          <!--파일로 저장-->
          <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
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
            <th class="col-moreBtn"><span>더보기</span></th>
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
          <template v-else v-for="row in tableData">
            <tr data-tbody="row" :key="row.id">
              <td class="col-connected" :class="'turn-'+row.node.node_connected.connected" >
                <span class="icon">
                  <i class="fa fa-power-off" aria-hidden="true"></i>
                </span>
              </td>
              <td v-for="(td,k) in localData.fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>
              <td class="col-moreBtn">
                <button class="icon-btn icon-wrap" @click="rowSearch(row)" :class="{on : row === more}">
                  <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
                </button>
              </td>
            </tr>
            <transition name="fade">
              <tr data-tboy="hide-row" v-if="row === more">
                <td :colspan="Object.keys(localData.fields).length +2">
                  <diagnosis-inserttable :fields="localData.insertFields" :prop-data="insertTable"></diagnosis-inserttable>
                </td>
              </tr>
            </transition>
          </template>
          </tbody>
        </table>
      </div>
      <spinner v-if="getLoad"></spinner>
    </div>
    <paginations :paging="pagingData" @pageLength="pageLength"></paginations>
  </section>
</template>
<script>
  import DiagnosisInserttable from "./Diagnosis.pc.insert.table";
  import Paginations from "../template/Template.paginations";
  import windowOpenMixin from "../mixins/window.open.mixin";
  import Spinner from "@/components/template/Spinner";
  export default {
    name: "DatatableTable",
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
        getLoad : false,
        more: null,
        moreBtn : false,
        responseData : [],
        tableData: [],
        insertTable:[],
        pagingData:[],
        viewChecked: Object.keys(this.localData.fields),
        apiUrl : "",
        form: {
          page : 1,
          length : 50,
          dept_code : '',
          endDate : '',
          nodeid : '',
          startDate : '',
          order : '',
          direction : 1
        }
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      }
    },
    components: {
      "diagnosis-inserttable":DiagnosisInserttable,
      "paginations" :Paginations,
      "spinner":Spinner
    },
    watch: {
      formData(d) {
        if(d){
          if(d.form){
            this.form.dept_code = d.form.dept_code;
            this.form.nodeid = d.form.nodeid;
            this.form.startDate = d.form.startDate ? d.form.startDate.getTime() : null;
            this.form.endDate = d.form.endDate ? d.form.endDate.getTime() : null;
            this.form.order = d.order;
            this.apiUrl = d.url;
            this.receiveSearch();
          }
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
      receiveSearch(){
        //console.log(this.form);
        const url = this.apiUrl;
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          //console.log(response);
          this.responseData = response.data
        })
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
          const url = "/api/admin/search/detect/list/pc/" + this.localData.name + "/"+ row.nodeid;
          //console.log(url)
          this.$http.get(url, {
            params : this.form
          }).then(response => {
            //console.log(response);
            this.insertTable = response.data.data;
          });
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
      console.log(this.localData)
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
    },
    mixins : [windowOpenMixin]
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

  [data-table] {
    .col-userdept,
    .col-userpc,
    .col-userip{
      width:auto;
    }
  }
</style>
