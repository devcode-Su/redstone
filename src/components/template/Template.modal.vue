<template>
  <transition name="modal">
    <section data-modal>
      <div data-modal-container>
        <h1 data-modal-title>
          {{title}}
        </h1>
        <component :is="compSelect"></component>
        <button data-icon data-modal-close @click="$emit('close')" v-if="target">
          <i class="el-icon-close" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  </transition>
</template>
<script>
import DashboardThumb from "../dashboard/Dashboard.thumb";
import GroupManagement from "../group/Group.management";
import Systemadminadd from "../setup/Setup.adminForm";
import Systemresponsecutoff from "../system/System.response.cutoff";
import Propertypannel from "../property/Property.detail.pannel.vue";
//import Processtree from "../search/Search.process.tree.vue"
export default {
  name: "Templatemodal",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    target: {
      type: Boolean,
      default:false
    },
    title: {
      type: String
    },
    compSelect: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    "dashboard-thumb":DashboardThumb,
    "group-management":GroupManagement,
    "systemadminadd":Systemadminadd,
    "systemresponsecutoff":Systemresponsecutoff,
    "propertypannel":Propertypannel
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";

[data-modal] {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
[data-modal-container] {
  position: relative;
  width: 800px;
  background-color: #fff;
}
[data-modal-title] {
  height: 72px;
  line-height: 72px;
  margin: 0;
  padding: 0 15px;
  font-size: 28px;
  font-weight: 500;
  color: #fff;
  background-color: color(default);
}
[data-modal-close] {
  position: absolute;
  top: 0;
  right: 15px;
  width: 44px;
  height: 72px;
  font-size: 32px;
  color: #fff;
  i {
    color: #fff;
  }
  &:hover i{
    color:color(highlight-color)
  }
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
</style>
