<template>
  <section class="template-container">
    <div class="view-table">
      <el-table ref="multipleTable" height="550" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column property="nodeid" label="센서 ID">
        </el-table-column>
        <el-table-column property="username" label="사용자명">
        </el-table-column>
        <el-table-column property="group" label="부서명">
        </el-table-column>
        <el-table-column property="ipAddress" label="IP">
        </el-table-column>
        <el-table-column property="cutOff" label="차단시각">
        </el-table-column>
        <el-table-column property="notice" label="설명">
        </el-table-column>
        <el-table-column property="account" label="설정관리자">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleCutoff(scope.$index, scope.row)">차단</el-button>
            <el-button size="mini" @click="handleRelease(scope.$index, scope.row)">해제</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="view-btn type-submit">
        <el-button size="small" v-if="addList" @click="showModal = true">추가</el-button>
        <el-button size="small" @click="removeData()">삭제</el-button>
      </div>
      <templatemodal v-if="showModal" :target="'user-custom'" @close="showModal = false" :title="'차단 파일 추가'" :compSelect="'systemresponsecutoff'">
      </templatemodal>
    </div>
  </section>
</template>
<script>
import Templatemodal from "../template/Template.modal";
export default {
  name: "ResponseTemplate",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    addList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      tableData: [
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길동",
          group: "율도국",
          ipAddress: "192.16.10.32",
          cutOff: "2017-11-22 19:30:52",
          notice: "연구소",
          account: "admine"
        },
        {
          nodeid: "1",
          username: "홍길수",
          group: "개발2팀",
          ipAddress: "192.16.12.16",
          cutOff: "2017-11-24 14:14:22",
          notice: "대한민국",
          account: "hong"
        }
      ],
      multipleSelection: []
    };
  },
  computed: {},
  components: {
    Templatemodal
  },
  watch: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCutoff(index, row) {
      console.log(index, row);
    },
    handleRelease(index, row) {
      console.log(index, row);
    },
    removeData() {
      let num = this.multipleSelection.length;
      const arr = this.$refs.multipleTable.data;
      for (var i = 0; i < num; i++) {
        arr.splice(arr.indexOf(this.multipleSelection[i]), 1);
      }
      this.$refs.multipleTable.clearSelection();
    }
  },
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
