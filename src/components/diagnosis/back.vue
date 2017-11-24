<template>
  <article>
    <h1 class="page-title">
      위협PC기반
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="악성 파일 검출" name="first">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <templatetableinsert :propData="pcfile" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="악성 URL/IP 검출" name="second">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <templatetableinsert :propData="pcip" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
      <el-tab-pane label="RSC 엔진 검출" name="third">
        <template-searchpannel :pannelType="pannelset" @searchData="receiveData"></template-searchpannel>
        <templatetableinsert :propData="pcrsc" @reorder="reorder"></templatetableinsert>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import TemplateSearchpannel from "../template/Template.searchpannel";
  import Templatetableinsert from "../template/Template.tableinsert.vue";
  export default {
    name: "Diagnosispc",
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
        pcfile:{
          field:[
            "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수"
          ],
          innerField:[
            "날짜", "센서 ID", "사용자명", "부서명","PC 명", "IP 주소", "실행 파일명", "실행 경로"
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
        pcip:{
          field:[
            "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "접근 횟수",""
          ],
          innerField:[
            "날짜", "센서 ID", "사용자명", "부서명","PC 명", "IP 주소", "실행 파일명", "실행 경로"
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
        pcrsc:{
          field:[
            "센서 ID", "사용자명", "부서명", "PC명", "PC IP 주소", "진단개수",""
          ],
          innerField:[
            "날짜", "센서 ID", "사용자명", "부서명","PC 명", "IP 주소", "실행 파일명", "실행 경로"
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
    computed: {},
    components: {
      TemplateSearchpannel,
      Templatetableinsert
    },
    watch: {},
    methods: {
      receiveData(form) {
        console.log("?????")
        if (form.datetime === "") {
          this.$notify.error({
            title: "Error",
            message: "검색 조건을 입력하세요."
          });
        } else {
          if(this.activeName === "first"){
            this.mixData(this.infofile, form, 'file');
          }else if(this.activeName === "second"){
            this.mixData(this.infoip, form, 'ip');
          }else if(this.activeName === "third"){
            this.mixData(this.inforsc, form, 'rsc');
          }
        }
      },
      mixData(local, receive, apiurl){
        const url = "/api/admin/search/detect/summary/pc/"+apiurl;
        let data = {
          page: 1,
          length: 50,
          startDate: receive.datetime[0].getTime(),
          endDate: receive.datetime[1].getTime(),
          dept_code: receive.data.dept_code || "",
          node_id: receive.data.node_id || "",
          order: local.order,
          direction: 1
        };
        this.$http.get(url, data).then(result => {
          local.data = result.data.data;
        });
        local.search = data;
        local.url = url;
      },
      reorder(val){
        console.log(this.activeName)
        if(this.activeName === "first"){
          val.form.order = val.order;
          this.$http.get(val.url, val.form).then(result => {
            console.log(result.data.data)
            this.infofile.data = result.data.data;
          });
        }else if(this.activeName === "second"){
          val.form.order = val.order;
          this.$http.get(val.url, val.form).then(result => {
            this.infoip.data = result.data.data;
          });
        }else if(this.activeName === "third"){
          val.form.order = val.order;
          this.$http.get(val.url, val.form).then(result => {
            this.inforsc.data = result.data.data;
          });
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
</style>
