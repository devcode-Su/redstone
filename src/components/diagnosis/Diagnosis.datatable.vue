<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder">
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
              <th v-for="(th,k) in localData.fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
              <th class="col-moreBtn"><span>더보기</span></th>
            </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <template v-for="row in tableData">
            <tr data-tbody="row"  :key="row.id">
              <td v-for="(td,k) in localData.fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>
              <td class="col-moreBtn">
                <button class="icon-btn icon-wrap" @click="rowSearch(row)" :class="{on : row === more}">
                  <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
                </button>
              </td>
            </tr>
          <transition name="fade">
            <tr data-tboy="hide-row" v-if="row === more">
              <td :colspan="Object.keys(row).length + 1" >
                <insert-datatable></insert-datatable>
              </td>
            </tr>
          </transition>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
  import InsertDatatable from "./Diagnosis.insert.datatable"
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
    more: null,
    moreBtn : false,
    colLength: this.localData.fields.length + 1,
    responseData : [],
    tableData: [],
    viewChecked: Object.keys(this.localData.fields),
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
    return this.tableData.length ? false : true
  }
},
components: {
 "insert-datatable" :InsertDatatable
},
watch: {
  formData(d) {
    if(d){
      console.log("alive?");
      this.form.dept_code = d.form.dept_code;
      this.form.nodeid = d.form.nodeid;
      this.form.startDate = d.form.startDate ? d.form.startDate.getTime() : null;
      this.form.endDate = d.form.endDate ? d.form.endDate.getTime() : null;
      this.form.order = d.form.order;
      this.receiveSearch(d.url);
      return d;
    }
  },
  responseData(t){
    if(t){
      this.tableData = t.data;
      console.log(this.tableData);
      return t
    }
  }
},
methods: {
  receiveSearch(url){
    console.log(this.form);
    this.$http.get(url, {
      params: this.form
    }).then( response => {
      console.log(response);
      this.responseData = response.data
    })
  },
  reOrder(){

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
    // let check = this.localData.fields;
    // console.log(check)
    // //console.log(this.$refs[])
    // for(var i=0; i< val.length; i++){
    //   console.log(val[i]);
    //   console.log(this.$refs[val[i]])
    // }
    // for(var i=0; i< check.length; i++){
    //   console.log(Object.keys(check[i]))
    // }
  },
  rowSearch(row){
    if(this.more === row){
      this.more = null;
    }else{
      this.more = row;
      const url = "/api/admin/search/detect/list/file/"+ row.FileHash
      this.$http.get(url, {
        params : this.form
      }).then(response => {
        console.log(response)
      });
    }
  }
},
beforeCreate() {
},
created() {
  console.log(this.tableData)
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
