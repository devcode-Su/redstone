<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      상세분석
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="프로세스 트리" name="first">
        <!--<processtree></processtree>-->
        <searchpannel></searchpannel>
        <!--<processdatatable></processdatatable>-->
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import Processtree from "../search/Search.process.tree.vue";
import Searchpannel from "../search/Search.pannel.vue";
import Processdatatable from "../search/Search.process.datatable.vue";
import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
//import { EventBus } from "@/main"
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
        "FILE",
        "IP",
        "RSC",
        "process",
        "network",
        "files",
        "registry"
      ],
      tableData: {
        field: ["시각", "분류", "내용"]
      }
    };
  },
  computed: {},
  components: {
    "processtree":Processtree,
    "processdatatable":Processdatatable,
    "searchpannel":Searchpannel
  },
  watch: {},
  methods: {
    receiveBus(data) {
      console.log(data);
    }
  },
  beforeCreate() {},
  created() {
    //EventBus.$on("processtree", this.receiveBus)
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  mixins: [MixinsSetDatetime]
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
