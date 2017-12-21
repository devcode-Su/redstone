<template>
  <section data-process-inner>
    <h1>상세정보</h1>
    <div class="process-info" v-if="propData.Table === 'PROCESS_CREATE_LOG'">
      <info-process :ProcessGuid="propData.ProcessGuid"></info-process>
      <info-file :ProcessGuid="propData.ProcessGuid"></info-file>
    </div>
    <div v-else-if="propData.Table === 'PROCESS_EXIT_LOG'">
      <info-process :ProcessGuid="propData.ProcessGuid"></info-process>
    </div>
    <div v-else-if="propData.Table === 'CHILDPROCESS_CREATE_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <dl>
            <dt>자식 프로세스 고유 ID</dt>
            <dd><a @click="selectProcess(propData.ChildProcessGuid)">{{propData.ChildProcessGuid}}</a></dd>
          </dl>
        </div>
      </div>
      <info-process :ProcessGuid="propData.ChildProcessGuid"></info-process>
      <info-file :ProcessGuid="propData.ChildProcessGuid"></info-file>
    </div>
    <div v-else-if="propData.Table === 'MODULE_LOAD_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <dl>
            <dt>SHA256</dt>
            <dd><a>{{propData.FileHash}}</a></dd>
          </dl>
        </div>
      </div>
      <info-file v-if="propData.FileHash" :FileHash="propData.FileHash"></info-file>
    </div>
    <div v-else-if="propData.Table === 'NETWORK_CONNECT_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <dl>
            <dt>LocalIP</dt>
            <dd>{{propData.LocalIp}}</dd>
          </dl>
          <dl>
            <dt>LocalPort</dt>
            <dd>{{propData.LocalPort}}</dd>
          </dl>
          <dl>
            <dd>{{propData.Direction === 'OUT' ? '▼' : '▲'}} ({{propData.Protocol}})</dd>
          </dl>
          <dl>
            <dt>RemoteIP</dt>
            <dd>
              <a>
                <template v-if="propData.Domain">
                  {{propData.RemoteIp}} ({{propData.Domain}})
                </template>
                <template v-else>
                  {{propData.RemoteIp}}
                </template>
              </a>
            </dd>
          </dl>
          <dl>
            <dt>RemotePort</dt>
            <dd>{{propData.RemotePort}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div v-else-if="propData.Table === 'NETWORK_DISCONNECT_LOG'">
      <!-- N/A -->
    </div>
    <div v-else-if="propData.Table === 'REGISTRY_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <dl>
            <dt>KeyPath</dt>
            <dd>{{propData.RegKeyPath}}</dd>
            ;
          </dl>
          <template v-if="propData.EventType === 'RegCreateKey'">
            <!-- N/A -->
          </template>
          <template v-else-if="propData.EventType === 'RegRenameKey'">
            <dl>
              <dt>KeyPath(new)</dt>
              <dd>{{propData.RegNewKeyPath}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'RegSetValue'">
            <dl>
              <dt>ValueName</dt>
              <dd>{{propData.RegValueName}} ({{propData.RegDataType}})</dd>
            </dl>
            <dl>
              <dt>Value</dt>
              <dd>{{propData.RegValue}} ({{propData.DataSize}})</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'RegDeleteKey'">
            <!-- N/A -->
          </template>
          <template v-else-if="propData.EventType === 'RegDeleteValue'">
            <dl>
              <dt>ValueName</dt>
              <dd>{{propData.RegValueName}}</dd>
            </dl>
          </template>
        </div>
      </div>
    </div>
    <div v-else-if="propData.Table === 'FILE_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <template v-if="propData.EventType === 'FileCreate'">
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl v-if="propData.FileType">
              <dt>FileType</dt>
              <dd>{{propData.FileType}}</dd>
            </dl>
            <dl v-if="propData.Information">
              <dt>대상 파일</dt>
              <dd>{{propData.Information}}</dd>
            </dl>
            <dl v-if="propData.FileHash">
              <dt>SHA256</dt>
              <dd>{{propData.FileHash}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileMod'">
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl>
              <dt>FileType</dt>
              <dd>{{propData.FileType}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileMove'">
            <dl>
              <dt>원본경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl>
              <dt>대상경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl v-if="propData.Information">
              <dt>대상파일</dt>
              <dd>{{propData.Information}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileDelete'">
            <dl>
              <dt>경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileSetAttr'">
            <dl>
              <dt>경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl>
              <dt>속성</dt>
              <dd>{{propData.Information}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileRead'">
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
            </dl>
            <dl v-if="propData.FileType">
              <dt>FileType</dt>
              <dd>{{propData.FileType}}</dd>
            </dl>
          </template>
          <template v-else-if="propData.Table === 'FilePrint'">
            <dl>
              <dt>출력 문서</dt>
              <dd>{{propData.FilePath1}}</dd>
            </dl>
          </template>
          <template v-if="propData.CreateDate || propData.ModifiedDate">
            <dl v-if="propData.CreateDate">
              <dt>파일 생성 시각</dt>
              <dd>{{propData.CreateDate}}</dd>
            </dl>
            <dl v-if="propData.ModifiedDate">
              <dt>파일 수정 시각</dt>
              <dd>{{propData.ModifiedDate}}</dd>
            </dl>
          </template>
        </div>
      </div>
      <template v-if="propData.FileHash">
        <info-file :FileHash="propData.FileHash"></info-file>
      </template>
    </div>
    <div v-else-if="propData.Table === 'FILE_TRANSFER_LOG'">
      <div data-inner-content>
        <h2>이벤트 정보</h2>
        <div data-inner-info>
          <template v-if="propData.EventType === 'RelatedFile'">
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.NameInfo1}}</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.PathInfo1}} ({{propData.DriveType1.toUpperCase()}})</dd>
            </dl>
            <dl>
              <dd>▼</dd>
            </dl>
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.NameInfo2}}</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'FileCopy'">
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.NameInfo1}}</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.PathInfo1}} ({{propData.DriveType1.toUpperCase()}})</dd>
            </dl>
            <dl>
              <dd>▼</dd>
            </dl>
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.NameInfo2}}</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
            </dl>
          </template>
          <template v-else-if="propData.EventType === 'HttpDownload'">
            <dl>
              <dt>경로</dt>
              <dd>
                <template v-if="propData.detect && propData.detect.malware">
                  <a @href="propData.detect.malware.permalink">
                    {{propData.PathInfo1}}
                  </a>
                </template>
                <template v-else>
                  {{propData.PathInfo1}}
                </template>
              </dd>
            </dl>
            <dl>
              <dd>▼</dd>
            </dl>
            <dl>
              <dt>파일명</dt>
              <dd>{{propData.NameInfo2}} ({{propData.FileSize}})</dd>
            </dl>
            <dl>
              <dt>경로</dt>
              <dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
            </dl>
          </template>
        </div>
      </div>
    </div>
    <div v-if="propData.detect">
      <info-detect :data="propData.detect"></info-detect>
    </div>
  </section>
</template>
<script>
  import InfoProcess from './Search.process.info.process.vue';
  import InfoFile from './Search.process.info.file.vue';
  import InfoDetect from './Search.process.info.detect.vue';

  export default {
    name: "EventInnerView",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: Array | Object
      }
    },
    data() {
      return {
        more: null
      };
    },
    computed: {
      tableData() {
        return this.getValueEx(this.propData.data, this.propData.rowKey);
      }
    },
    components: {
      "info-process":InfoProcess,
      "info-file":InfoFile,
      "info-detect":InfoDetect
    },
    watch: {},
    methods: {
      selectProcess(processGuid) {
        this.$bus.$emit('TreeProcessSelected', processGuid);
      }
    },
    beforeCreate() {
    },
    created() {
      //console.log(this.propData);
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      //console.log(this.propData);
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
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
