<template>
  <p data-range>
    <span v-if="!globalRangeCode.username">{{globalRangeCode.name}}</span>
    <span v-else>
      {{globalRangeCode.name}} / {{globalRangeCode.username}}
      <button data-icon @click="resetRange">
        <i class="fa fa-times-circle"></i>
      </button>
    </span>
    에서 검색
  </p>
</template>
<script>
  import Constant from "@/constant";
  import { mapGetters } from "vuex";

  export default {
    name: "GlobalRange",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
    },
    watch: {
    },
    methods: {
      resetRange() {
        this.$bus.$emit("update");
        this.$store.dispatch(Constant.GLOBAL_RANGECODE, {
          dept_code: 1,
          name: "전사"
        });
      }
    },
    beforeCreate() {},
    created() {
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
    },
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .group{
    margin-right:5px;
  }
</style>
