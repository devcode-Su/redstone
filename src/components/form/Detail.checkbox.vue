<template>
  <div data-form-item>
    <label data-form-label="required">검색 항목</label>
    <div data-form-tag>
      <el-checkbox :indeterminate="isIndeterminate" v-model="all" true-label="on" :false-label="null" @change="checkAll">전체</el-checkbox>
      <div class="check-groups">
        <el-checkbox v-model="ti_event" @change="checkBox">TI 진단 이벤트</el-checkbox>
        <el-checkbox v-model="url_ip_event" @change="checkBox">악성 URL/IP 접근 이벤트</el-checkbox>
        <el-checkbox class="rsc" v-model="engine_event" @change="checkBox">RSC 엔진 진단 이벤트</el-checkbox>
        <el-checkbox v-model="process_event" @change="checkBox">프로세스</el-checkbox>
        <el-checkbox v-model="network_event" @change="checkBox">네트워크</el-checkbox>
        <el-checkbox v-model="file_event" @change="checkBox">파일</el-checkbox>
        <el-checkbox v-model="registry_event" @change="checkBox">레지스트리</el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Mediachecked",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        all: "on",
        isIndeterminate: false,
        ti_event: true,
        url_ip_event: true,
        engine_event: true,
        process_event: true,
        network_event: true,
        file_event: true,
        registry_event: true,
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      checkAll(val) {
        if (val === "on") {
          this.ti_event = true;
          this.url_ip_event = true;
          this.engine_event = true;
          this.process_event = true;
          this.network_event = true;
          this.file_event = true;
          this.registry_event = true;
        } else {
          this.ti_event = false;
          this.url_ip_event = false;
          this.engine_event = false;
          this.process_event = false;
          this.network_event = false;
          this.file_event = false;
          this.registry_event = false;
        }
        this.isIndeterminate = false;
        this.sendData();
      },
      checkBox() {
        if (this.ti_event && this.url_ip_event && this.engine_event && this.process_event && this.network_event && this.file_event && this.registry_event) {
          this.all = "on";
          this.isIndeterminate = false;
        }
        else if (this.ti_event || this.url_ip_event || this.engine_event || this.process_event || this.network_event || this.file_event || this.registry_event) {
          this.all = null;
          this.isIndeterminate = true;
        }
        else {
          this.all = false;
          this.isIndeterminate = false;
        }
        this.sendData();
      },
      sendData() {
        //console.log(this.all)
        this.$emit('change', {
          "all" : this.all,
          "ti_event": this.ti_event,
          "url_ip_event": this.url_ip_event,
          "engine_event": this.engine_event,
          "process_event": this.process_event,
          "network_event": this.network_event,
          "file_event": this.file_event,
          "registry_event": this.registry_event
        });
      },
    },
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
    },
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

  [data-form-label] {
    align-self: flex-start;
  }

  [ data-form-tag] {
    align-items: flex-start;
    .check-groups {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      .el-checkbox {
        width: 25%;
        margin: 0;
        padding: 0;
        &.rsc {
          width: 50%;
        }
      }
    }
  }
</style>
