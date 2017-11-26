<template>
  <div class="tree-view" :class="{ on : position}">
    <ul class="tree-wrap">
      <grouptree v-if="defaultData" :model="company[0]" @changeModel="overRide" :treeEdit="treeEdit" :type="type"></grouptree>
    </ul>
  </div>
</template>
<script>
import Grouptree from "./Template.tree";
import { EventBus } from "@/main";
export default {
  name: "Grouptree",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    position: {
      type: Boolean,
      default: false
    },
    treeEdit: {
      type: Boolean,
      default: false
    },
    type: String
  },
  data() {
    return {
      filterText: "",
      company: []
    };
  },
  computed: {
    defaultData() {
      return this.company.length === 0 ? false : true;
    }
  },
  components: {
    Grouptree
  },
  watch: {},
  methods: {
    overRide(model) {
      this.company = model;
    }
  },
  beforeCreate() {},
  created() {
    const apiUrl = "/api/admin/group/list";
    this.$http.get(apiUrl).then(result => {
      this.company = this.listToTree(result.data);
      //console.log(this.company);
      EventBus.$emit("searchNavi", this.company[0]);
    });
    //EventBus.$emit()
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
</style>
