<template>
  <div class="template-search-pannel template-container">
    <el-form ref="form" :model="form" label-width="120px" :label-position="'left'">
      <fieldset>
        <legend class="small">전사
          <span>/</span> 에서 검색</legend>
        <div class="form-align-box">
          <div class="form-item-wrap">
            <el-form-item v-if="pannelType.dateset" label="조사기간 설정" size="small">
              <el-date-picker v-model="form.date" type="datetimerange" :picker-options="form.pickerOptions" range-separator="To" start-placeholder="Start date" end-placeholder="End date" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="pannelType.check === 'single'" label="검색 항목" size="small">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                Check all
              </el-checkbox>
              <el-checkbox-group v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                <el-checkbox v-for="search in labelArray" :label="search" :key="search">{{search}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="multiline" v-else-if="pannelType.check === 'multi'" label="검색 항목" size="small">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="multiAllChange">
                전체
              </el-checkbox>
              <el-form-item label="목적지" label-width="70px">
                <el-checkbox :indeterminate="isIndeterend" v-model="checkEnd" @change="multiEndChange">
                  전체
                </el-checkbox>
                <el-checkbox-group class="multicheck" v-model="form.checkedSearch" @change="multiCheckedEndChange">
                  <el-checkbox v-for="search in labelArray.end" :label="search" :key="search">{{search}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="출발지" label-width="70px">
                <el-checkbox :indeterminate="isIndeterstart" v-model="checkStart" @change="multiStartChange">
                  전체
                </el-checkbox>
                <el-checkbox-group class="multicheck" v-model="form.checkedSearch" @change="multiCheckedStartChange">
                  <el-checkbox v-for="search in labelArray.start" :label="search" :key="search">{{search}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
            <el-form-item v-if="pannelType.text" label="검색 조건" size="small">
              <el-input type="text" :placeholder="pannelType.placeholder">
              </el-input>
              <el-checkbox v-if="pannelType.agreement" class="agreement" v-model="form.agreement">
                부분 일치
              </el-checkbox>
            </el-form-item>
          </div>
          <div class="btn-wrap">
            <el-button v-if="true" size="small" @click="showDetail = true">상세검색
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <templatesearchdetail v-if="showDetail" @close="detailColse" class="detail"></templatesearchdetail>
            <el-button size="small" type="primary" @click="onSubmit">검색</el-button>
          </div>
        </div>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
import Templatesearchdetail from "./Template.searchpannl.detail";
const searchOptions = ["이동식 디스크", "외장 디스크", "CD-ROM"];
const searchOptions2 = {
  start: ["이동식 디스크", "외장 디스크", "CD-ROM"],
  end: ["이동식 디스크2", "외장 디스크2", "CD-ROM2"]
};
export default {
  name: "TemplateSearchpannel",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    pannelType: {
      type: Array | Object,
      default: false
    }
  },
  data() {
    return {
      showDetail: false,
      checkAll: false,
      checkStart: false,
      checkEnd: false,
      isIndeterminate: true,
      isIndeterstart: true,
      isIndeterend: true,
      form: {
        pickerOptions: {
          shortcuts: [
            {
              text: "1 시간",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 1);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "일일",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "주간",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "월간",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        checkedSearch: [],
        agreement: false
      }
    };
  },
  computed: {
    labelArray() {
      return this.pannelType.check === "single"
        ? searchOptions
        : this.pannelType.check !== "" && this.pannelType.check === "multi"
          ? searchOptions2
          : [];
    }
  },
  components: {
    Templatesearchdetail
  },
  watch: {},
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.form.checkedSearch = val ? this.labelArray : [];
      this.isIndeterminate = false;
    },
    handleCheckedEngineChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.labelArray.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.labelArray.length;
    },
    multiAllChange(val) {
      const arr = [];
      Object.values(this.labelArray).map((item, index) => {
        for (let i = 0; i < item.length; i++) {
          arr.push(item[i]);
        }
      });
      this.form.checkedSearch = val ? arr : [];
      this.isIndeterminate = false;
    },
    multiStartChange(val) {
      this.form.checkedSearch = val ? this.labelArray.start : [];
      this.isIndeterstart = false;
    },
    multiCheckedStartChange(value) {
      let checkedCount = value.length;
      const arrLength = this.labelArray.start.length;
      this.checkStart = checkedCount === arrLength;
      this.isIndeterstart = checkedCount > 0 && checkedCount < arrLength;
    },
    multiEndChange(val) {
      this.form.checkedSearch = val ? this.labelArray.end : this.labelArray.end;
      console.log(this.form.checkedSearch);
      this.isIndeterend = false;
    },
    multiCheckedEndChange(value) {
      let checkedCount = value.length;
      const arrLength = this.labelArray.end.length;
      this.checkEnd = checkedCount === arrLength;
      this.isIndeterend = checkedCount > 0 && checkedCount < arrLength;
    },
    onSubmit() {
      console.log("submit!");
    },
    detailColse(){
      this.showDetail = false
    }
  },
  beforeCreate() {},
  created() {
    console.log(this.pannelType);
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
.template-search-pannel {
  .form-align-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .form-item-wrap {
    margin-right: 50px;
  }
  .el-checkbox-group,
  .agreement {
    margin-left: 20px;
  }
  .multicheck {
    display: flex;
    min-width: 500px;
    margin-left: 0;
    label {
      flex: 1;
      margin-left: 0;
    }
  }
  .btn-wrap {
    margin-bottom: 18px;
  }
  .detail {
    padding: 25px 30px;
    position: absolute;
    z-index: 3;
    transform: translate(-235px, 10px);
    background-color: #fff;
    border: 1px solid color(border);
    border-radius: 5px;
  }
}
</style>
