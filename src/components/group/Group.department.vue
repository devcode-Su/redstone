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
      company: [
        // {
        //   part: "전사",
        //   subpart: [
        //     {
        //       part: "연구소",
        //       subpart: [
        //         {
        //           part: "연구소"
        //         }
        //       ]
        //     },
        //     {
        //       part: "서울사무소",
        //       subpart: [
        //         {
        //           part: "서울 영업 팀"
        //         },
        //         {
        //           part: "회계팀"
        //         },
        //         {
        //           part: "서울 개발 팀"
        //         },
        //         {
        //           part: "서울 총무팀"
        //         },
        //         {
        //           part: "서울 지원팀"
        //         },
        //         {
        //           part: "본사 관리팀"
        //         },
        //         {
        //           part: "기술 지원팀"
        //         }
        //       ]
        //     },
        //     {
        //       part: "부산사무소",
        //       subpart: [
        //         {
        //           part: "부산 영업 1팀"
        //         },
        //         {
        //           part: "부산 영업 2팀"
        //         },
        //         {
        //           part: "부산 지원 1팀"
        //         },
        //         {
        //           part: "부산 개발 1팀"
        //         },
        //         {
        //           part: "부산 개발 2팀"
        //         },
        //         {
        //           part: "부산 총무팀"
        //         },
        //         {
        //           part: "부산 지원 2팀"
        //         },
        //         {
        //           part: "부산 지원 3팀"
        //         },
        //         {
        //           part: "부산 개발 3팀"
        //         },
        //         {
        //           part: "부산 영업 3팀"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
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
