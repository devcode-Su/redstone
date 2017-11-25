<template>
  <article>
    <h1 class="page-title">
      위협정보기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <templatetableinsert class="diagosis-info-table" :propData="infofile" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <!--<templatetableinsert class="diagosis-info-table" :propData="infoip" @reorder="reorder"></templatetableinsert>-->
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <!--<templatetableinsert class="diagosis-info-table" :propData="inforsc" @reorder="reorder"></templatetableinsert>-->
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
import Templatetableinsert from "../template/Template.tableinsert.vue";
export default {
  name: "Diagnosisinfo",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        datetime: true
      },
      activeName: "first",
      infofile:{
        field:[
          "악성 파일", "진단 건수", "첫 유입일", "마지막 유입일",""
        ],
        innerField:[
          "날짜", "센서 ID", "사용자명", "부서명","PC 명", "IP 주소", "실행 파일명", "실행 경로",
        ],
        innerKey:[
          "EventTime", "nodeid", "username", "userdept", "userpc", "userip","ProcessName", "ProcessImagePath"
        ],
        orderOption:[
          { value:"count", label:"진단건수"},
          { value:"FileHash", label:"위험도"},
          { value:"firstSeenTime", label:"첫 유입일"},
          { value:"lastSeenTime", label:"마지막 유입일"}
        ],
        search:[],
        url:"",
        data:[],
        order:"count",
      },
      infoip:{
        field:[
          "URL/IP 주소", "진단 건수", "첫 유입일", "마지막 유입일",""
        ],
        innerField:[
          "날짜", "센서 ID", "사용자명", "부서명","PC 명", "IP 주소", "실행 파일명", "실행 경로"
        ],
        innerKey:[
          "EventTime", "nodeid", "username", "userdept", "userpc", "userip","ProcessName", "ProcessImagePath"
        ],
        orderOption:[
          { value:"count", label:"진단건수"},
          { value:"FileHash", label:"위험도"},
          { value:"firstSeenTime", label:"첫 유입일"},
          { value:"lastSeenTime", label:"마지막 유입일"}
        ],
        search:[],
        url:"",
        data:[],
        order:"count",
      },
      inforsc:{
        field:[
          "RSC 엔진 명", "진단 건수", "첫 유입일", "마지막 유입일",""
        ],
        innerField:[
          "날짜", "센서 ID", "사용자명", "부서명","PC 명", "PC IP 주소", "실행 경로", "연관 파일"
        ],
        innerKey:[
          "EventTime", "nodeid", "username", "userdept", "userpc", "userip","ProcessName", "ProcessImagePath"
        ],
        orderOption:[
          { value:"count", label:"진단건수"},
          { value:"FileHash", label:"위험도"},
          { value:"firstSeenTime", label:"첫 유입일"},
          { value:"lastSeenTime", label:"마지막 유입일"}
        ],
        search:[],
        url:"",
        data:[],
        order:"count",
      },
    };
  },
  computed: {
  },
  components: {
    TemplateSearchpannel,
    Templatetableinsert
  },
  watch: {},
  methods: {
    receiveData(form) {
//      if (form.datetime === "") {
//        this.$notify.error({
//          title: "Error",
//          message: "검색 조건을 입력하세요."
//        });
//      } else {
        if(this.activeName === "first"){
          this.mixData(this.infofile, form, 'file');
        }else if(this.activeName === "second"){
          this.mixData(this.infoip, form, 'ip');
        }else if(this.activeName === "third"){
          this.mixData(this.inforsc, form, 'rsc');
        }
      //}
    },
    mixData(local, receive, apiurl){
      const url = "/api/admin/search/detect/summary/"+apiurl;
      let data = {
        page: 1,
        length: 50,
        startDate: receive.datetime[0] ? receive.datetime[0].getTime(): null,
        endDate: receive.datetime[1] ? receive.datetime[1].getTime() : null,
        dept_code: receive.data.dept_code || "",
        node_id: receive.data.node_id || "",
        order: local.order,
        direction: 1
      };
      //console.log(data)
      this.$http.get(url, {
        params:data
      }).then(result => {
        local.data = result.data;
      });
      local.search = data;
      local.url = url;
    },
    reorder(val){
      //console.log(val)
      console.log(this.activeName)
      if(this.activeName === "first"){
        val.form.order = val.order;
        this.$http.get(val.url, {
          params:val.form
        }).then(result => {
          this.infofile.data = result.data.data;
        });
      }else if(this.activeName === "second"){
        val.form.order = val.order;
        this.$http.get(val.url, {
          params:val.form
        }).then(result => {
          this.infoip.data = result.data.data;
        });
      }else if(this.activeName === "third"){
        val.form.order = val.order;
        this.$http.get(val.url, {
          params:val.form
        }).then(result => {
          this.inforsc.data = result.data.data;
        });
      }
    }
  },
  beforeCreate() {},
  created() {
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
</style>
