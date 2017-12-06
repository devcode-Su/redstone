<template>
  <draggable class="drag-wrap" :class="{ 'on' : option }" v-model="modelData" :options="propOption" @start="isDragging=true" @end="isDragging=false">
    <transition-group data-drag-group type="transition" tag="ul" class="drag-group" :name="'flip-list'">
      <li class="drag-item" v-for="element in modelData" :key="element.seq">
        {{element.title}}
        <button @click="moveItem(modelData, moveTo, element)">
          <i v-if="icon" class="fa fa-minus-circle" aria-hidden="true"></i>
          <i v-else class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
      </li>
    </transition-group>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "TemplateDraglist",
  extends: {},
  props: {
    value: {
      type: Array | Object
    },
    moveTo: {
      type: Array | Object
    },
    option: {
      type: Boolean
    },
    icon: {
      type: Boolean
    }
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  computed: {
    modelData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    propOption() {
      return this.option ? this.customOptions : this.defaultOtions;
    },
    defaultOtions() {
      return {
        animation: 0,
        group: "dashboard",
        ghostClass: "ghost",
        sort: false
      };
    },
    customOptions() {
      return {
        animation: 0,
        group: "dashboard",
        ghostClass: "ghost"
      };
    }
  },
  components: {
    "draggable":draggable
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    moveItem(from, to, element) {
      this.$emit("moveitem", {
        from: from,
        to: to,
        element: element
      });
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
