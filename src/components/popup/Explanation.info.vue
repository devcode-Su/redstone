<template>
  <section data-window>
    <h1>
      실행파일 상세정보
    </h1>
    <div v-if="checkData" data-none>
      표시할 정보 내용이 없습니다.
    </div>
    <div v-else data-popup-content>
      <div data-popup-section="virus-total">
        <div>
          <dl>
            <dt>[MD5]</dt>
            <dd>{{md5}}</dd>
          </dl>
          <dl>
            <dt>[SHA256]</dt>
            <dd>{{sha256}}</dd>
          </dl>
          <dl>
            <dt>대표 파일명</dt>
            <dd>{{responseInfo.internal_name}}</dd>
          </dl>
        </div>
        <el-button size="small" @click.stop="openVirusTotal(sha256)">VIRUS TOTAL 조회</el-button>
      </div>
      <div data-popup-section>
        <h2>일반 정보</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr>
              <th>File Version</th>
              <td>{{responseInfo.version}}</td>
            </tr>
            <tr>
              <th>Internal Name</th>
              <td>{{responseInfo.internal_name}}</td>
            </tr>
            <tr>
              <th>Company Name</th>
              <td>{{responseInfo.company_name}}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{{responseInfo.product_name}}</td>
            </tr>
            <tr>
              <th>Legal Copyright</th>
              <td>{{responseInfo.legal_copyright}}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{{responseInfo.platform}}</td>
            </tr>
            <tr>
              <th>File Size</th>
              <td>{{responseInfo.size}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-popup-section>
        <h2>전자서명 정보</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr>
              <th>Signing 상태</th>
              <td>{{responseInfo.sign_status}} [{{responseInfo.sign_validity}}]</td>
            </tr>
            <tr>
              <th>Publisher</th>
              <td>{{responseInfo.sign_publisher || "-"}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-popup-section>
        <h2>분석 결과</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr>
              <th>TI 진단결과</th>
              <td>{{responseDetect.file || 0}}</td>
            </tr>
            <tr>
              <th>RSC 진단결과</th>
              <td>{{responseDetect.rsc || 0}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-popup-section>
        <h2>파일명</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr v-for="row in responseListFileName">
              <td>{{row}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-popup-section>
        <h2>발견된 경로</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr v-for="row in responseListFilePath">
              <td>{{row.path}} [{{row.count}}]</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-popup-section>
        <h2>빈도 정보</h2>
        <div data-table="table">
          <table>
            <tbody>
            <tr>
              <th>발견된 PC 수</th>
              <td>{{frequencyInfo.nodeCount}}</td>
            </tr>
            <tr>
              <th>발견된 개체 수</th>
              <td>{{frequencyInfo.fileCount}}</td>
            </tr>
            <tr>
              <th>최초 발견된 날짜</th>
              <td>{{frequencyInfo.firstSeen}}</td>
            </tr>
            <tr>
              <th>마지막 발견된 날짜</th>
              <td>{{frequencyInfo.lastSeen}}</td>
            </tr>
            <tr>
              <th>최초 발견된 센서</th>
              <td>{{frequencyInfo.nodeCount}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import windowOpenMixin from "../mixins/window.open.mixin";
  export default {
    name: "Datetime",
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        url:"",
        sha256: null,
        md5: "",
        responseInfo: [],
        responseDetect: [],
        responseList: [],
        responseListFileName: [],
        responseListFilePath: [],
        frequencyInfo : [],
        checkData: true,
      };
    },
    computed: {},
    components: {},
    watch: {
      sha256(s) {
        if (s) {
          //console.log("alive");
          this.getInfo();
          this.getList();
        }
      },
      responseInfo(r) {
        if (r) {
          this.checkData = false;
          this.md5 = r.md5;
          this.getDetect();
          return r;
        } else {
          this.checkData = true;
        }
      },
      responseList(r) {
        if (r) {
          //console.log(r);
          this.responseListFileName = [...new Set(r.map((item) => {
            return item.FileName;
          }))];

          this.responseListFilePath = [];
          let d = r.reduce((p, c) => {
            if (p.indexOf(c.FilePath) > -1) {
              p[c.FilePath]++;
            }
            else {
              p[c.FilePath] = 0;
            }
            return p;
          }, []);
          for (let key in d) {
            this.responseListFilePath.push({path: key, count: d[key]});
          }

          this.getFileStatistics(r);
          //console.log(this.frequencyInfo)
        } else {
          this.checkData = true;
        }
      },
      responseDetect(r) {
        if (r) {
          //console.log(r);
          if (r.length > 0) {
            return r.reduce((p, c) => {
              if (c.Type === 'RSC') p.rsc++;
              else if (c.Type === 'FILE') p.file++;
              return p;
            });
          }
        } else {
          this.checkData = true;
        }
      }
    },
    methods: {
      getInfo() {
        const url = "/api/admin/search/file/info/master/sha256/" + this.sha256;
        this.$http.get(url).then(response => {
          //console.log(response);
          this.responseInfo = response.data;
        })
      },
      getList() {
        const url = "/api/admin/search/file/list/sha256/" + this.sha256;
        this.$http.get(url).then(response => {
          //console.log(response);
          this.responseList = response.data;
        });
      },
      getDetect() {
        const url = "/api/admin/search/detect/file/" + this.md5;
        this.$http.get(url).then(response => {
          //console.log(response);
          this.responseDetect = response.data;
        });
      },
      getFileStatistics(data) {
        if (data.length > 0) {
          let nodeCount = [];
          this.frequencyInfo.fileCount = data.length;
          this.frequencyInfo.nodeCount = data.reduce((prev, curr) => {
            let exist = prev.find((item) => item.nodeid === curr.nodeid);
            if (!exist) {
              prev.push(curr);
            }
            return prev;
          }, nodeCount).length;
          let min = data.reduce((prev, curr) => {
            return prev.InsertTime > curr.InsertTime ? curr : prev;
          });
          let max = data.reduce((prev, curr) => {
            return prev.InsertTime > curr.InsertTime ? prev : curr;
          });
          this.frequencyInfo.firstSeen = min.InsertTime;
          this.frequencyInfo.lastSeen = max.InsertTime;
          this.frequencyInfo.firstNodeId = min.nodeid;
        }
        return data;
      }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
      if (this.$route.query) {
        //console.log(this.$route.query);
        this.sha256 = this.$route.query.sha256;
      }
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
    },
    mixins : [windowOpenMixin]
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";

  [data-window] {
    > div {
      height: 515px;
    }
  }

</style>
