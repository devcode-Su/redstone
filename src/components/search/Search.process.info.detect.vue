<template>
  <div data-inner-content>
    <h2>진단 정보</h2>
    <div data-inner-info v-if="(myData && myData.length > 0)">
      <template v-for="item in myData">
        <template v-if="item.Type === 'RSC'">
          <div data-info-section>
            <dl>
              <dt>진단명</dt>
              <dd>
                {{item.RuleId}}
                <a @click="windowOpen"><i class="fa fa-exclamation-circle"></i></a>
              </dd>
            </dl>
            <dl>
              <dt>위험도</dt>
              <dd>{{item.Score}}</dd>
            </dl>
            <dl>
              <dt>검출파일</dt>
              <dd>{{item.PathInfo1}}</dd>
            </dl>
            <dl v-if="item.rule">
              <dt>세부사항</dt>
              <dd>{{item.rule.description}}</dd>
            </dl>
            <dl v-if="item.AdditionalInfo">
              <dt>추가정보</dt>
              <dd>{{item.AdditionalInfo}}</dd>
            </dl>
          </div>
        </template>
        <template v-if="item.Type === 'FILE'">
          <div data-info-section>
            <dl>
              <dt>진단명</dt>
              <dd>
                TI 엔진
                <a v-if="item.malware" @href="item.malware.permalink" target="_new">
                  <i class="fa fa-exclamation-circle"></i>
                </a>
              </dd>
            </dl>
            <dl v-if="item.Score">
              <dt>위험도</dt>
              <dd>{{item.Score}}</dd>
            </dl>
            <dl v-if="item.malware">
              <dt>TI 엔진 스코어</dt>
              <dd>{{item.malware.positives}} / {{item.malware.total}}</dd>
            </dl>
            <dl v-if="item.PathInfo1">
              <dt>악성 파일</dt>
              <dd>{{item.PathInfo1}}</dd>
            </dl>
            <dl v-if="item.PathInfo2">
              <dt>악성 파일</dt>
              <dd>{{item.PathInfo2}}</dd>
            </dl>
          </div>
        </template>
        <template v-if="item.Type === 'IP'">
          <div data-info-section>
            <dl>
              <dt>진단명</dt>
              <dd>
                TI 엔진
                <a v-if="item.malware" @href="item.malware.permalink" target="_new">
                  <i class="fa fa-exclamation-circle"></i>
                </a>
              </dd>
            </dl>
            <dl>
              <dt>위험도</dt>
              <dd>{{item.Score}}</dd>
            </dl>
            <dl v-if="detect.malware">
              <dt>TI 엔진 스코어</dt>
              <dd>{{item.malware.positives}} / {{item.malware.total}}</dd>
            </dl>
            <dl v-if="item.PathInfo1">
              <dt>악성 IP</dt>
              <dd>{{item.PathInfo1}}</dd>
            </dl>
            <dl v-if="item.PathInfo2">
              <dt>악성 IP</dt>
              <dd>{{item.PathInfo2}}</dd>
            </dl>
          </div>
        </template>
      </template>
    </div>
    <div v-else data-not>
      진단 정보가 없습니다
    </div>
  </div>
</template>
<script>
  export default {
    name: "InfoDetect",
    props: {
      ProcessGuid: {
        type: String
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        myData: []
      };
    },
    computed: {},
    components: {
      // Component List
    },
    watch: {},
    methods: {
      getData(processGuid) {
        const url = `/api/admin/search/process/detect/${processGuid}`;
        this.$http.get(url)
          .then((data) => {
            this.myData = data.data;
          });
      },
      windowOpen(){
        // const url = "http://www.naver.com";
        // const op = "top=100, left=500, width=700, height=400, menubar=1, status=1, location=0";
        // window.open(url, "window", op);
        console.log("window popup ready");
      }
    },
    beforeCreate() {
    },
    created() {
      if (this.data) {
        this.myData.push(this.data);
      }
      else if (this.ProcessGuid) {
        this.getData(this.ProcessGuid);
      }
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
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
