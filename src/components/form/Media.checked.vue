<template>
  <div data-form-item>
    <label data-form-label="required">검색 항목</label>
    <div data-form-tag>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="checkAll">전체</el-checkbox>
      <el-checkbox v-model="removable" true-label="on" @change="checkBox">이동식 디스크</el-checkbox>
      <el-checkbox v-model="external" true-label="on" @change="checkBox">외장 디스크</el-checkbox>
      <el-checkbox v-model="cdRom" true-label="on" @change="checkBox">CD-ROM</el-checkbox>
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
        checkedAll: true,
        isIndeterminate: false,
        removable: "on",
        external: "on",
        cdRom: "on",
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {

      checkAll(val) {
        if (val) {
          this.removable = 'on';
          this.external = 'on';
          this.cdRom = 'on';
        } else {
          this.removable = '';
          this.external = '';
          this.cdRom = '';
        }
        this.isIndeterminate = false;

        this.sendData();
      },
      checkBox(val) {
        if (this.removable && this.external && this.cdRom) {
          this.checkedAll = true;
          this.isIndeterminate = false;
        }
        else if (this.removable || this.external || this.cdRom) {
          this.checkedAll = false;
          this.isIndeterminate = true;
        }
        else {
          this.checkedAll = false;
          this.isIndeterminate = false;
        }

        this.sendData();
      },
      sendData() {
        this.$emit('change', {
          'removable': this.removable,
          'external': this.external,
          'cdRom': this.cdRom,
        });
      },
    },
    beforeCreate() {
    },
    created() {
      this.checkAll(true);
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
</style>
