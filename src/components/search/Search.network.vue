<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      네트워크 검색
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
              <el-form-item class="multiline" label="검색 항목" size="small">
                <el-checkbox v-model="checkAll" @change="radioAllDiasabled">
                  전체
                </el-checkbox>
                <el-form-item label="목적지" label-width="70px">
                  <el-radio-group v-model="form.radiolist.end">
                    <el-radio v-for="(end,i) in radiolist.end" :key="end.id" :label="i+1" :disabled="radioDisabled">{{end}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="출발지" label-width="70px">
                  <el-radio-group v-model="form.radiolist.start">
                    <el-radio v-for="(start,i) in radiolist.start" :key="start.id" :label="i+1" :disabled="radioDisabled">{{start}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
              <el-form-item label="검색 조건" size="small">
                <el-input type="text" v-model="form.text"></el-input>
                <el-button class="detail-search" size="small" @click="showDetail = true">상세검색
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <div class="detail" v-if="showDetail">
                  <el-form-item label="PC IP 주소" prop="pcip" size="small">
                    <el-input type="text" v-model="form.pcip" placeholder="ANY"></el-input>
                  </el-form-item>
                  <el-form-item label="목적지 IP 주소" prop="endip" size="small">
                    <el-input type="text" v-model="form.endip" placeholder="ANY"></el-input>
                  </el-form-item>
                  <el-form-item label="방향" prop="direction" size="small">
                    <el-select v-model="form.direction" placeholder="ANY">
                      <el-option label="IN" value="in"></el-option>
                      <el-option label="OUT" value="out"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="포트" prop="port" size="small">
                    <el-input type="number" v-model="form.port" placeholder="ANY"></el-input>
                  </el-form-item>
                  <el-form-item label="프로토콜" prop="protocol" size="small">
                    <el-select v-model="form.protocol" placeholder="ANY">
                      <el-option label="TCP" value="tcp"></el-option>
                      <el-option label="UDP" value="udp"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="btn-wrap" size="small">
                    <el-button @click="showDetail = false">닫기</el-button>
                  </el-form-item>
                </div>
              </el-form-item>
            </div>
            <div class="btn-wrap">
              <el-button size="small" type="primary" @click="onSubmit('form')">검색</el-button>
            </div>
          </div>
        </fieldset>
      </el-form>
    </div>
    <templatetablerouter :propData="search"></templatetablerouter>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetablerouter from "../template/Template.tablerouter.vue";
export default {
  name: "Searchnetwork",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      datebtn: ["1시간", "일일", "주간", "월간"],
      checkAll: true,
      searchNavi: "전사",
      radioDisabled: true,
      showDetail: false,
      start: ["전체", "이동식 디스크", "외장 디스크", "CD-ROM"],
      radiolist: {
        start: ["전체", "이동식 디스크", "외장 디스크", "CD-ROM"],
        end: ["전체", "이동식 디스크2", "외장 디스크2", "CD-ROM2"]
      },
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
        radiolist: {
          start: "",
          end: ""
        },
        text: "",
        detail: {
          pcip: "",
          endip: "",
          direction: "",
          port: "",
          type: []
        }
      },
      search: {
        field: [
          "",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "방향",
          "PC IP 주소",
          "원격 IP 주소",
          "포트",
          "프로토콜",
          "검출 시간"
        ],
        data: [],
        search: [],
        url: ""
      }
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel,
    Templatetablerouter
  },
  watch: {},
  methods: {
    radioAllDiasabled(val) {
      this.form.radiolist.end = "";
      this.form.radiolist.start = "";
      this.radioDisabled = val;
    },
    setDatetime(num) {
      this.form.starttime = this.datetimeOptions[num];
      this.form.endtime = new Date();
    },
    onSubmit(form) {
      console.log("file");
      const url = "/api/admin/search/network";
      if (form.datetime === "" || form.text === "") {
        this.$notify.error({
          title: "Error",
          message: "검색 조건을 입력하세요."
        });
        console.log("aaa");
      } else {
        const data = {
          page: 1,
          length: 50,
          startDate: form.datetime[0].getTime(),
          endDate: form.datetime[1].getTime(),
          dept_code: form.data.dept_code || "",
          node_id: form.data.node_id || "",
          order: "insertTime",
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          this.file.data = result.data.data;
        });
        this.file.search = data;
        this.file.url = url;
      }
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
.btn-date-wrap,
.detail-search {
  margin-left: 5px;
}
</style>
