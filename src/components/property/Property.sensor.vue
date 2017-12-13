<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      센서 정보
    </h1>
    <proserty-sensorform @form="receive"></proserty-sensorform>
  </article>
</template>
<script>
  import ProsertySensorform from "../form/Property.sensor.form"
export default {
  name: "Propertysensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        version: true,
        placeholder: "버전 번호",
        check: "sensor"
      }
    };
  },
  computed: {},
  components: {
    "proserty-sensorform":ProsertySensorform
  },
  watch: {},
  methods: {
    receive(form){
      console.log(form)
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
</style>
