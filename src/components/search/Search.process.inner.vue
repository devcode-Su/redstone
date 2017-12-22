<template>
  <section data-process-inner>
    <info-process :process-guid="ProcessGuid"></info-process>
    <info-file :process-guid="ProcessGuid"></info-file>
    <info-detect :process-guid="ProcessGuid"></info-detect>
  </section>
</template>
<script>
  import InfoProcess from './Search.process.info.process.vue';
  import InfoFile from './Search.process.info.file.vue';
  import InfoDetect from './Search.process.info.detect.vue';

  export default {
    name: "ProcessInner",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      ProcessGuid: {
        type: String,
        required: true
      }
    },
    data() {
      return {};
    },
    computed: {},
    components: {
      "info-process":InfoProcess,
      "info-file":InfoFile,
      "info-detect":InfoDetect
    },
    watch: {},
    methods: {},
    beforeCreate() {
    },
    created() {
      //console.log(this.ProcessGuid)
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      //console.log(this.ProcessGuid)
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    }
  };
</script>
<style lang='scss'>
  @import "~styles/variables";
</style>
