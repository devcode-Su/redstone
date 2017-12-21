<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      파일 검색
    </h1>
    <file-searchform></file-searchform>
    <search-file-datatable :local-data="local"></search-file-datatable>
  </article>
</template>
<script>
  import FileSearchform from "../form/Search.file.form";
  import SearchFileDatatable from "./Search.file.datatable.vue";

  export default {
    name: "Searchfile",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        local: {
          fields: {
            nodeid :"센서 ID",
            username:"사용자명",
            name:"부서명",
            computer:"PC 명",
            ip:"IP",
            FileName:"파일명",
            Md5Hash:"해시값",
            FilePath:"파일경로",
            InsertTime:"검출시간",
          },
          url: "/api/admin/search/file",
          rowKey: [
            "nodeid", "node.info.username",
          ],
          order: {
            InsertTime:"검출시간",
            FileName:"파일명",
            FilePath:"파일경로",
            Md5Hash:"파일해시",
          }
        },
      };
    },
    computed: {},
    components: {
      "file-searchform": FileSearchform,
      "search-file-datatable": SearchFileDatatable,
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
