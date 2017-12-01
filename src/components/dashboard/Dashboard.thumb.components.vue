<template>
  <section class="components-thumb">
    components list

    <!-- <draggable v-model="compList" class="thumb-wrap">
      <transition-group type="transition" name="thumb" tag="ul" class="thumb-wrap">
        <li class="components-item thumb-item" v-for="item in compList" :key="item.seq"> -->
    <!-- <component :is="item.type" :prop-data="item"></component> -->
    <!-- <test :prop-data="item"></test>
        </li>
      </transition-group>
    </draggable> -->
    <button @click.stop="updateList">rr</button>
    <!-- <draggable v-model="thumbData" class="thumb-wrap">
      <transition-group type="transition" name="thumb" tag="ul" class="thumb-wrap">
        <li class="thumb-item" v-for="(userSet, index) in thumbData" :key="userSet.title">
          <test :prop-data="userSet"></test>
          <router-link tag="md-button" to="#" class="md-raised">More</router-link>
              <md-button class="md-dense" @click="removeThumb(userSets, index)">
                <md-icon>delete</md-icon>
              </md-button>
        </li>
      </transition-group>
    </draggable> -->
    <masonry :cols="{default: 3, 1200: 2, 600: 1}" :gutter="{default: '30px', 700: '15px'}">
      <div v-for="(thumb, index) in compList" :key="thumb.id">
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
    ...mapGetters({ compList: "fetchThumbList" })
    // compList() {
    //   return this.$store.getters.thumbComp;
    // }
  },
  components: {
    thumbchart: ThumbComponentsChart,
    thumbtable: ThumbComponents
  },
  watch: {},
  methods: {
    fetchData() {
      console.log("=====");
      this.$store.dispatch(Constant.FETCH_THUMBLIST);
      // setTimeout(() => {
      //   this.thumbData = this.compList;
      // }, 200);
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
    this.fetchData();
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    //this.updateList();
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("thumblist");
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
