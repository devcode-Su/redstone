<template>
  <div class="tree-view" :class="{ on : position}">
    <ul class="tree-wrap">
      <tree :model="company" @changeModel="overRide" :treeEdit="treeEdit"></tree>
    </ul>
  </div>
</template>
<script>
import tree from "./Template.tree";
export default {
  name: "Grouptree",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    position:{
      type:Boolean,
      default:true
    },
    treeEdit:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      filterText: "",
      company: {
        name: "전사",
        depart: [
          {
            name: "연구소",
            depart: [
              {
                name: "연구소"
              }
            ]
          },
          {
            name: "서울사무소",
            depart: [
              {
                name: "서울 영업 팀"
              },
              {
                name: "회계팀"
              },
              {
                name: "서울 개발 팀"
              },
              {
                name: "서울 총무팀"
              },
              {
                name: "서울 지원팀"
              },
              {
                name: "본사 관리팀"
              },
              {
                name: "기술 지원팀"
              }
            ]
          },
          {
            name: "부산사무소",
            depart: [
              {
                name: "부산 영업 1팀"
              },
              {
                name: "부산 영업 2팀"
              },
              {
                name: "부산 지원 1팀"
              },
              {
                name: "부산 개발 1팀"
              },
              {
                name: "부산 개발 2팀"
              },
              {
                name: "부산 총무팀"
              },
              {
                name: "부산 지원 2팀"
              },
              {
                name: "부산 지원 3팀"
              },
              {
                name: "부산 개발 3팀"
              },
              {
                name: "부산 영업 3팀"
              }
            ]
          }
        ]
      }
    };
  },
  computed: {},
  components: {
    tree
  },
  watch: {},
  methods: {
    overRide(model) {
      this.company = model;
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
