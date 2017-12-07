<template>
  <section data-system="enviroment">
    <!--<el-form data-system-form :model="form" :rules="rules" ref="form" :label-position="'left'" label-width="110px" @selection-change="handleSelectionChange">-->
      <!--<fieldset>-->
        <!--<legend data-item-title>{{inputTitle}}</legend>-->
        <!--<el-form-item label="종류" prop="type">-->
          <!--<el-select v-model="form.type">-->
            <!--<el-option label="단일" value="단일"></el-option>-->
            <!--<el-option label="대역" value="대역"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="IP 주소" prop="ipAddress">-->
          <!--<el-input type="text" v-model="form.ipAddress" placeholder="#.#.#.#"></el-input>-->
          <!--&lt;!&ndash; <el-input v-else type="text" v-model="form.ipAddress" placeholder="#.#.#.#,#.#.#.#"></el-input> &ndash;&gt;-->
        <!--</el-form-item>-->
        <!--<el-form-item label="설명" prop="explain">-->
          <!--<el-input type="text" v-model="form.explain"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item v-if="addList" label="탐지적용그룹" prop="group">-->
          <!--<el-select v-model="form.group" multiple filterable allow-create placeholder="Choose group">-->
            <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-button size="small" class="view-btn type-submit" @click="submitForm('form')">저장</el-button>-->
      <!--</fieldset>-->
    <!--</el-form>-->
      <form data-system-form data-enviroment-item @submit.prevent="submitForm(form)">
        <fieldset>
          <legend data-item-title>{{inputTitle}}</legend>
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
          <div data-form-item>
            <label>탐지적용그룹</label>
            <div data-form-tag>
              <el-select id="select" v-model="form.dept_code" multiple filterable allow-create placeholder="Choose group" size="small">
                <el-option v-for="item in options" :key="item.dept_code" :label="item.name" :value="item.dept_code"></el-option>
              </el-select>
            </div>
          </div>
          <el-button data-eviroment-button size="small" native-type="submit">저장</el-button>
        </fieldset>
      </form>
    <div data-enviroment-item>
      <p data-item-title>
        {{viewTitle}}
      </p>
      <el-table class="view-table" ref="multipleTable" height="650" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <caption>{{viewTitle}}</caption>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column property="ipAddress" label="IP 대역">
        </el-table-column>
        <el-table-column property="notice" label="설명">
        </el-table-column>
        <el-table-column v-if="addList" property="group" label="탐지 적용 그룹" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <el-button data-eviroment-button size="small" @click="removeData()">삭제</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: "TemplateEnviroment",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    inputTitle: String,
    viewTitle: String,
    addList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
        name : "",
        ip_start : "",
        ip_end : "",
        description : "",
        dept_code : []
      },
      tableData: [
        {
          ipAddress: "172.16.10.3 ~ 172.16.10.8",
          notice: "연구소",
          group: "연구소, 영업1팀, 개발1팀, 기획1팀, 개발2팀, 경영지원팀, 영업2팀, 기획2팀, 개발2팀"
        },
        {
          ipAddress: "172.16.11.3 ~ 172.16.11.8",
          notice: "서울사무소",
          group: "연구소, 영업1팀, 개발1팀, 기획1팀, 개발2팀, 경영지원팀, 영업2팀, 기획2팀, 개발2팀"
        },
        {
          ipAddress: "172.17.12.3 ~ 172.16.12.8",
          notice: "부산사무소",
          group: "연구소, 영업1팀, 개발1팀, 기획1팀, 개발2팀, 경영지원팀, 영업2팀, 기획2팀, 개발2팀"
        },
        {
          ipAddress: "172.18.13.3 ~ 172.16.13.8",
          notice: "전사",
          group: "연구소, 영업1팀, 개발1팀, 기획1팀, 개발2팀, 경영지원팀, 영업2팀, 기획2팀, 개발2팀"
        }
      ],
      multipleSelection: []
    };
  },
  computed: {

  },
  components: {},
  watch: {
    options(o){
      if(o){
        console.log(o)
      }
    }
  },
  methods: {
    submitForm(form) {
      console.log(form);



    },
    removeData() {
      let num = this.multipleSelection.length;
      const arr = this.$refs.multipleTable.data;
      for (var i = 0; i < num; i++) {
        console.log(i);
        arr.splice(arr.indexOf(this.multipleSelection[i]), 1);
      }
      this.$refs.multipleTable.clearSelection();
      console.log(this.$refs.multipleTable.data);
      console.log("submit :" + this.$refs.multipleTable.data);
    },
    handleSelectionChange(val) {
      //console.log(val);
      this.multipleSelection = val;
    },
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
    }
  },
  beforeCreate() {},
  created() {
    const url = "/api/admin/group/list";
    this.$http.get(url).then( response => {
      console.log(response);
      this.options = response.data
    })
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {

    console.log(this.form.dept_code)
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
[data-system="enviroment"]{
  display:flex;
  justify-content: space-between;
}
[data-enviroment-item]{
  position:relative;
  width:100%;
  min-width:750px;
  max-width:750px;
  height:650px;
  padding:45px 0 20px;
  fieldset{
    padding:20px;
    border:1px solid color(border)
  }
  .el-table{
    border-top:1px solid color(border)
  }
}
[data-item-title]{
  position:absolute;
  top:10px;
  left:0;
  margin-bottom:0;
  font-size:16px;
}
[data-eviroment-button]{
  position:absolute;
  top:10px;
  right:0;
  padding:6px 15px;
}
</style>
