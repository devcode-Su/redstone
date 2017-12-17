<template>
  <div class="tree-view" :class="{ on : position}">
    <ul class="tree-wrap">
      <groupdepartmenttree :model="groups" :treeEdit="treeEdit" :page="page"></groupdepartmenttree>
    </ul>
  </div>
</template>
<script>
import Groupdepartmenttree from "./Group.department.tree";
import Constant from "@/constant";
import { mapGetters } from "vuex";
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
    page: String
  },
  data() {
    return {
      filterText: "",
      groups: []
    };
  },
  computed: {
    ...mapGetters({ groupData: "fetchGroup" })
  },
  components: {
    "groupdepartmenttree":Groupdepartmenttree
  },
  watch: {
    groupData(data) {
      if (data) {
        this.groups = data;
      }
    }
  },
  methods: {
    getData() {
      this.$store.dispatch(Constant.FETCH_GROUP);
    },
    overRide(model) {
      this.company = model;
    }
  },
  beforeCreate() {},
  created() {
    //this.getData();
    //console.log("그룹관리 메뉴");
    this.$store.dispatch(Constant.FETCH_GROUP);
  },
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
</style>
