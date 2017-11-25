<template>
  <section class="inner-view inner-view-box">
    <h1>상세내용</h1>
    <div class="process-info">
      <div>
        <h2>프로세스 정보</h2>
        <div class="content-wrap">
          <dl>
            <dt>프로세스 고유 ID</dt>
            <dd>{{propData.processData[0].ProcessGuid}}</dd>
          </dl>
          <dl>
            <dt>프로세스 명</dt>
            <dd>{{propData.processData[0].ProcessName}}</dd>
          </dl>
          <dl>
            <dt>SHA256</dt>
            <dd>{{propData.processData[0].FileHash}}</dd>
          </dl>
          <dl>
            <dt>MD5</dt>
            <dd>{{propData.processData[0].Md5Hash}}</dd>
          </dl>
          <dl>
            <dt>PID</dt>
            <dd>{{propData.processData[0].ProcessId}}</dd>
          </dl>
          <dl>
            <dt>프로세스 경로</dt>
            <dd>{{propData.processData[0].ProcessImagePath}}</dd>
          </dl>
          <dl>
            <dt>Session ID"</dt>
            <dd>{{propData.processData[0].SessionId}}</dd>
          </dl>
          <dl v-if="propData.processData[0].InteractiveFlag !== '0'">
            <dt>GUI</dt>
            <dd>{{propData.processData[0].InteractiveFlag}}</dd>
          </dl>
          <dl v-if="propData.processData[0].InteractiveFlag !== '0'">
            <dt>WindowText</dt>
            <dd>{{propData.processData[0].WindowTex}}</dd>
          </dl>

          <dl v-if="propData.processData[0].InteractiveFlag !== '0'">
            <dt>WindowClassName</dt>
            <dd>{{propData.processData[0].WindowClassName}}</dd>
          </dl>

          <dl>
            <dt>CommandLine</dt>
            <dd>{{propData.processData[0].CommandLine}}</dd>
          </dl>
          <dl>
            <dt>파일 생성 시각</dt>
            <dd>{{propData.processData[0].CreateDate}}</dd>
          </dl>
          <dl>
            <dt>파일 수정 시각</dt>
            <dd>{{propData.processData[0].InsertTime}}</dd>
          </dl>
          <dl>
            <dt>파일 속성</dt>
            <dd>{{this.propData.processData[0].FileAttributes}}</dd>
          </dl>
          <dl>
            <dt>시작 시각</dt>
            <dd>{{propData.processData[0].EventTime}}</dd>
          </dl>
          <dl v-if="propData.processData[1]">
            <dt>종료 시각</dt>
            <dd>{{propData.processData[1].EventTime}}</dd>
          </dl>
        </div>
      </div>
      <div>
        <h2>파일 정보</h2>
        <div class="content-wrap">
          <dl>
            <dt>전자서명</dt>
            <dd>{{propData.fileData.sign_status}}</dd>
          </dl>
          <dl v-if="propData.fileData.sign_status === 'signed'">
            <dt>검증</dt>
            <dd>{{propData.fileData.sign_validity}}</dd>
            <dt>서명자</dt>
            <dd>{{propData.fileData.sign_publisher}}</dd>
          </dl>

          <dl>
            <dt>회사명</dt>
            <dd>{{propData.fileData.company_name}}</dd>
          </dl>
          <dl>
            <dt>종류</dt>
            <dd>{{propData.fileData.type}}</dd>
          </dl>
          <dl>
            <dt>실행파일 종류</dt>
            <dd>{{propData.fileData.exe_type}} ({{propData.fileData.platform}})</dd>
          </dl>
          <dl>
            <dt>버전</dt>
            <dd>{{propData.fileData.version}}</dd>
          </dl>
          <dl>
            <dt>내부 이름</dt>
            <dd>{{propData.fileData.internal_name}}</dd>
          </dl>
          <dl>
            <dt>제품명</dt>
            <dd>{{propData.fileData.product_name}}</dd>
          </dl>
          <dl>
            <dt>빌드시각</dt>
            <dd>{{propData.fileData.build_date}}</dd>
          </dl>
        </div>
      </div>
      <div>
        <h2>진단 정보</h2>
        <div class="content-wrap">

          <dl>
            <dt>진단엔진</dt>
            <dd>{{propData.checkData[0].build_date}}</dd>
          </dl>
          <dl>
            <dt>위험도</dt>
            <dd>{{propData.checkData[0].build_date}}</dd>
          </dl>
          <dl>
            <dt>검출파일</dt>
            <dd>{{propData.checkData[0].build_date}}</dd>
          </dl>
          <dl>
            <dt>추가정보</dt>
            <dd>{{propData.checkData[0].build_date}}</dd>
          </dl>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { EventBus } from "@/main";
export default {
  name: "Processinnerview",
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
  components: {},
  watch: {},
  methods: {
    viewCheck() {
      if (this.$refs.checkedRow !== undefined) {
        for (var j = 0; j < this.$refs.checkedRow.length; j++) {
          for (var i = 0; i < this.propData.field.length - 1; i++) {
            this.$refs.checkedTh[i].hidden = this.$refs.checked[i].isChecked;
            this.$refs.checkedRow[j].children[i].hidden = this.$refs.checked[
              i
            ].isChecked;
          }
        }
      } else {
        this.view = [];
      }
    },
    moveRow(index) {
      console.log(this.propData.data[index]);
      this.$router.push("Search-process");
      EventBus.$emit("infofile", this.propData.data[index]);
    }
  },
  beforeCreate() {},
  created() {
    console.log(this.propData);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.propData);
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
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
}
</style>
