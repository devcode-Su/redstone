<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <!--<el-button size="small">-->
          <!--파일로 저장-->
          <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k, i) in definition.order" :key="k" :label="option" :value="k"></el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in definition.fields" :label="k" :key="k" :disabled="i < 2">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div data-table="table">
      <span data-table="total">전체 : {{total}} 건</span>
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th v-for="(th,k) in definition.fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
            <th class="col-moreBtn"><span>더보기</span></th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <tr v-if="stateReorder">
            <td v-if="!getLoad" data-none-data="screen">검색된 데이터가 없습니다.</td>
          </tr>
          <template v-else v-for="(row, i) in tableData" >
            <tr data-tbody="row"  :key="row.id" @click="rowRoute(row)">
              <!--<td v-for="(td,k) in definition.fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>-->
              <td class="col-EventTime" ref="EventTime">{{row.EventTime}}</td>
              <td class="col-ProcessName" ref="ProcessName">{{row.ProcessName}}</td>
              <td class="col-username" ref="username">{{row.username}}</td>
              <td class="col-userdept" ref="userdept">{{row.userdept}}</td>
              <td class="col-nodeid" ref="nodeid">{{row.nodeid}}</td>
              <td class="col-event_count" ref="event_count">
                <span>프로세스:{{row.AggProcess}}, </span>
                <span>네트워크:{{row.AggNetwork}}, </span>
                <span>파일:{{row.AggFile}}, </span>
                <span>레지스트리:{{row.AggRegistry}}</span>
              </td>
              <td class="col-event_info" ref="event_info">
                <span v-if="row.DetectFILE">TI 진단 이벤트 : {{row.DetectFILE}}</span>
                <span v-if="row.DetectIP">악성 URL/IP 접근 이벤트 : {{row.DetectIP}}</span>
                <span v-if="row.DetectRSC">RSC 엔진 진단 이벤트 : {{row.DetectRSC}}</span>
              </td>
              <td class="col-moreBtn">
                <button data-icon @click.stop="moreRow(i)" :class="{on : i === more}">
                  <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : i === more}"></i>
                </button>
              </td>
            </tr>
            <transition name="fade">
              <tr data-tboy="hide-row" v-if="i === more">
                <td :colspan="Object.keys(definition.fields).length +1">
                  <process-inner :process-guid="row.ProcessGuid"></process-inner>
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
  import { mapGetters } from "vuex";
  import ProcessInner from "./Search.process.inner";
  import Paginations from "../template/Template.paginations";
  import Spinner from "@/components/template/Spinner";
  export default {
    name: "InfoDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      formData: {
        type: Object,
        default: function () {
          return { message: 'do not' }
        }
      },
      definition : {
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
        total : "-",
        tableData: [],
        processGuid : "",
        pagingData:[],
        viewChecked: "",
        form: {}
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length;
      },
      ...mapGetters({
        selectData : "dashboardData"
      })
    },
    components: {
      "process-inner" : ProcessInner,
      "paginations" :Paginations,
      "spinner":Spinner
    },
    watch: {
      responseData(t){
        if(t.rows){
          console.log(t);
          this.tableData = t.rows;
          this.total = t.metrics.resultCount;
          this.pagingData = {
            current_page : this.form.page,
            total : this.total
          };
          return t
        }else{
          console.log("no");
          this.tableData = [];
        }
      },
      formData(f){
        if(f){
          console.log("프로세스 폼");
          console.log(f);
          this.form = f;
          this.receiveSearch();
        }
      }
      // tableData(t){
      //   if(t){
      //     //console.log(this.selectData.rowNum);
      //     if(this.selectData.rowNum !== undefined){
      //       //console.log("ready!");
      //       this.rowSearch(this.selectData.rowNum);
      //     }
      //   }
      // }
    },
    methods: {
      receiveSearch(){
        //console.log(this.form);
        this.getLoad = true;
        const url = "/api/admin/search/event/";
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          this.getLoad = false;
          this.responseData = response.data
          //console.log(this.responseData)
        })
      },
      reorder(v){
        //console.log(v);
        this.form.order = v;
        //console.log(this.form);
        this.receiveSearch();
      },
      colView(val){
        const checkArr = Object.keys(this.definition.fields);
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
        this.$router.push({path: "Search-analysis", query: {ProcessGuid: val.ProcessGuid, nodeid: val.nodeid}});
      },
      moreRow(num){
        if(this.more === num){
          this.more = null;
        }else{
          this.more = num;
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
      this.viewChecked = Object.keys(this.definition.fields);
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
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:10px;
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
  [data-table]{
    [data-tbody="tbody"].screen{
      min-height:499px;
      max-height:499px;
    }
    [data-none-data="screen"]{
      height:498px !important;
    }
  }

</style>
