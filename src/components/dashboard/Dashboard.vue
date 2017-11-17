<template>
  <article>
    <h1 class="page-title">
      Dashboard
    </h1>
    <button type="button" @click="showModal = true">설정</button>
    <templatemodal v-if="showModal" :target="'user-custom'" @close="showModal = false" :title="'대시보드 설정'" :compSelect="'dashboard-thumbset'">
    </templatemodal>
    <div>
      content
    </div>
  </article>
</template>
<script>
import Templatemodal from "../template/Template.modal";
//import Dashboardthumb from "./Dashboard.thumb";
export default {
  name: "Dashboard",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    defaultViews() {
      return this.defaultView.length === 0
        ? (this.defaultView = JSON.parse(
            localStorage.getItem("dashboard-data")
          ))
        : (this.defaultView = JSON.parse(
            localStorage.getItem("dashboard-view")
          ));
    }
  },
  components: {
    Templatemodal,
    //Dashboardthumb
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {
    const apiUrl = "/static/data/userset.json";
    let promise = [];
    this.$http.get(apiUrl).then(result => {
      result.data.forEach(item => {
        if (item.hasOwnProperty("url")) {
          promise.push(
            this.$http.get(item.url).then(r => {
              item.data = r.data;
            })
          );
        }
      });
      Promise.all(promise)
        .then(() => {
          this.defaultView = result.data;
          localStorage.setItem("dashboard-data", JSON.stringify(result.data));
        })
        .then(() => {
          this.defaultViews;
        });
    });
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
