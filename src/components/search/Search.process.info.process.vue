<template>
  <div data-inner-content>
    <h2>프로세스 정보</h2>
    <div data-inner-info>
      <dl>
        <dt>프로세스 고유 ID</dt>
        <dd>{{data.ProcessGuid}}</dd>
      </dl>
      <dl>
        <dt>프로세스 명</dt>
        <dd>{{data.ProcessName}}</dd>
      </dl>
      <dl>
        <dt>SHA256</dt>
        <dd class="sha" @click.stop="openSHA(data.FileHash)">{{data.FileHash}}</dd>
      </dl>
      <dl>
        <dt>MD5</dt>
        <dd>{{data.Md5Hash}}</dd>
      </dl>
      <dl>
        <dt>PID</dt>
        <dd>{{data.ProcessId}}</dd>
      </dl>
      <dl>
        <dt>프로세스 경로</dt>
        <dd>{{data.ProcessImagePath}}</dd>
      </dl>
      <dl>
        <dt>Session ID"</dt>
        <dd>{{data.SessionId}}</dd>
      </dl>
      <dl v-if="data.InteractiveFlag !== '0'">
        <dt>GUI</dt>
        <dd>{{data.InteractiveFlag}}</dd>
      </dl>
      <dl v-if="data.InteractiveFlag !== '0'">
        <dt>WindowText</dt>
        <dd>{{data.WindowTex}}</dd>
      </dl>
      <dl v-if="data.InteractiveFlag !== '0'">
        <dt>WindowClassName</dt>
        <dd>{{data.WindowClassName}}</dd>
      </dl>
      <dl>
        <dt>CommandLine</dt>
        <dd>{{data.CommandLine}}</dd>
      </dl>
      <dl>
        <dt>파일 생성 시각</dt>
        <dd>{{data.CreateDate}}</dd>
      </dl>
      <dl>
        <dt>파일 수정 시각</dt>
        <dd>{{data.InsertTime}}</dd>
      </dl>
      <dl>
        <dt>파일 속성</dt>
        <dd>{{data.FileAttributes}}</dd>
      </dl>
      <dl>
        <dt>시작 시각</dt>
        <dd>{{data.EventTime}}</dd>
      </dl>
      <dl v-if="data.EventTime1">
        <dt>종료 시각</dt>
        <dd>{{data.EventTime1}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
  import windowOpenMixin from "../mixins/window.open.mixin"
  export default {
    name: "InfoProcess",
    props: {
      ProcessGuid: {
        type: String
      }
    },
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    components: {
      // Component List
    },
    watch: {},
    methods: {
      getData(processGuid) {
        const url = `/api/admin/search/process/info/${processGuid}`;
        this.$http.get(url)
          .then((data) => {
            let d = data.data.rows;
            if (d.length > 1) {
              d[0].EventTime1 = d[1].EventTime;
            }
            this.data = d[0];
          });
      },
    },
    beforeCreate() {
    },
    created() {
      console.log(this);
      if (this.ProcessGuid) {
        this.getData(this.ProcessGuid);
      }
//      if (this.$route.query && this.$route.query.ProcessGuid) {
//        this.ProcessGuid = this.$route.query.ProcessGuid;
//        this.nodeid = this.$route.query.nodeid;
//      }
//      this.$bus.$on('TreeProcessSelected', (processGuid) => {
//        this.ProcessGuid = processGuid;
//      });
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
//      this.$bus.$off('TreeProcessSelected');
    },
    destroyed() {
    },
    mixins:[windowOpenMixin]
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
