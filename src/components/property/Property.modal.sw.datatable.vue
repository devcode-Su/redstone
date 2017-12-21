<template>
  <section data-table-wrap>
    <header data-table="header">
      <h1 data-caption>
        소프트웨어 정보
      </h1>
      <div data-table-option>
        <el-select v-model="form.order" placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k, i) in fields" :key="option" :label="option" :value="k"></el-option>
        </el-select>
      </div>
    </header>
    <div data-table="table">
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th v-for="(th,k) in fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <v-infinite-scroll data-tbody="tbody" class="screen" :loading="reloading" @bottom="nextPage">
        <table>
          <tbody>
            <tr data-tbody="row"  v-for="row in tableData" :key="row.id">
              <td v-for="(td,k) in fields" :key="td.id"  :class="'col-'+k">{{row[k]}}</td>
            </tr>
          </tbody>
        </table>
      </v-infinite-scroll>
    </div>
  </section>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  export default {
    name: "PropertyDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        more: null,
        moreBtn : false,
        fields: {
          name : "소프트웨어",
          installed_time : "설치일",
          version : "버전"
        },
        responseData : [],
        tableData: [],
        pagingData:[],
        reloading: false,
        form: {
          page : 1,
          length : 50,
          dept_code : 1,
          order : 'name',
          direction : 1
        },
        apiUrlNum : ''
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      },
      ...mapGetters({ propertyDetailCode: "propertyDetailPc" })
    },
    components: {
    },
    watch: {
      propertyDetailCode(p){
        if(p){
          console.log("????????????")
          console.log(p)
          this.apiUrlNum = p.nodeid;
          this.receiveSearch();
          return p;
        }
      },
      responseData(d){
        if(d){
          console.log(d);
          this.tableData = d.data;
          return d;
        }
      }
    },
    methods: {
      receiveSearch(){
        console.log("get!!")
        console.log(this.apiUrlNum);
        const url = `/api/admin/software/list/${this.apiUrlNum}`;
        this.$http.get(url, {
          params : this.form
        }).then( response => {
          this.responseData = response.data;
        });
      },
      reorder(v){
        this.form.order = v;
        this.form.page = 1;
        this.receiveSearch();
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
            //console.log(response);
            this.insertTable = response.data.data;
          });
        }
      },
      nextPage () {
        ++this.form.page;
        this.api();
      },
      api () {
        const url = `/api/admin/software/list/${this.apiUrlNum}`;
        this.reloading = true;
        this.$http.get(url, {
          params : this.form
        }).then( response => {
          this.tableData.push(...response.data.data);
        }).then(() => {
          this.reloading = false
        })
      }
    },
    beforeCreate() {
    },
    created() {
      this.apiUrlNum = this.propertyDetailCode.nodeid;
      this.receiveSearch();
    },
    beforeMounted() {
    },
    mounted() {

    },
    beforeUpdate() {
    },
    updated() {
      //console.log(this.tableData)
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
    margin-top:15px;
    .col-installed_time{
      width:200px;
    }
  }
  [data-table="header"]{
    justify-content: space-between;
  }
  [data-caption]{
    margin-bottom: 0;
    font-size:18px;
  }
  [data-tbody="tbody"]{
    height:200px !important;
    min-height:200px !important;;
    border-top:1px solid color(border) !important;
  }
  [data-none-data="screen"]{
    height:198px !important;
  }
</style>
