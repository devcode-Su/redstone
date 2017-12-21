<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      프로세스 검색
    </h1>
    <process-form></process-form>
    <process-datatable :definition="definition"></process-datatable>
  </article>
</template>
<script>
  import ProcessForm from "../search/Search.process.form";
  import ProcessDatatable from "../search/Search.process.datatable.vue";
  import MixinsSetDatetime from "../mixins/setDatetime.mixin"

  export default {
    name:    "Searchprocess",
    extends: {},
    props:   {
      psd: {
        type: Object | Array,
      },
    },

    data() {
      return {
        definition: {
          fields: {
            EventTime :"프로세스 시작 시각",
            ProcessName: "프로세스 이름",
            username: "이름",
            userdept:"부서",
            nodeid: "센서 ID",
            event_count : "검색된 이벤트 수",
            event_info :"위협 정보"
          },
          order: {
            time: '프로세스 시작 시각',
            process_name: '프로세스 이름',
          }
        },
      };
    },
    computed:   {
    },
    components: {
      "process-form" : ProcessForm,
      "process-datatable": ProcessDatatable,
    },
    watch: {
    },
    methods: {
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
    mixins:     [
      MixinsSetDatetime,
    ],
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

</style>
