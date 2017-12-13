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
        checkedAll : false,
        isIndeterminate : false,
        removable : null,
        external: null,
        cdRom : null,
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      checkAll(val){
        if(val){
          this.removable = 'on';
          this.external = 'on';
          this.cdRom = 'on';
        }else{
          this.removable = '';
          this.external = '';
          this.cdRom = '';
        }
        this.$emit("typeCheck", {
          "removable" : this.removable,
          "external" : this.external,
          "cdRom" : this.cdRom
        });
      },
      checkBox(val) {
        if(this.removable === val || this.external === val || this.cdRom === val){
          this.isIndeterminate = true;
          if(this.removable === val && this.external === val && this.cdRom === val){
            this.isIndeterminate = false;
            this.checkedAll = true;
          }
        }else{
          this.checkedAll = false;
          this.isIndeterminate = true;
        }
        if(this.removable == null && this.external == null && this.cdRom == null){
          this.isIndeterminate = false;
        }
        this.$emit("typeCheck", {
          "removable" : this.removable,
          "external" : this.external,
          "cdRom" : this.cdRom
        });
      }
    },
    beforeCreate() {},
    created() {},
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {

    },
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
