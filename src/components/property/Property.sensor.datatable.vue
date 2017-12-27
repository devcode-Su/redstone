<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <!--<el-button size="small">-->
          <!--파일로 저장-->
          <!--<i class="fa fa-download" aria-hidden="true"></i>-->
        <!--</el-button>-->
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">
          <el-option v-for="(option, k) in localData.orderOptions" :key="option" :label="option" :value="k"></el-option>
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
            <!--<th class="col-connected"><span>접속</span></th>-->
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
          <tr data-tbody="row" v-else v-for="row in tableData" :key="row.id" @click="rowDetail(row)">
            <!--<th class="col-connected" >-->
                <!--<span class="icon">-->
                  <!--<i class="fa fa-power-off" aria-hidden="true"></i>-->
                <!--</span>-->
            <!--</th>-->
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
  import Paginations from "../template/Template.paginations";
  import Spinner from "@/components/template/Spinner";
  export default {
    name: "SensorDatatable",
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
        version: "",
        form: {
          page : 1,
          length : 50,
          dept_code : '',
          nodeid : '',
          order : '',
          direction : 1,
          OnlyNoLoginLong : 0
        }
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      }
    },
    components: {
      "paginations" :Paginations,
      "spinner":Spinner
    },
    watch: {
      formData(d) {
        if(d){
          //console.log("alive?");
          this.form.dept_code = d.form.dept_code;
          this.form.nodeid = d.form.nodeid;
          this.form.OnlyNoLoginLong = d.form.OnlyNoLoginLong;
          this.form.order = d.order;
          this.apiUrl = d.url;
          this.version = d.form.version;
          this.receiveSearch();
          return d;
        }
      },
      responseData(t){
        if(t){
          console.log(t);
          let newArr = [];
          for(var i=0; i < t.data.length; i++){
            let username = null ,userdept = null, userpc = null, userip = null, version = null;
            if(t.data[i].dept){
              userdept = t.data[i].dept.name;
            }
            if(t.data[i].info){
              let self = t.data[i].info;
              for(var u =0; u < self.length; u++){
                if(self[u].name === "computer") userpc = self[u].value;
                if(self[u].name === "ip") userip = self[u].value;
                if(self[u].name === "username") username = self[u].value;
                if(self[u].name === "version") version = self[u].value;
              }
            }
            newArr.push({
              dept_code : t.data[i].dept_code,
              nodeid : t.data[i].nodeid,
              username : username,
              userdept : userdept,
              userpc : userpc,
              userip : userip,
              version : version,
              connected_time : t.data[i].connected_time
            })
          }
          console.log(newArr);
          this.tableData = newArr;
          this.pagingData = {
            current_page : t.current_page,
            total : t.total,
          };
          return t
        }
      },
    },
    methods: {
      receiveSearch(){
        //console.log(this.form);
        const type = this.form.nodeid ? "node" : "dept";
        const id = this.form.nodeid ? this.form.nodeid : this.form.dept_code;
        const url = `${this.apiUrl}/${type}/${id}/${this.version}`;

        this.getLoad = true;
        //console.log(url);
        this.$http.get(url, {
          params: this.form
        }).then( response => {
          //console.log(response);
          this.responseData = response.data;
          this.getLoad = false;
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
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:30px;
  }

  [data-table] {
    .col-username,
    .col-userdept,
    .col-userpc,
    .col-userip{
      width:200px;
    }
    .col-version{
      width:auto;
    }
  }
</style>
