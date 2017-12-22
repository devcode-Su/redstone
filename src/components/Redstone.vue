<template>
  <section data-index="Redstone" :class="{'ready' : isLoading}">
    <red-header :username="userData.name">
      <button data-tooltip-wrap data-icon="nav" class="group-toggle" :class="{ on : selected}" @click="btnToggle">
        <i class="fa fa-navicon fa-24" :aria-hidden="true"></i>
        <span data-tooltip="group">조직도</span>
      </button>
    </red-header>
    <section data-layout="container">
      <aside data-layout="Aside" :class="{'active' : selected }">
        <red-navigation></red-navigation>
        <red-group :selected="selected">
          <button data-icon class="group-toggle" :class="{ on : selected}" @click="btnToggle">
            <i class="el-icon-close fa-24" :aria-hidden="true"></i>
          </button>
        </red-group>
      </aside>
      <main data-layout="Route-view">
        <!--<keep-alive component="ElForm"> -->
        <router-view/>
        <!--</keep-alive>-->
      </main>
    </section>
  </section>
</template>

<script>
import Constant from "@/constant";
import { mapState } from "vuex";
import RedHeader from "./layout/Red.header";
import RedNavigation from "./layout/Red.navigation";
import RedGroup from "./layout/Red.group";

import locationCheckMixin from "./mixins/location.check.mixin";
export default {
  name: "Redstone",
  data() {
    return {
      selected: false,
      selectedDisabled: true,
      userData: []
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.load.loadingState
    })
  },
  components: {
    "red-header":RedHeader,
    "red-navigation":RedNavigation,
    "red-group":RedGroup
  },
  watch: {
    '$route' (to, from) {
      this.selected = this.isDashboard() ? false : this.selected;
    }
  },
  methods: {
    btnToggle() {
      this.selected = this.isDashboard() ? false : !this.selected;
      this.$bus.$emit("update-group");
    },
  },
  created() {
    const adminInfo = "/api/admin/info";
    this.$http
      .get(adminInfo)
      .then(response => {
        this.$store.dispatch(Constant.LOADING_STATE, false);
        this.userData = response.data;
      })
      .catch(() => {
        this.$router.push("/");
      });
  },
  updated(){
  },
  mounted() {},
  mixins: [locationCheckMixin]
};
</script>

<style lang="scss" scoped>
.group-toggle {
  position: absolute;
}
</style>

