<template>
  <section class="group-members-move">
    <div class="user-set-wrap">
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          이동할 부서원 선택
        </h2>
        <grouptree class="user-set-list group-members-tree"></grouptree>
        <group-members class="user-set-list group-members-move" :omitPath="'part'" :members="departNow" :moveTo="departChange" :colview="false" @moveitem="moveItem"></group-members>
      </div>
      <div class="user-set-area">
        <h2>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          이동될 부서 선택
        </h2>
        <grouptree class="user-set-list group-members-tree"></grouptree>
        <group-members class="user-set-list group-members-move" :omitPath="'part'" :members="departChange" :moveTo="departNow" :colview="false" :icon="false" @moveitem="moveItem"></group-members>
      </div>
    </div>
    <div class="user-set-btn">
      <md-button class="md-dense reset" @click="resetStorage">
        <md-icon>replay</md-icon> 처음으로
      </md-button>
      <md-button class="md-dense confirm" @click="saveStorage">
        <md-icon>done</md-icon> 확인
      </md-button>
    </div>
  </section>
</template>
<script>
import Grouptree from "./Group.tree";
import GroupMembers from "./Group.members";
export default {
  name: "GroupMemberset",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      fields: {
        id: "센서ID",
        name: "이름",
        part: "부서명"
      },
      departNow: [],
      departChange: []
    };
  },
  computed: {
    defaultViews() {
      return this.departNow.length === 0
        ? (this.departNow = JSON.parse(localStorage.getItem("members-data")))
        : (this.departNow = JSON.parse(localStorage.getItem("members-now")));
    }
  },
  components: {
    Grouptree,
    GroupMembers
  },
  watch: {},
  methods: {
    moveItem(setItem) {
      setItem.to.push(setItem.element);
      setItem.from.splice(setItem.from.indexOf(setItem.element), 1);
    },
    saveStorage() {
      localStorage.setItem("members-now", JSON.stringify(this.departNow));
      localStorage.setItem("members-change", JSON.stringify(this.departChange));
    },
    resetStorage() {
      this.departNow = [];
      this.departChange = JSON.parse(localStorage.getItem("members-data"));
      localStorage.setItem("members-now", "[]");
      localStorage.setItem("members-change", JSON.stringify(this.departChange));
    }
  },
  beforeCreate() {},
  created() {
    this.departNow = JSON.parse(localStorage.getItem("members-now"));
    this.departChange = JSON.parse(localStorage.getItem("members-change"));
    this.defaultViews;
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
.drag-wrap {
  height: 300px;
}
</style>
