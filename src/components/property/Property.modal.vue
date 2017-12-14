<template>
  <transition name="modal">
    <section data-modal>
      <div data-modal-container>
        <pannel></pannel>
        <sw-datatable></sw-datatable>
        <hw-datatable></hw-datatable>
        <button data-icon data-modal-close @click="$emit('close')">
          <i class="el-icon-close" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  </transition>
</template>
<script>
  import Pannel from "./Property.modal.pannel";
  import SwDatatable from "./Property.modal.sw.datatable";
  import HwDatatable from "./Property.modal.hw.datatable";
  export default {
    name: "Templatemodal",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {};
    },
    computed: {},
    components: {
      "Pannel" :Pannel,
      "SwDatatable" : SwDatatable,
      "HwDatatable" :HwDatatable
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
    width: 1400px;
    padding:15px;
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
    top: -44px;
    right: 0;
    width: 44px;
    height: 44px;
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
