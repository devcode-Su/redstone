<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      매체접근
    </h1>
    <security-mediaform @form="receive"></security-mediaform>
    <security-datatable :from-data="formData" :local-data="media"></security-datatable>
  </article>
</template>
<script>
import SecurityMediaform from "../form/Security.media.form";
import SecurityDatatable from "./Security.media.datatable";
export default {
  name: "Securitymedia",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      formData: {},
      media : {
        fields: {
          InsertTime: "장착시간",
          UnmountTime: "탈착시간",
          nodeid: "센서 ID",
          username: "사용자명",
          userdept: "부서명",
          userip: "PC IP 주소",
          RuntimeMount: "진단개수",
          FileSystem: "종류",
          BusType: "연결방식",
          VolumePath: "경로",
          VolumeName: "장치명",
          TotalNumberOfBytes: "용량",
          VolumeGuid: "발생이벤트"
        },
      }
    };
  },
  computed: {},
  components: {
    "security-mediaform" :SecurityMediaform,
    "security-datatable" :SecurityDatatable
  },
  watch: {},
  methods: {
    receive(form){
      console.log(form)
      //return form
      this.formData = {
        url : "/api/admin/volume/"
      }
    },
    receiveData(form) {
      console.log("file");
      const url = "/api/admin/volume/TYPE/CODE";
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
</style>
