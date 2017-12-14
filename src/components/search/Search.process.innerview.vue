<template>
  <section class="inner-view inner-view-box">
    <information-process-create :ProcessGuid="ProcessGuid"></information-process-create>
    <information-file-master :ProcessGuid="ProcessGuid"></information-file-master>
    <information-detect :ProcessGuid="ProcessGuid"></information-detect>
  </section>
</template>
<script>
  import InformationProcessCreate from './Information.ProcessCreate.vue';
  import InformationFileMaster from './Information.FileMaster.vue';
  import InformationDetect from './Information.Detect.vue';

  export default {
    name: "Processinnerview",
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
      "information-process-create":InformationProcessCreate,
      "information-file-master":InformationFileMaster,
      "information-detect":InformationDetect
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
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";

  tr {
    cursor: pointer;
  }

  .inner-view-box {
    margin: 10px 0;
    border: 1px solid color(default);
    h1 {
      margin-bottom: 0;
      padding: 0 20px;
      font-size: 16px;
      color: #fff;
      background-color: color(default);
    }
    .process-info {
      padding: 15px 20px;
    }
    h2 {
      margin-bottom: 0;
      font-size: 14px;
      color: color(default);
    }
    .content-wrap {
      margin-bottom: 30px;
      padding-left: 30px;
      dl {
        display: flex;
        margin: 0;
      }
      dt {
        width: 130px;
        font-size: 14px;
        font-weight: bold;
        color: color(default);
        &:before {
          content: "";
          display: inline-block;
          width: 3px;
          height: 3px;
          margin-right: 5px;
          vertical-align: 3px;
          background-color: color(default);
        }
      }
      dd {
        flex: 1;
        margin-left: 0;
        color: #5d5d5d;
      }
      dt,
      dd {
        line-height: 24px !important;
      }
    }
    .info-list {
      margin-bottom: 15px;
    }

    .danger-label-1 {
      font-weight: bold;
      color: red
    }
    .danger-label-2 {
      color: orangered;
    }
    .danger-label-3 {
      color: orange;
    }
    .danger-label-4 {
      color: yellow;
    }
    .danger-label-5 {
      color: greenyellow;
    }
  }

</style>
