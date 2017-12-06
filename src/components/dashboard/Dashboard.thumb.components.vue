<template>
  <section class="components-thumb">
    <masonry :cols="{default: 3, 1200: 2, 600: 1}" :gutter="{default: '30px', 700: '15px'}">
      <div v-for="(thumb, index) in thumbData" :key="thumb.id">
        <component :is="thumb.type" :prop-data="thumb" :index="index"></component>
      </div>
    </masonry>
  </section>
</template>
<script>
import Constant from "@/constant";
import { mapGetters } from "vuex";
import ThumbComponentsChart from "./thumb/Thumb.components.chart.vue";
import ThumbComponents from "./thumb/Thumb.components.vue";

export default {
  name: "DashboardThumbcomponents",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      thumbData: []
    };
  },
  computed: {
    // ...mapState({ compLists: state => state.thumbComp.thumbCompState }),
    ...mapGetters({ compAll: "fetchThumbAll" })
    // compList() {
    //   return this.$store.getters.thumbComp;
    // }
  },
  components: {
    "thumbchart": ThumbComponentsChart,
    "thumbtable": ThumbComponents
  },
  watch: {},
  methods: {
    fetchList() {
      console.log("aaa");
      const getView =
        "/dashboard/?method=get&resource=config&from=&to=&name=viewlist&time=";
      this.$http.get(getView).then(response => {
        if (response.data === null) {
          console.log("null");
          const setView =
            "/dashboard/?method=set&resource=config&from=&to=&name=viewlist&time=";
          this.$http.post(setView, JSON.stringify(this.compAll)).then(() => {
            this.$http.get(getView).then(response => {
              console.log("null && get");
              console.log(response.data);
              this.thumbData = response.data;
            });
          });
        } else {
          this.thumbData = response.data;
        }
      });
    }
    // updateList() {
    //   this.$store.dispatch(Constant.UPDATE_THUMBLIST, this.thumbData);
    // }
    // ...mapMutations({
    //   compList: "fetchThumbList"
    // })
  },
  beforeCreate() {},
  created() {
    this.$store.dispatch(Constant.FETCH_THUMBALL);
    this.fetchList();
    this.$bus.$on("thumb-data", this.fetchList);
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    //console.log(this.compAll)
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("thumb-data");
  },
  destroyed() {}
};
</script>
<style lang='scss' scoped>
li {
  border: 1px solid;
}
.thumb-enter-acitve,
.thumb-leave-active {
  transition: opacity 0.5s;
}

.thumb-enter,
.thumb-leave-to {
  opacity: 0;
}
</style>
