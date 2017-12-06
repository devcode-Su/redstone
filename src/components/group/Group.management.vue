<template>
  <section class="management">
    <groupdepartmentset v-if="selected"></groupdepartmentset>
    <groupmemberset v-else></groupmemberset>
    <button class="icon-btn management-toggle" @click.stop="changeSec">
      <i v-if="selected" class="fa fa-users" aria-hidden="true"></i>
      <i v-else class="fa fa-address-book-o fa-2x" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>
import Groupdepartmentset from "./Group.departmentset";
import Groupmemberset from "./Group.memberset";
export default {
  name: "GroupManagement",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    title: {
      type: String
    }
  },
  data() {
    return {
      selected: true,
      membersData: []
    };
  },
  computed: {
    //    defaultStorage() {
    //      if (localStorage.getItem("members-now")) {
    //        if (localStorage.getItem("members-now")) {
    //          return;
    //        } else {
    //          localStorage.setItem("members-change", "[]");
    //        }
    //      } else {
    //        localStorage.setItem("members-now", "[]");
    //        if (!localStorage.getItem("members-change")) {
    //          localStorage.setItem("members-change", "[]");
    //        }
    //      }
    //    }
  },
  components: {
    "groupdepartmentset":Groupdepartmentset,
    "groupmemberset":Groupmemberset
  },
  watch: {},
  methods: {
    changeSec() {
      //console.log(this.selected);
      this.selected = !this.selected;
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
.management-toggle {
  width: 44px;
  height: 72px;
  position: absolute;
  top: 0;
  right: 54px;
  color: color(white);
  .fa-users {
    font-size: 20px;
  }
}
</style>
