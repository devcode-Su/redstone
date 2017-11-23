<template>
  <section>
    <div class="input-view template-container">
      <el-form :model="form" :rules="rules" ref="form" :label-position="'left'" label-width="110px" @selection-change="handleSelectionChange">
        <fieldset>
          <legend>{{inputTitle}}</legend>
          <el-form-item label="종류" prop="type">
            <el-select v-model="form.type">
              <el-option label="단일" value="단일"></el-option>
              <el-option label="대역" value="대역"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP 주소" prop="ipAddress">
            <el-input type="text" v-model="form.ipAddress" placeholder="#.#.#.#"></el-input>
            <!-- <el-input v-else type="text" v-model="form.ipAddress" placeholder="#.#.#.#,#.#.#.#"></el-input> -->
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
          <el-button size="small" class="view-btn type-submit" @click="submitForm('form')">저장</el-button>
        </fieldset>
      </el-form>
      {{form.ipAddress}}
    </div>
    <div class="result-view template-container">
      <p class="view-title">
        {{viewTitle}}
      </p>
      <el-table class="view-table" ref="multipleTable" height="500" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
      <el-button size="small" class="view-btn type-submit-outer" @click="removeData()">삭제</el-button>
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
    const validateIp = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("IP 주소를 입력하세요."));
      } else {
        if (!this.isIpValid(value)) {
          callback(new Error("IP 주소를 확인하세요."));
        }
        callback();
      }
    };
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
      rules: {
        type: [
          { required: true, message: "입력할 IP 종류를 선택하세요.", trigger: "change" }
        ],
        ipAddress: [{ required: true, validator: validateIp, trigger: "blur" }],
        explain: [
          { required: true, message: "IP 주소 설명을 입력하세요.", trigger: "blur" }
        ],
        group: [
          { required: true, message: "탐지 적용할 그룹을 선택하세요.", trigger: "change" }
        ]
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
          alert("submit!");
        } else {
          console.log(valid);
          console.log("error submit!!");
          return false;
        }
      });
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
    console.log(this)
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
