<template>
  <div class="group-department">
    <el-input size="medium" placeholder="부서 검색" v-model="filterText">
    </el-input>
    <el-tree :data="company" :props="defaultProps" :filter-node-method="filterNode" ref="department" accordion>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: "GroupDepartment",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      filterText: "",
      company: [],
      defaultProps: {
        children: "subpart",
        label: "part"
      }
    };
  },
  computed: {},
  components: {},
  watch: {
    filterText(val) {
      //console.log(this.$refs.department);
      this.$refs.department.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.part.indexOf(value) !== -1;
    }
  },
  beforeCreate() {},
  created() {
    this.treeData();
  },
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

.group-department {
  height: 360px;
  background-color: #fff;
  border-bottom: 3px solid #4d5e72;
  overflow: hidden;
}
</style>
