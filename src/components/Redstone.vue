<template>
  <section data-index="Redstone" :class="{'ready' : !isLoading}">
    <red-header :username="userdata.name">
      <button class="group-toggle tooltip-wrap icon-btn icon-btn-nav" :class="{ on : selected}" @click="btnToggle">
        <i class="fa fa-navicon default" aria-hidden="true"></i>
        <span class="tooltip">조직도</span>
      </button>
    </red-header>
    <section data-layout="container">
      <aside data-layout="Aside" :class="{'active' : selected }">
        <red-navigation @selectedBoolean="selectedBoolean"></red-navigation>
        <red-group>
          <button class="group-toggle icon-btn icon-btn-nav" :class="{ on : selected}" @click="btnToggle">
            <i class="el-icon-close default" aria-hidden="true"></i>
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
import VueLoading from "vue-simple-loading";
import RedHeader from "./layout/Red.header";
import RedNavigation from "./layout/Red.navigation";
import RedGroup from "./layout/Red.group";
import Loading from "./Loading";

import locationCheckMixin from "./mixins/location.check.mixin";
export default {
  name: "Redstone",
  data() {
    return {
      selected: false,
      selectedDisabled: true,
      userdata: []
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.load.loadingState
      //compLists: state => state.thumbComp.thumbCompState
    })
  },
  components: {
    Loading,
    VueLoading,
    RedHeader,
    RedNavigation,
    RedGroup
  },
  methods: {
    fetchData() {
      console.log("Aaa");
      this.$store.dispatch(Constant.FETCH_COMPONENTS);
      //this.$bus.$emit("thumblist", this.compLists);
      // const adminInfo = "/api/admin/info";
      // const groupList = "/api/admin/group/list";
      // this.$http.get(adminInfo).then(result => {
      //   this.userdata = result.data;
      // });
      // this.$http.get(groupList).then(result => {
      //   this.groupData = this.listToTree(result.data);
      // });
    },
    btnToggle() {
      this.locationCheck() !== undefined
        ? (this.selected = this.locationCheck())
        : (this.selected = !this.selected);
      //this.selected = !this.selected;
    },
    selectedBoolean(check) {
      check === undefined
        ? (this.selected = this.selected)
        : (this.selected = check);
    }
  },
  beforeCreated() {
    console.log("before");
  },
  created() {
    //this.isLoading ? this.$router.push("/") : this.getData();
    //this.fetchData();
  },
  mounted() {},
  mixins: [locationCheckMixin]
};
</script>

<style lang="scss" scoped>

</style>

