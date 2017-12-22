<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k, i) in localData.order" :key="option" :label="option" :value="k"></el-option>
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
            <tr data-tbody="row"  v-for="row in tableData" :key="row.id" @click.stop="moveRow(row)">
              <td class="col-connected" :class="'turn'+row.connected">
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
    name: "SearchFileDatatable",
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
        more: null,
        moreBtn : false,
        responseData : [],
        tableData: [],
        insertTable:[],
        pagingData:[],
        viewChecked: "",
        apiUrl : "",
        form: {
          page : 1,
          length : 50,
          dept_code : 1,
          nodeid : null,
          startDate : null,
          endDate : null,
          q:null,
          partial_match:null,
          order : 'InsertTime',
          direction : 0
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
          console.log(t);
          let newArr = [];
          for(var i=0; i < t.data.length; i++){
            let username = null ,name = null, computer = null, ip = null;
            if(t.data[i].node){
              name = t.data[i].node.dept.name;
            }
            if(t.data[i].node.info){
              let self = t.data[i].node.info;
              for(var u =0; u < self.length; u++){
                if(self[u].name === "computer") computer = self[u].value;
                if(self[u].name === "ip") ip = self[u].value;
                if(self[u].name === "username") username = self[u].value;
              }
            }
            newArr.push({
              dept_code : t.data[i].node.dept_code,
              nodeid : t.data[i].nodeid,
              username : username,
              name : name,
              computer : computer,
              ip : ip,
            })
          }
          let data = [];
          for(var j=0; j< t.data.length; j++){
            data.push(Object.assign(t.data[j], newArr[j]))
          }
          this.tableData = data;
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
        const url = this.localData.url;
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          console.log(response);
          this.responseData = response.data
        })
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
      moveRow(row){
        this.$router.push({path: "Search-process", query: row});
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
      this.viewChecked = Object.keys(this.localData.fields);
      this.$bus.$on("search-file-form", form => {
        console.log(form);
        this.form.page = form.page;
        this.form.length = form.length;
        this.form.dept_code = form.dept_code;
        this.form.nodeid = form.nodeid;
        this.form.startDate = form.startDate ? form.startDate.getTime() : null;
        this.form.endDate = form.endDate ? form.endDate.getTime() : null;
        this.form.q = form.q;
        this.receiveSearch();
      });
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
      this.$bus.$off("search-file-form")
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
