<template>
  <article>
    <h1 class="page-title">
      프로세스 검색
    </h1>
    <div class="template-search-pannel template-container">
      <el-form ref="form" :model="form" :label-width="'180px'" :label-position="'left'">
        <fieldset>
          <legend class="pannel small">{{searchNavi}} 에서 검색 </legend>
          <div class="form-align-box">
            <div class="form-item-wrap">
              <el-form-item label="조사기간 설정" size="small">
                <el-date-picker v-model="form.starttime" type="datetime" placeholder="Select Start date and time">
                </el-date-picker>
                <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
                <el-date-picker v-model="form.endtime" type="datetime" placeholder="Select End date and time">
                </el-date-picker>
                <div class="btn-date-wrap">
                  <el-button v-for="(settime,i) in datebtn" :key="settime.i" @click="setDatetime(i)">
                    {{settime}}
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="검색 항목" size="small">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                  전체
                </el-checkbox>
                <el-checkbox-group v-model="form.checkedSearch" @change="handleCheckedEngineChange">
                  <el-checkbox v-for="(search,i) in checklist" :label="search" :key="search" :ref="'check'">{{search}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="검색 조건" size="small">
                <el-input type="text" v-model="form.text">
                </el-input>
                <el-checkbox class="agreement" v-model="form.agreement">
                  부분 일치
                </el-checkbox>
              </el-form-item>
            </div>
            <div class="btn-wrap">
              <el-button size="small" type="primary" @click="onSubmit('form')">검색</el-button>
            </div>
          </div>
        </fieldset>
      </el-form>
    </div>
    <processdatatable :propData="process"></processdatatable>
  </article>
</template>
<script>
import { EventBus } from "@/main";
import Processdatatable from "./Search.process.datatable.vue";

//const newDate = new Date();
export default {
  name: "Searchprocess",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      datebtn: ["1시간", "일일", "주간", "월간"],
      checkAll: true,
      searchNavi: "전사",
      isIndeterminate: false,
      checklist: [
        "TI진단 이벤트",
        "악성 URL/IP 접근 이벤트",
        "RSC 엔진 진단 이벤트",
        "프로세스",
        "네트워크",
        "파일",
        "레지스트리"
      ],
      datetimeOptions: [
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 1),
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24),
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30)
      ],
      form: {
        data: "",
        starttime: "",
        endtime: "",
        version: "",
        checkedSearch: [
          "TI진단 이벤트",
          "악성 URL/IP 접근 이벤트",
          "RSC 엔진 진단 이벤트",
          "프로세스",
          "네트워크",
          "파일",
          "레지스트리"
        ],
        text: "",
        agreement: false
      },
      process: {
        field: [
          "프로세스 시작 시간",
          "프로세스 이름",
          "이름",
          "부서",
          "센서 ID",
          "검색된 이벤트 수",
          "위협 정보",
          ""
        ],
        data: [],
        search: [],
        url: ""
      },
      //form:"",
      formKey: ["EventTime", "Md5Hash", "Type"]
    };
  },
  computed: {},
  components: {
    Processdatatable
  },
  watch: {},
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.form.checkedSearch = val ? this.checklist : [];
      this.isIndeterminate = false;
      console.log(this.form.checkedSearch);
    },
    handleCheckedEngineChange(value) {
      console.log(value);
      console.log(this.$refs.check);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checklist.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checklist.length;
    },
    setDatetime(num) {
      this.form.starttime = this.datetimeOptions[num];
      this.form.endtime = new Date();
    },
    onSubmit(form) {
      console.log("???? adb");
      const formData = this.$refs[form].model;
      const url = "/api/admin/search/event";
      if (formData.starttime === "" || formData.endtime === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
        console.log("aaa");
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: formData.starttime ? formData.starttime : null,
          endDate: formData.starttime ? formData.starttime : null,
          dept_code: formData.data.dept_code || "",
          node_id: formData.data.node_id || "",
          order: "time",
          direction: 1,
          q: "",
          all: this.checkAll,
          partial_match: true,
          ti_event: this.$refs.check[0].isChecked,
          url_ip_event: this.$refs.check[1].isChecked,
          engine_event: this.$refs.check[2].isChecked,
          process_event: this.$refs.check[3].isChecked,
          network_event: this.$refs.check[4].isChecked,
          file_event: this.$refs.check[5].isChecked,
          registry_event: this.$refs.check[6].isChecked
        };
        this.$http
          .get(url, {
            params: data
          })
          .then(result => {
            this.process.data = result.data.rows;
            console.log(result.data);
          });
        this.process.search = data;
        this.process.url = url;
      }
    }
  },
  beforeCreate() {},
  created() {
    EventBus.$on("infofile", data => {
      //console.log(this.formKey)
      //console.log(data);
      //console.log(this.getValueEx(data, this.formKey));
      //this.form = this.getValueEx(data, this.formKey);
    });
    EventBus.$on("searchNavi", data => {
      this.searchNavi = data.name || data.dept.name + " / " + data.username;
    });
    (this.checkAll = false), (this.isIndeterminate = true);
    this.form.text = "test";
    this.form.checkedSearch = ["TI진단 이벤트"];
    console.log(this.form);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.form);
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
.btn-date-wrap {
  margin-left: 5px;
}
</style>
