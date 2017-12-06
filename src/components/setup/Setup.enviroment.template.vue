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
              <el-input type="text" v-model="form.name" size="small" :class="{ 'is-error' : required}" id="name" clearable @blur="requiredChcek"></el-input>
              <span data-required-msg>빈칸을 채워주세요.</span>
            </div>
          </div>
          <div data-form-item>
            <label data-form-label="required">IP 주소</label>
            <div data-form-tag>
              <el-input type="text" v-model="form.ipAddress" :class="{ 'is-error' : required}" placeholder="#.#.#.#" size="small" clearable @blur="requiredChcek"></el-input>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-input type="text" v-model="form.ipAddress" placeholder="#.#.#.#" size="small" clearable></el-input>
            </div>
          </div>
          <div data-form-item>
            <label data-form-label="required">설명</label>
            <div data-form-tag>
              <el-input type="text" v-model="form.explain" size="small" clearable></el-input>
            </div>
          </div>
          <div data-form-item>
            <label data-form-label="required">탐지적용그룹</label>
            <div data-form-tag>
              <el-select v-model="form.group" multiple filterable allow-create placeholder="Choose group" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
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
      required: false,
      options: [
        { value: "연구소", label: "연구소" },
        { value: "영업1팀", label: "영업1팀" },
        { value: "개발1팀", label: "개발1팀" },
        { value: "기획1팀", label: "기획1팀" },
        { value: "개발2팀", label: "개발2팀" },
        { value: "경영지원팀", label: "경영지원팀" },
        { value: "영업2팀", label: "영업2팀" },
        { value: "기획2팀", label: "기획2팀" },
        { value: "개발2팀", label: "개발2팀" }
      ],
      form: {
        type: "",
        ipAddress: "",
        explain: "",
        group: ""
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
    // required() {
    //   console.log(this.form.name)
    //   if(this.form.name === "") return { "is-error" : true }
    // }
  },
  components: {},
  watch: {},
  methods: {
    submitForm(v) {
      console.log(v)
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     console.log(valid);
      //     alert("submit!");
      //   } else {
      //     console.log(valid);
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
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
    requiredChcek(val){
      console.log(val)
      console.log(val.target.value)
      console.log("???")
      if(val.target.value === "") {
        return this.required = true
      }
    }
  },
  beforeCreate() {},
  created() {
    console.log(this);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
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
