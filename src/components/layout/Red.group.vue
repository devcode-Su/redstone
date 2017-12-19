<template>
  <section data-layout="Group" class="group">
    <div class="wrap">
      <h1 class="group-title">
        그룹관리
      </h1>
      <groupdepartment class="group-department" :position="false"></groupdepartment>
      <group-members></group-members>
      <ul class="group-notice">
        <li data-icon>
          <i class="fa fa-circle fa-fw dot-all" aria-hidden="true"></i>
          전체 AGENT : {{total}}
        </li>
        <li data-icon>
          <i class="fa fa-circle fa-fw dot-now" aria-hidden="true"></i>
          현재 접속 : {{now}}
        </li>
        <li data-icon>
          <i class="fa fa-circle fa-fw dot-not" aria-hidden="true"></i>
          일주일 이상 미 접속 : {{week}}
        </li>
      </ul>
      <button data-icon="set" class="management-btn" :class="{spin:selected}" @click="showModal = true">
        <i class="fa fa-cog fa-lg" aria-hidden="true"></i>
      </button>
      <slot></slot>
    </div>
    <templatemodal v-if="showModal" :target="true" @close="showModal = false" :title="'그룹관리'" :compSelect="'group-management'">
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
    selected: Boolean
  },
  // 컴포넌트 변수 그룹
  data() {
    return {
      showModal: false,
      responseData:[],
      total : "",
      now : "",
      week: ""
    };
  },

  computed: {
    isLoading() {
      return this.$store.state.loadingState;
    }
    // defaultData() {
    //   return this.membersData.length === 0 ? false : true;
    // }
  },
  // 컴포넌트가 다른 컴포넌트를 사용할 경우
  components: {
    "groupdepartment":Groupdepartment,
    "group-members":GroupMembers,
    "templatemodal":Templatemodal
  },
  // 컴포넌트 메서드 그룹
  watch: {
    responseData(r){
      if(r){
        let total = 0, now = 0, week = 0;
        for(var i =0; i < r.length; i++){
          total += r[i].count;
          if(r[i].status === 1){
            now = r[i].count;
          }else{
            now = 0;
          }
          if(r[i].status === -1){
            week = r[i].status
          }else{
            week = 0;
          }
        }
        console.log(total, now, week);
        this.total = total;
        this.now = now;
        this.week = week;
        return r;
      }
    }
  },
  methods: {
    getConnected() {
      const url = "/api/admin/node/connectStatus";
      this.$http.get(url).then(response => {
        this.responseData = response.data;
      });
    }
  },
  // 컴포넌트 라이프사이클 메서드 그룹
  created() {
    //this.isLoading ? console.log("this.$router.push(" / ")") : this.getData();
    this.getConnected();
    this.$bus.$on("update", this.getConnected);
  },
  mounted() {
    //console.log(typeof this.items);
  },
  beforeDestroy() {
    this.$bus.$off("update");
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
      height: 26px;
      padding: 0;
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
    top: 8px;
    right: 31px;
  }
  .group-toggle {
    position: absolute;
    top: 8px;
    right: 5px;
  }
  .group-notice li {
    justify-content: flex-start;
  }
}
</style>
