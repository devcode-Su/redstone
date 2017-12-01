<template>
  <div class="tree-view" :class="{ on : position}">
    <ul class="tree-wrap">
      <groupdepartmenttree v-if="defaultData" :model="company[0]" @changeModel="overRide" :treeEdit="treeEdit" :type="type"></groupdepartmenttree>
    </ul>
  </div>
</template>
<script>
import Groupdepartmenttree from "./Group.department.tree";
//import {EventBus} from "../../main";
export default {
  name: "Groupdepartment",
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
    isLoading() {
      return this.$store.state.loadingState;
    },
    defaultData() {
      return this.company.length === 0 ? false : true;
    }
  },
  components: {
    Groupdepartmenttree
  },
  watch: {},
  methods: {
    getData() {
      const apiUrl = "/api/admin/group/list";
      this.$http.get(apiUrl).then(result => {
        this.company = this.listToTree(result.data);
        //EventBus.$emit("nodeid", this.company[0]);
      });
    },
    overRide(model) {
      this.company = model;
    }
  },
  beforeCreate() {},
  created() {
    //this.loadData();
    //    this.$bus.$on("resetGroup", () => {
    //      this.loadData()
    //      console.log("hahaha")
    //    })
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
