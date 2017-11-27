<template>
  <section class="group">
    <div class="wrap">
      <h1 class="group-title">
        그룹관리
      </h1>
      <groupdepartment :propsTree="groupData[0]" class="group-department" :position="false"></groupdepartment>
      <group-members :members="membersData"></group-members>
      <ul class="group-notice">
        <li>
          <i class="fa fa-circle fa-fw dot-all" aria-hidden="true"></i>
          전체 AGENT : 15
        </li>
        <li>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          현재 접속 : 3
        </li>
        <li>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          일주일 이상 미 접속 : 1
        </li>
      </ul>
      <button class="management-btn icon-btn" @click="showModal = true">
        <i class="fa fa-cog fa-lg" aria-hidden="true"></i>
      </button>
      <slot></slot>
    </div>
    <templatemodal v-if="showModal" :target="'user-custom'" @close="showModal = false" :title="'그룹관리'" :compSelect="'group-management'">
    </templatemodal>
  </section>
</template>

<script>
import Groupdepartment from "../group/Group.department";
import GroupMembers from "../group/Group.members";
import Templatemodal from "../template/Template.modal";
export default {
  // 이름 적는 것을 잊지마세요
  name: "RedGroup",
  // compose new components
  extends: {},
  // 컴포넌트 어트리뷰트 그룹
  props: {
    // selected: {
    //   type: Boolean
    // }, // 알파벳순으로 정렬합니다
  },
  // 컴포넌트 변수 그룹
  data() {
    return {
      showModal: false,
      groupData : [],
      membersData: [],
      total: ""
    };
  },
  computed: {
    defaultData() {
      return this.membersData.length === 0 ? false : true;
    }
  },
  // 컴포넌트가 다른 컴포넌트를 사용할 경우
  components: {
    Groupdepartment,
    GroupMembers,
    Templatemodal
  },
  // 컴포넌트 메서드 그룹
  watch: {},
  methods: {},
  // 컴포넌트 라이프사이클 메서드 그룹
  created() {
    const apiGroupUrl = "/api/admin/group/list";
    this.$http.get(apiGroupUrl).then(result => {
      this.groupData = this.listToTree(result.data);
      //console.log("???");
      //console.log(this.groupData)
      //EventBus.$emit("nodeid", this.company[0]);
    });
    this.$bus.$on("userview", data => {
      const apiUrl = "/api/admin/group/recurse/" + data;
      this.$http.get(apiUrl).then(result => {
        this.membersData = result.data.data;
      });
    });
  },
  mounted() {
    //console.log(typeof this.items);
  },
  beforeDestroy() {
    this.$bus.$on("userview");
  }
};
</script>

<style lang="scss">
@import "~styles/variables";
.group {
  &-title {
    margin: 0;
    padding: 5px;
    line-height: 32px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: #4d5e72;
  }
  &-notice {
    padding: 10px;
  }
  .wrap {
    button {
      width: 26px;
      height: 42px;
      padding: 0;
      top: 0;
    }
  }
  .group-department {
    height: 360px;
    background-color: #fff;
    border-bottom: 3px solid #4d5e72;
    overflow: hidden;
  }
  .tree-wrap {
    z-index: 1;
  }
  .item-root > ul {
    max-height: 325px;
  }
  .management-btn {
    position: absolute;
    right: 31px;
  }
  .group-toggle {
    position: absolute;
    right: 5px;
  }
}
</style>
