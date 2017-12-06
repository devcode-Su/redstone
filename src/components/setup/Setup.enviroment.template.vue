<template>
  <section data-system="enviroment">
      <form data-system-form data-enviroment-item ref="form">
        <fieldset>
          <legend data-item-title>{{inputTitle}}</legend>
          <div data-form-item>
            <label>이름</label>
            <div data-form-tag>
              <el-input type="text" v-model="form.name" placeholder="#.#.#.#" size="small"></el-input>
            </div>
          </div>
          <div data-form-item>
            <label>IP 주소</label>
            <div data-form-tag>
              <el-input type="text" v-model="form.ipAddress" placeholder="#.#.#.#" size="small"></el-input>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-input type="text" v-model="form.ipAddress" placeholder="#.#.#.#" size="small"></el-input>
            </div>
          </div>
          <div data-form-item>
            <label>설명</label>
            <div data-form-tag>
              <el-input type="text" v-model="form.explain" size="small"></el-input>
            </div>
          </div>
          <div data-form-item>
            <label>탐지적용그룹</label>
            <div data-form-tag>
              <el-select v-model="form.group" multiple filterable allow-create placeholder="Choose group" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-button data-eviroment-button size="small" @click.stop="submitForm(form)">저장</el-button>
        </fieldset>
      </form>
    <div data-enviroment-item>
      <p data-item-title>
        {{viewTitle}}
      </p>
      <!--<el-table class="view-table" ref="multipleTable" height="650" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">-->
        <!--<caption>{{viewTitle}}</caption>-->
        <!--<el-table-column type="selection" width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column property="ipAddress" label="IP 대역">-->
        <!--</el-table-column>-->
        <!--<el-table-column property="notice" label="설명">-->
        <!--</el-table-column>-->
        <!--<el-table-column v-if="addList" property="group" label="탐지 적용 그룹" :show-overflow-tooltip="true">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
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
    ipSelected() {}
  },
  components: {},
  watch: {},
  methods: {
    submitForm(form) {
      console.log(form)
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
  flex:1;
  max-width:750px;
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
