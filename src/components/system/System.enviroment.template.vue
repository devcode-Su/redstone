<template>
  <section>
    <div class="input-view system-container">
      <el-form :model="form" ref="form" :label-position="'left'" label-width="110px" @selection-change="handleSelectionChange">
        <fieldset>
          <legend>{{inputTitle}}</legend>
          <el-form-item label="종류" prop="type">
            <el-select v-model="form.type">
              <el-option label="단일" value="단일"></el-option>
              <el-option label="대역" value="대역"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP 주소" prop="ipAdress">
            <el-input type="text" v-model="form.ipAddress" placeholder="0.0.0.0"></el-input>
          </el-form-item>
          <el-form-item label="설명" prop="explain">
            <el-input type="text" v-model="form.explain"></el-input>
          </el-form-item>
          <el-form-item v-if="addList" label="탐지적용그룹" prop="group">
            <el-select v-model="form.group" multiple filterable allow-create placeholder="Choose group">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button class="btn-submit" @click="submitForm('form')">저장</el-button>
        </fieldset>
      </el-form>
    </div>
    <div class="result-view system-container">
      <div class="view-table">
        <p class="view-title">
          {{viewTitle}}
        </p>
        <el-table ref="multipleTable" height="500" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column property="ipAddress" label="IP 대역">
          </el-table-column>
          <el-table-column property="notice" label="설명">
          </el-table-column>
          <el-table-column v-if="addList" property="group" label="탐지 적용 그룹" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-button class="btn-submit" @click="removeData()">삭제</el-button>
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
        ipAdress: "",
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
  computed: {},
  components: {},
  watch: {},
  methods: {
    submitForm(formName) {
      console.log(formName);
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
  created() {},
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
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    flex: 1 0 auto;
    width: 700px;
    padding: 0 20px;
  }
  .el-select {
    display: block;
  }
}
</style>
