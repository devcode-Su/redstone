<template>
  <div>
    <h2>파일 정보</h2>
    <div class="content-wrap">
      <dl>
        <dt>전자서명</dt>
        <dd>{{data.sign_status}}</dd>
      </dl>
      <dl v-if="data.sign_status === 'signed'">
        <dt>검증</dt>
        <dd>{{data.sign_validity}}</dd>
        <dt>서명자</dt>
        <dd>{{data.sign_publisher}}</dd>
      </dl>
      <dl>
        <dt>회사명</dt>
        <dd>{{data.company_name}}</dd>
      </dl>
      <dl>
        <dt>종류</dt>
        <dd>{{data.type}}</dd>
      </dl>
      <dl>
        <dt>실행파일 종류</dt>
        <dd>{{data.exe_type}} ({{data.platform}})</dd>
      </dl>
      <dl>
        <dt>버전</dt>
        <dd>{{data.version}}</dd>
      </dl>
      <dl>
        <dt>내부 이름</dt>
        <dd>{{data.internal_name}}</dd>
      </dl>
      <dl>
        <dt>제품명</dt>
        <dd>{{data.product_name}}</dd>
      </dl>
      <dl>
        <dt>빌드시각</dt>
        <dd>{{data.build_date}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
  export default {
    name: "InformationFileMaster",
    props: {
      ProcessGuid: {
        type: String
      },
      FileHash: {
        type: String
      }
    },
    data() {
      return {
        data: {}
      };
    FileHash: {
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
      const url = `/api/admin/search/file/info/master/process_guid/${processGuid}`;
      this.$http.get(url).then(data => {
        this.data = data.data;
      });
    },
    computed: {},
    components: {
      // Component List
    },
    watch: {},
    methods: {
      getData(processGuid) {
        const url = `/api/admin/search/file/info/master/process_guid/${processGuid}`;
        this.$http.get(url)
          .then((data) => {
            this.data = data.data;
          });
      },
      getDataEx(fileHash) {
        const url = `/api/admin/search/file/info/master/sha256/${fileHash}`;
        this.$http.get(url)
          .then((data) => {
            this.data = data.data;
          });
      }
    },
    beforeCreate() {
    },
    created() {
      if (this.ProcessGuid) {
        this.getData(this.ProcessGuid);
      }
      else if (this.FileHash) {
        this.getDataEx(this.FileHash);
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
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
//      this.$bus.$off('TreeProcessSelected');
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
