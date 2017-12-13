<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      매체접근
    </h1>
    <security-mediaform @form="receive"></security-mediaform>
    <security-datatable :definition="definition"></security-datatable>
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
        definition: {
          url: '/api/admin/volume',
          field: {
            InsertTime: "장착시간",
            UnmountTime: "탈착시간",
            nodeid: "센서 ID",
            username: "사용자명",
            userdept: "부서명",
            userip: "PC IP 주소",
            FileSystem: "종류",
            BusType: "연결방식",
            VolumePath: "경로",
            VolumeName: "장치명",
            TotalNumberOfBytes: "용량",
            VolumeGuid: "발생이벤트",
          },
          order: [
            {value: 'EventTime', label: '장착시각'},
            {value: 'UnmountTime', label: '탈착시각'},
            {value: 'VolumeType', label: '종류'},
            {value: 'BusType', label: '연결방식'},
            {value: 'VolumePath', label: '경로'},
          ],
        },
      };
    },
    computed: {},
    components: {
      "security-mediaform": SecurityMediaform,
      "security-datatable": SecurityDatatable,
    },
    watch: {},
    methods: {
      receive(form) {
        this.$bus.$emit('search-option', form);
      },
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
