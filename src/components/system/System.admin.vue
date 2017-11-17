<template>
  <article>
    <h1 class="page-title">
      관리자 설정
    </h1>
    <div>
      content
    </div>
    <el-button type="text" @click="showModal = true">click to open the Dialog</el-button>
    <templatemodal v-if="showModal" @close="showModal = false"></templatemodal>
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
    Templatemodal
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
</style>
