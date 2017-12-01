<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      SW 정보
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="운영체제" name="first">
        <span class="search-id">{{searchNavi}}에서 검색</span>
        <!--<propertypannel></propertypannel>-->
        <propertydatatable :propData="propertyOS"></propertydatatable>
      </el-tab-pane>
      <el-tab-pane label="브라우저" name="second">
        <span class="search-id">{{searchNavi}}에서 검색</span>
        <propertydatatable :propData="propertyBR"></propertydatatable>
      </el-tab-pane>
      <el-tab-pane label="소프트웨어" name="third">
        <searchpannel :pannelType="pannelset"></searchpannel>
        <propertydatatable :propData="propertySW"></propertydatatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import Propertypannel from "./Property.pannel.vue";
import Propertydatatable from "./Property.datatable.vue";
import Searchpannel from "../template/Template.searchpannel.vue";
export default {
  name: "Propertysw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      searchNavi: "전사",
      pannelset: {
        programs: true
      },
      activeName: "first",
      infofile: {
        field: ["악성 파일", "진단 건수", "첫 유입일", "마지막 유입일", ""],
        orderOption: [
          { value: "count", label: "진단건수" },
          { value: "FileHash", label: "위험도" },
          { value: "firstSeenTime", label: "첫 유입일" },
          { value: "lastSeenTime", label: "마지막 유입일" }
        ],
        search: [],
        url: "",
        data: [],
        order: "count"
      },
      propertyOS: {
        field: ["운영체제", "서비스팩", "PC 대수"],
        data: [],
        orderOption: ["1", "2", "3"]
      },
      propertyBR: {
        field: ["소프트웨어", "버전", "설치 PC 대수"],
        data: [],
        orderOption: ["1", "2", "3"]
      },
      propertySW: {
        field: ["소프트웨어", "버전", "설치 PC 대수"],
        data: [],
        orderOption: ["1", "2", "3"]
      }
    };
  },
  computed: {},
  components: {
    Propertydatatable,
    Propertypannel,
    Searchpannel
  },
  watch: {},
  methods: {},
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
.search-id {
  display: block;
  transform: translateY(20px);
}
</style>
