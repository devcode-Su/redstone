<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      상세분석
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="프로세스 트리" name="first">
        <processtree v-if="ProcessGuid" :propData="{ProcessGuid:ProcessGuid,nodeid:nodeid}"></processtree>
        <!--<search-event-panel v-if="ProcessGuid" :propData="ProcessGuid"></search-event-panel>-->
        <!--<event-data-table v-if="ProcessGuid" :propData="ProcessGuid"></event-data-table>-->
        <search-event-form :propData="ProcessGuid"></search-event-form>
        <event-datatable :propData="ProcessGuid"></event-datatable>
      </el-tab-pane>
    </el-tabs>

  </article>
</template>
<script>
  import Processtree from "./Search.process.tree.vue";
  // import SearchEventPanel from "./Search.event.panel.vue";
  // import EventDataTable from "./Search.Search.event.datatable.vue";
  import SearchEventForm from "./Search.event.form";
  import EventDatatable from "./Search.event.datatable";
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";


  export default {
    name: "Searchanalysis",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        activeName: "first",
        datebtn: ["1시간", "일일", "주간", "월간"],
        checkAll: true,
        searchNavi: "전사",
        isIndeterminate: false,
        checklistAll: [
          "FILE", "IP", "RSC", "process", "network", "files", "registry"
        ],
        tableData: {
          field: ["시각", "분류", "내용"]
        },
        nodeid: null,
        process: null,
        ProcessGuid: null
      };
    },
    computed: {},
    components: {
      "processtree":Processtree,
      "event-datatable":EventDatatable,
      "search-event-form":SearchEventForm
    },
    watch: {},
    methods: {},
    beforeCreate() {
    },
    created() {

      this.$bus.$on('TreeProcessSelected', (processGuid) => {
        this.ProcessGuid = processGuid;
        console.log('Selected', this.ProcessGuid);
      });
    },
    beforeMounted() {
    },
    mounted() {
      if (this.$route.query && this.$route.query.ProcessGuid) {
        this.ProcessGuid = this.$route.query.ProcessGuid;
        this.nodeid = this.$route.query.nodeid;
        console.log('route', this.ProcessGuid, this.nodeid);
      }
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
      this.$bus.$off('TreeProcessSelected');
    },
    destroyed() {
    },
    mixins: [
      MixinsSetDatetime
    ]
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
