<template>
  <transition name="modal">
    <section class="template-modal">
      <div class="template-modal-container" :class="target">
        <component :is="compSelect" :title="title"></component>
        <button class="template-modal-close icon-btn" @click="$emit('close')">
          <i class="el-icon-close" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  </transition>
</template>
<script>
import DashboardThumbset from "../dashboard/Dashboard.thumb";
import GroupManagement from "../group/Group.management";
export default {
  name: "Templatemodal",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    target: {
      type: String
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
    DashboardThumbset,
    GroupManagement
  },
  watch: {},
  methods: {},
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

.template-modal {
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
  &-container {
    position: relative;
    background-color: #fff;
  }
  &-close {
    position: absolute;
  }
  @at-root {
    &-container {
      &.user-custom {
        .template-modal-close {
          width: 44px;
          height: 72px;
          top: 0;
          right: 15px;
          font-size: 32px;
          color: #fff;
        }
      }
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
