<template>
  <div class="tree-view" :class="{ on : position}">
    <ul class="tree-wrap">
      <tree v-if="defaultData" :model="company[0]" @changeModel="overRide" :treeEdit="treeEdit" :type="type"></tree>
    </ul>
  </div>
</template>
<script>
import tree from "./Template.tree";
import { EventBus } from "@/main";
export default {
  name: "Grouptree",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    position:{
      type:Boolean,
      default:false
    },
    treeEdit:{
      type:Boolean,
      default:false
    },
    type:String
  },
  data() {
    return {
      filterText: "",
      company: []
    };
  },
  computed: {
    defaultData(){
      return this.company.length === 0 ? false : true
    }
  },
  components: {
    tree
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
      EventBus.$emit("searchNavi",this.company[0])
    });
    //EventBus.$emit()
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
