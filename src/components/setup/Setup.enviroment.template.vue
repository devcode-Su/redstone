<template>
  <section data-form-setup="enviroment">
      <form data-setup-item="enviroment-from" @submit.prevent="submitForm(form)">
        <fieldset>
          <legend data-item-title>{{propData.inputTitle}}</legend>
          <div data-form-item>
            <label data-form-label="required">이름</label>
            <div data-form-tag>
              <el-input id="name" type="text" v-model="form.name" size="small" :class="{ 'is-error' : required.name}" clearable @blur="requiredCheck"></el-input>
              <span data-required-msg v-if="required.name">빈칸을 채워주세요.</span>
            </div>
          </div>
          <div data-form-item>
            <label data-form-label="required">IP 주소</label>
            <div data-form-tag>
              <el-input id="ip_start" type="text" v-model="form.ip_start" :class="{ 'is-error' : required.ip_start}" placeholder="#.#.#.#" size="small" clearable @blur="requiredCheck"></el-input>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-input id="ip_end" type="text" v-model="form.ip_end" :class="{ 'is-error' : required.ip_end}" placeholder="#.#.#.#" size="small" clearable @blur="requiredCheck"></el-input>
              <span data-required-msg v-if="required.ip_start || required.ip_end">빈칸을 채워주세요.</span>
            </div>
          </div>
          <div data-form-item>
            <label data-form-label="required">설명</label>
            <div data-form-tag>
              <el-input id="description" :class="{ 'is-error' : required.description}" type="text" v-model="form.description" size="small" clearable @blur="requiredCheck"></el-input>
              <span data-required-msg v-if="required.description">빈칸을 채워주세요.</span>
            </div>
          </div>
          <div data-form-item v-if="propData.select">
            <label>탐지적용그룹</label>
            <div data-form-tag>
              <el-select id="select" v-model="form.dept_code" multiple filterable allow-create placeholder="Choose group" size="small">
                <el-option v-for="item in options" :key="item.dept_code" :label="item.name" :value="item.dept_code"></el-option>
              </el-select>
            </div>
          </div>
          <div data-eviroment-button v-if="btnType" >
            <el-button size="small" native-type="submit">저장</el-button>
          </div>
          <div data-eviroment-button v-else>
            <el-button  size="small" native-type="submit">수정</el-button>
            <el-button type="info" size="small" plain @click="formClear">취소</el-button>
          </div>
        </fieldset>
      </form>
    <div data-setup-item="enviroment-table">
      <p data-item-title>
        {{propData.viewTitle}}
      </p>
      <el-table class="view-table" ref="multipleTable" height="650" :data="tableData" style="width: 100%" @selection-change="selectionChange">
        <caption>{{propData.viewTitle}}</caption>
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column property="name" label="이름" width="143">
        </el-table-column>
        <el-table-column property="ip" label="IP 대역" width="240">
        </el-table-column>
        <el-table-column property="description" label="설명">
        </el-table-column>
        <el-table-column v-if="propData.select" property="except_dept" label="탐지 적용 그룹" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <div data-eviroment-button>
        <el-button  size="small" @click="modifyData()">
          수정
          <span v-if="btnError" class="btn-error">수정할 대상은 1개만 선택하십시요.</span>
        </el-button>
        <el-button type="warning" plain size="small" @click="removeData()">삭제</el-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "TemplateEnviroment",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    propData:{
      type : Object,
      default(){
        return { massage : "No data" }
      }
    }
  },
  data() {
    return {
      btnType : true,
      btnError : false,
      required: {
        name : false,
        ip_start : false,
        ip_end : false,
        description : false,
        select : false
      },
      options: [],
      selectOption : [],
      form: {
        no : '',
        name : "",
        ip_start : "",
        ip_end : "",
        description : "",
        dept_code : []
      },
      receiveData : [],
      tableData: [
      ],
      multipleSelection: []
    };
  },
  computed: {

  },
  components: {},
  watch: {
    receiveData(r){
      if(r){
        let newArr = [];
        for(var i =0; i < r.data.length; i ++){
          let deptName = [];
          let deptCode = [];
          if(r.data[i].except_dept){
            let self = r.data[i].except_dept;
            for(var j =0; j < self.length; j++){
              deptName.push(self[j].dept.name);
              deptCode.push(self[j].dept.dept_code);
            }
          }
          newArr.push({
            no : r.data[i].no,
            name : r.data[i].name,
            ip_start : r.data[i].ip_start,
            ip_end : r.data[i].ip_end,
            ip : r.data[i].ip_start + " ~ " + r.data[i].ip_end,
            description : r.data[i].description,
            except_dept : deptName.toString(),
            dept_code : deptCode
          })
        }
        this.tableData =  newArr;
        return r;
      }
    }

  },
  methods: {
    requiredCheck(val){
      if(val.target.id === "name"){
        if(val.target.value === "") this.required.name = true;
        else this.required.name = false
      }else if(val.target.id === "ip_start"){
        if(val.target.value === "") this.required.ip_start = true;
        else this.required.ip_start = false
      }else if(val.target.id === "ip_end"){
        if(val.target.value === "") this.required.ip_end = true;
        else this.required.ip_end = false
      }else if(val.target.id === "description"){
        if(val.target.value === "") this.required.description = true;
        else this.required.description = false
      }
    },
    submitForm(form) {
      console.log(form);
      if(form.name === "" || form.ip_start === "" || form.ip_end === "" || form.description === ""){
        if(form.name === "") this.required.name = true;
        if(form.ip_start === "") this.required.ip_start = true;
        if(form.ip_end === "") this.required.ip_end = true;
        if(form.description === "") this.required.description = true;
      }else{
        if(this.btnType){
          const url = "/api/admin/setting/ip/"+this.propData.api;
          this.$http.post(url, form).then(() => {
            this.getIpData();
            this.formClear();
          });
        }else{
          const url = "/api/admin/setting/ip/"+this.propData.api+"/"+form.no;
          this.$http.put(url, form).then(() => {
            this.getIpData();
            this.formClear();
          });
        }
      }
    },
    formClear(){
      this.form.no = "";
      this.form.name = "";
      this.form.ip_start = "";
      this.form.ip_end = "";
      this.form.description = "";
      this.form.dept_code = [];
      this.btnType = true;
      this.$refs.multipleTable.clearSelection();
    },
    modifyData(){
      if(this.multipleSelection.length > 1 || this.multipleSelection.length === 0){
        console.log("slime");
        this.btnError = true;
      }else{
        let form = this.multipleSelection[0];

        this.btnError = false;
        this.btnType = false;

        this.form.no = form.no;
        this.form.name = form.name;
        this.form.ip_start = form.ip_start;
        this.form.ip_end = form.ip_end;
        this.form.description = form.description;
        this.form.dept_code = form.dept_code;
      }
    },
    removeData() {
      console.log(this.multipleSelection);
      this.$confirm('선택한 항목을 삭제합니까?', '주의', {
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        type: 'warning'
      }).then(() => {
        let item = this.multipleSelection;
        this.$message({
          type: 'success',
          message: '삭제가 완료됐습니다.'
        });
        for(var i=0; i < item.length; i++){
          const url = "/api/admin/setting/ip/"+this.propData.api+"/"+item[i].no;
          this.$http.delete(url);
        }
        this.getIpData();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '삭제가 취소됐습니다.'
        });
        this.$refs.multipleTable.clearSelection();
        console.log(this.multipleSelection);
      });
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    getIpData(){
      const ipUrl = "/api/admin/setting/ip/"+this.propData.api;
      this.$http.get(ipUrl).then( response => {
        this.receiveData = response.data;
      });
    }
  },
  beforeCreate() {},
  created() {
    const url = "/api/admin/group/list";
    this.$http.get(url).then( response => {
      this.options = response.data
    });
    this.getIpData();
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
[data-setup-item]{
  .el-table{
    border-top:1px solid color(border)
  }
}
[data-item-title]{
  top:10px;
  left:0;
}
[data-setup-item="enviroment-form"]{
  width:600px;
}
[data-setup-item="enviroment-table"]{;
  flex:1;
  max-width:900px;
  height:650px
}
[data-eviroment-button]{
  position:absolute;
  top:10px;
  right:0;
  button{
    padding:6px 15px;
  }
  .btn-error{
    position:absolute;
    left:-195px;
    color:#fa5555;
  }
}
</style>
