<template>
  <div class="template-search-pannel template-container">
    <el-form ref="form" :model="form" :label-width="widthsize+'px'" :label-position="'left'">
      <fieldset>
        <legend class="pannel small">
          
        </legend>
        <div class="form-align-box">
          <div class="form-item-wrap">
            <el-form-item v-if="pannelType.datetime" label="조사기간 설정" size="small">
              <el-date-picker v-model="form.startTime" type="datetime" placeholder="Select Start date and time">
              </el-date-picker>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="Select End date and time">
              </el-date-picker>
              <div class="btn-date-wrap">
                <el-button v-for="(settime,i) in datebtn" :key="settime.i" @click="setDatetime(i)">
                  {{settime}}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.datelast" size="small">
              <el-checkbox v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                <span style="margin-right:20px;">비밀번호 미 변경자 조회</span>
              </el-checkbox>
              <el-date-picker v-model="form.startDate" type="date" placeholder="Select Start date">
              </el-date-picker>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-date-picker v-model="form.endDate" type="date" placeholder="Select End dat">
              </el-date-picker>
              <div class="btn-date-wrap">
                <el-button v-for="(setdate,i) in datelastbtn" :key="setdate.i" @click="setDatelast(i)">
                  {{setdate}}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.check === 'oneline'" size="small">
              <el-checkbox v-model="form.checkeType" @change="handleCheckedEngineChange">
                <span style="margin-right:20px;">화면보호기 미 적용 PC</span>
              </el-checkbox>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.version" size="small">
              <el-input style="width:500px;" type="text" v-model="form.version" :placeholder="pannelType.placeholder">
              </el-input>
            </el-form-item>
            <el-form-item class="none-label" v-if="pannelType.check === 'sensor'" size="small">
              <el-checkbox v-model="form.checkeType" @change="handleCheckedEngineChange">일주일 이상 미로그인 센서
              </el-checkbox>
            </el-form-item>
            <el-form-item v-if="pannelType.check === 'single'" label="검색 항목" size="small">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                전체
              </el-checkbox>
              <el-checkbox-group v-model="form.checkeType" @change="handleCheckedEngineChange">
                <el-checkbox v-for="search in single" :label="search" :key="search">{{search}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="pannelType.text" label="검색 조건" size="small">
              <el-input type="text" v-model="form.text" :placeholder="pannelType.placeholder">
              </el-input>
              <el-checkbox v-if="pannelType.agreement" class="agreement" v-model="form.agreement">
                부분 일치
              </el-checkbox>
            </el-form-item>
            <el-form-item class="programs" v-if="pannelType.programs" label="검색 조건" size="small">
              <span class="program-name">
                프로그램명
              </span>
              <el-input type="text" v-model="form.text" :laceholder="pannelType.placeholder">
              </el-input>
            </el-form-item>
          </div>
          <div class="btn-wrap">
            <templatesearchdetail v-if="showDetail" @close="detailColse" class="detail"></templatesearchdetail>
            <el-button size="small" type="primary" @click="onSubmit()">검색</el-button>
          </div>
        </div>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
//import { EventBus } from "@/main";
import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin"

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
    propForm: {
      type: Array | Object
    }
  },
  data() {
    return {
      single : ["이동식 디스크", "외장 디스크", "CD-ROM"],
      datebtn: ["1시간", "일일", "주간", "월간"],
      datelastbtn: ["1주일전", "1개월전", "3개월전", "6개월전"],
      searchNavi: "전사",
      showDetail: false,
      checkAll: false,
      checkStart: false,
      checkEnd: false,
      isIndeterminate: true,
      isIndeterstart: true,
      isIndeterend: true,
      form: {
        data: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        version: "",
        checkeType: [],
        text: "",
        agreement: false,
        nodeid : 1,
        dept_code: 1,
      }
    };
  },
  computed: {
  },
  components: {

  },
  watch: {},
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.form.checkedSearch = val ? this.checkedSearch : [];
      this.isIndeterminate = false;
    },
    handleCheckedEngineChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedSearch.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedSearch.length;
    },
    onSubmit() {
      this.$emit("searchData", this.form);
    },
    searchArea() {
      this.form.nodeid = 1;
      this.form.dept_code = 1;
    }
  },
  beforeCreate() {},
  created() {
    this.$bus.$on("search-id", data => {
      this.form.nodeid = data.nodeid;
      this.form.dept_code = data.dept_code;
      this.searchNavi = data.name || data.dept.name + " / " + data.username;
    });

//    EventBus.$on("infofile", data => {
//      this.form.text = data.Md5Hash;
//      this.form.checkedSearch = data.Type;
//    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("search-id")
  },
  destroyed() {},
  mixins:[
    MixinsSetDatetime
  ]
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.btn-date-wrap {
  margin-left: 5px;
}
  .programs{
    width:700px;
  }
  .program-name{
    width:120px;
  }
</style>
