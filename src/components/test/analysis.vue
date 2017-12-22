<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      상세분석
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="프로세스 트리" name="first">
        <!--<processtree v-if="ProcessGuid && nodeid" :propData="{ProcessGuid:ProcessGuid,nodeid:nodeid}"></processtree>-->
        <search-event-panel :propData="ProcessGuid"></search-event-panel>
        <event-datatable :propData="ProcessGuid"></event-datatable>
      </el-tab-pane>
    </el-tabs>

  </article>
</template>
<script>
  import Processtree from "./Search.process.tree.vue";
  import EventForm from "../search/Search.event.form.vue";
  import EventDatatable from "../search/Search.event.datatable.vue";
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
        process: null,
        ProcessGuid: null
      };
    },
    computed: {},
    components: {
      "processtree":Processtree,
      "event-form": EventForm,
      "event-datatable":EventDatatable,
    },
    watch: {},
    methods: {},
    beforeCreate() {
    },
    created() {
      if (this.$route.query && this.$route.query.ProcessGuid) {
        this.ProcessGuid = this.$route.query.ProcessGuid;
        this.nodeid = this.$route.query.nodeid;
        console.log('route', this.ProcessGuid, this.nodeid);
      }
      this.$bus.$on('TreeProcessSelected', (processGuid) => {
        this.ProcessGuid = processGuid;
        console.log('Selected', this.ProcessGuid);
      });
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
