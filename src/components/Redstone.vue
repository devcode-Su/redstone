<template>
  <section class="redstone">
    <red-header :username="userdata.name">
      <button class="group-toggle tooltip-wrap icon-btn icon-btn-nav" :class="{ on : selected}" @click="btnToggle">
        <i class="fa fa-navicon default" aria-hidden="true"></i>
        <span class="tooltip">조직도</span>
      </button>
    </red-header>
    <section class="container">
      <aside :class="{'active' : selected }">
        <red-navigation @selectedBoolean="selectedBoolean"></red-navigation>
        <red-group>
          <button class="group-toggle icon-btn icon-btn-nav" :class="{ on : selected}" @click="btnToggle">
            <i class="el-icon-close default" aria-hidden="true"></i>
          </button>
        </red-group>
      </aside>
      <main class="main">
        <router-view/>
      </main>
    </section>
  </section>
</template>

<script>
import RedHeader from "./layout/Red.header";
import RedNavigation from "./layout/Red.navigation";
import RedGroup from "./layout/Red.group";

import locationCheckMixin from "./resource/mixins/location.check.mixin";
export default {
  name: "Redstone",
  data() {
    return {
      selected: false,
      selectedDisabled: true,
      userdata: []
    };
  },
  computed: {},
  components: {
    RedHeader,
    RedNavigation,
    RedGroup
  },
  methods: {
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
  created() {
    const apiURL = "/api/admin/info";
    this.$http.get(apiURL).then(result => {
      this.userdata = result.data;
      //console.log(this.userdata)
    });
  },
  mounted() {
    //console.log(this.selectedDisabled)
  },
  mixins: [locationCheckMixin]
};
</script>

<style lang="scss" scoped>

</style>

