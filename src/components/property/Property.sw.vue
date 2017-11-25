<template>
  <article>
    <h1 class="page-title">
      SW 정보
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="운영체제" name="first">
        운영체제 content
      </el-tab-pane>
      <el-tab-pane label="브라우저" name="second">
        브라우저 content
      </el-tab-pane>
      <el-tab-pane label="소프트웨어" name="third">
        소프트웨어 content
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
import Templatetablerouter from "../template/Template.tablerouter.vue";
export default {
  name: "Propertysw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
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
      }
    };
  },
  computed: {},
  components: {
    Templatetablerouter
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
</style>
