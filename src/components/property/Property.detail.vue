<template>
  <article>
    <tmplateSearchpannel></tmplateSearchpannel>
    <templatetablerouter :propData="detail" @reorder="reorder"></templatetablerouter>
  </article>
</template>
<script>
  import TemplateSearchpannel from "../template/Template.searchpannel";
  import Templatetablerouter from "../template/Template.tablerouter.vue";
  export default {
    name: "Diagnosisinfo",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        detail:{
          filed:[
            "", "센서 ID", "사용자명", "부서명", "PC 명", "PC IP 주소"
          ]
        }
      }
    },
    computed: {
    },
    components: {
      Templatetablerouter
    },
    watch: {},
    methods: {
//      receiveData(form) {
//        if (form.datetime === "") {
//          this.$notify.error({
//            title: "Error",
//            message: "검색 조건을 입력하세요."
//          });
//        } else {
//          if(this.activeName === "first"){
//            this.mixData(this.infofile, form, 'file');
//          }else if(this.activeName === "second"){
//            this.mixData(this.infoip, form, 'ip');
//          }else if(this.activeName === "third"){
//            this.mixData(this.inforsc, form, 'rsc');
//          }
//        }
//      },
//      mixData(local, receive, apiurl){
//        const url = "/api/admin/search/detect/summary/"+apiurl;
//        let data = {
//          page: 1,
//          length: 50,
//          startDate: receive.datetime[0].getTime(),
//          endDate: receive.datetime[1].getTime(),
//          dept_code: receive.data.dept_code || "",
//          node_id: receive.data.node_id || "",
//          order: local.order,
//          direction: 1
//        };
//        this.$http.get(url, data).then(result => {
//          local.data = result.data.data;
//        });
//        local.search = data;
//        local.url = url;
//      },
//      reorder(val){
//        console.log(this.activeName)
//        if(this.activeName === "first"){
//          val.form.order = val.order;
//          this.$http.get(val.url, val.form).then(result => {
//            console.log(result.data.data)
//            this.infofile.data = result.data.data;
//          });
//        }else if(this.activeName === "second"){
//          val.form.order = val.order;
//          this.$http.get(val.url, val.form).then(result => {
//            this.infoip.data = result.data.data;
//          });
//        }else if(this.activeName === "third"){
//          val.form.order = val.order;
//          this.$http.get(val.url, val.form).then(result => {
//            this.inforsc.data = result.data.data;
//          });
//        }
//      }
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
