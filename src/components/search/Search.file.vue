<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      파일 검색
    </h1>
    <file-searchform></file-searchform>
    <searchfiledatatable :definition="definition"></searchfiledatatable>
  </article>
</template>
<script>
  import FileSearchform from "../form/File.search.form";
  import Searchfiledatatable from "./Search.file.datatable.vue";

  export default {
    name: "Searchfile",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        definition: {
          field: [
            "",
            "센서 ID",
            "사용자명",
            "부서명",
            "PC 명",
            "IP",
            "파일명",
            "해시값",
            "경로명",
            "검출시간",
          ],
          url: "/api/admin/search/file",
          rowKey: [
            "nodeid", "node.info.username",
          ],
          order: [
            {label: '검출시각', value: 'InsertTime', default: true},
            {label: '파일명', value: 'FileName'},
            {label: '파일경로', value: 'FilePath'},
            {label: '파일해시', value: 'Sha256Hash'},
          ],
        },
      };
    },
    computed: {},
    components: {
      "file-searchform": FileSearchform,
      "searchfiledatatable": Searchfiledatatable,
    },
    watch: {},
    methods: {},
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
  @import "~styles/variables";
</style>
