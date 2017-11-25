<template>
  <div class="template-search-pannel template-container">
    <el-form ref="form" :model="form" :label-width="widthsize+'px'" :label-position="'left'">
      <fieldset>
        <legend class="pannel small">{{searchNavi}} 에서 검색 </legend>
        <div class="form-align-box">
          <div class="form-item-wrap">
            <el-form-item v-if="pannelType.datetime" label="조사기간 설정" size="small">
              <el-date-picker v-model="form.datetime" type="datetimerange" :picker-options="datetimeOptions" range-separator="To" start-placeholder="Start date" end-placeholder="End date" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.datelast" size="small">
              <el-checkbox v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                <span style="margin-right:20px;">비밀번호 미 변경자 조회</span>
              </el-checkbox>
              <el-date-picker v-model="form.datelast" type="datetimerange" :picker-options="datelastOptions" range-separator="To" start-placeholder="Start date" end-placeholder="End date" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.check === 'oneline'" size="small">
              <el-checkbox v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                <span style="margin-right:20px;">화면보호기 미 적용 PC</span>
              </el-checkbox>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.version" size="small">
              <el-input style="width:500px;" type="text" v-model="form.version" :placeholder="pannelType.placeholder">
              </el-input>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.check === 'sensor'" size="small">
              <el-checkbox v-model="form.checkedSearch" @change="handleCheckedEngineChange">일주일 이상 미로그인 센서
              </el-checkbox>
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
            <el-form-item v-if="pannelType.check === 'double'" label="검색 항목" size="small">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                전체
              </el-checkbox>
              <el-checkbox-group v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                <el-checkbox v-for="search in labelArray" :label="search" :key="search">{{search}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="pannelType.text" label="검색 조건" size="small">
              <el-input type="text" v-model="form.text" :placeholder="pannelType.placeholder">
              </el-input>
              <el-checkbox v-if="pannelType.agreement" class="agreement" v-model="form.agreement">
                부분 일치
              </el-checkbox>
            </el-form-item>
          </div>
          <div class="btn-wrap">
            <el-button v-if="pannelType.detail" size="small" @click="showDetail = true">상세검색
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <templatesearchdetail v-if="showDetail" @close="detailColse" class="detail"></templatesearchdetail>
            <el-button size="small" type="primary" @click="onSubmit()">검색</el-button>
          </div>
        </div>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
import Templatesearchdetail from "./Template.searchpannl.detail";
import { EventBus } from "@/main";
const single = ["이동식 디스크", "외장 디스크", "CD-ROM"];
const double = [
  "TI집단 이벤트",
  "악성 URL/IP 접근 이벤트",
  "RSC 엔진 진단 이벤트",
  "프로세스",
  "네트워크",
  "파일",
  "레지스트리"
];
const multi = {
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
    },
    widthsize: {
      type: Number,
      default: 120
    },
    propForm :{
      type: Array | Object,
    }
  },
  data() {
    return {
      searchNavi : "전사",
      showDetail: false,
      checkAll: false,
      checkStart: false,
      checkEnd: false,
      isIndeterminate: true,
      isIndeterstart: true,
      isIndeterend: true,
      datetimeOptions: {
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
      datelastOptions: {
        shortcuts: [
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last 6 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {
        data:"",
        datetime:[],
        datelast:"",
        version: "",
        checkedSearch: [],
        text: "",
        agreement: false
      }
    };
  },
  computed: {
    labelArray() {
      return this.pannelType.check === "single"
        ? single
        : this.pannelType.check !== "" && this.pannelType.check === "double"
          ? double
          : this.pannelType.check !== "" && this.pannelType.check === "multi"
            ? multi
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
      this.$emit("searchData", this.form)
    },
    detailColse() {
      this.showDetail = false;
    }
  },
  beforeCreate() {},
  created() {
    EventBus.$on("searchNavi", data => {
      this.form.datetime = [data.EventTime , data.EventTime];
      this.form.data = data;
      this.searchNavi = data.name || data.dept.name +" / "+ data.username;
    });
    EventBus.$on("infofile", data => {
      this.form.text = data.Md5Hash;
      this.form.checkedSearch = data.Type;
    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.propForm)
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";

</style>
