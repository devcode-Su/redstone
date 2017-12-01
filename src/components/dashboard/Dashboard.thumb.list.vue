<template>
<section class="component-thumb">
  <!--<draggable v-model="userSets" class="thumb-wrap">-->
    <!--<transition-group type="transition" name="thumb" tag="ul" class="thumb-wrap">-->
      <!--<li class="thumb-item" v-for="(usersetList, index) in resourceList" :key="usersetList.title">-->
        <!--<component :is="usersetList.type" :title="usersetList.title" :thumb-data="usersetList.data"></component>-->
      <!--</li>-->
    <!--</transition-group>-->
  <!--</draggable>-->
  <thumbchartfilepc></thumbchartfilepc>
  <thumbchartrscpc></thumbchartrscpc>
  <thumbcharturlpc></thumbcharturlpc>
  <thumbtablelan></thumbtablelan>
  <thumbtablemedia></thumbtablemedia>
  <thumbtableos></thumbtableos>
  <thumbtableprogram></thumbtableprogram>
  <thumbtablebtnfile></thumbtablebtnfile>
  <thumbtablebtnurl></thumbtablebtnurl>
  <thumbtablebtnrsc></thumbtablebtnrsc>
  <thumbtableimport></thumbtableimport>
</section>
</template>
<script>
  import draggable from "vuedraggable";
  import Thumbchartfilepc from "./thumb/Dashboard.thumb.chart.filepc.vue";
  import Thumbchartrscpc from "./thumb/Dashboard.thumb.chart.rscpc.vue";
  import Thumbcharturlpc from "./thumb/Dashboard.thumb.chart.urlpc.vue";
  import Thumbtablelan from "./thumb/Dashboard.thumb.table.lan.vue";
  import Thumbtablemedia from "./thumb/Dashboard.thumb.table.media.vue";
  import Thumbtableos from "./thumb/Dashboard.thumb.table.os.vue";
  import Thumbtableprogram from "./thumb/Dashboard.thumb.table.program.vue";
  import Thumbtablebtnfile from "./thumb/Dashboard.thumb.table.btn.file.vue";
  import Thumbtablebtnurl from "./thumb/Dashboard.thumb.table.btn.url.vue";
  import Thumbtablebtnrsc from "./thumb/Dashboard.thumb.table.btn.rsc.vue";
  import Thumbtableimport from "./thumb/Dashboard.thumb.table.import.vue";

  export default {
    name: "Dashboardthumblist",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData:{
        type: Array | Object
      }
    },
    data() {
      return {

      };
    },
    computed: {

    },
    components: {
      draggable,
      "thumbchartfilepc" : Thumbchartfilepc,
      "thumbchartrscpc" : Thumbchartrscpc,
      "thumbcharturlpc" : Thumbcharturlpc,
      "thumbtablelan" : Thumbtablelan,
      "thumbtablemedia" : Thumbtablemedia,
      "thumbtableos" : Thumbtableos,
      "thumbtableprogram" : Thumbtableprogram,
      "thumbtablebtnfile" : Thumbtablebtnfile,
      "thumbtablebtnurl" : Thumbtablebtnurl,
      "thumbtablebtnrsc" : Thumbtablebtnrsc,
      "thumbtableimport" : Thumbtableimport
    },
    watch: {},
    methods: {
    },
    beforeCreate() {},
    created() {
    },
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
<style lang='scss' scoped></style>
