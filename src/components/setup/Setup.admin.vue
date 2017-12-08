<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      관리자 설정
    </h1>
    <div>
      comming soon
    </div>
    <div data-tooltip-wrap="setup">
      <button data-icon type="text" @click="showModal = true">
        <i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
        <span data-tooltip="setup">관리자 추가</span>
      </button>
    </div>

    <templatemodal v-if="showModal" @close="showModal = false" :target="'user-custom'" :compSelect="'systemadminadd'" :title="'관리자 추가 등록'"></templatemodal>
  </article>
</template>
<script>
import Templatemodal from "../template/Template.modal";

export default {
  name: "Systemadmin",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {},
  components: {
    "templatemodal":Templatemodal
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
[data-icon] {
  width: 24px;
  height: 24px;
}
</style>
