<template>
  <section class="template-property-pannel template-container template-pannel-box">
    <h1 class="">
        <span v-if="true">
          <img src="../../assets/search-box.jpg" alt="검색"> PC 정보
        </span>
      <span v-else>
          <img src="../../assets/search-box.jpg" alt="검색"> PC 정보
        </span>
    </h1>
    <span class="pannel small">{{searchNavi}} 에서 검색 </span>
    <div class="property-info-wrap">
      <div class="property-detail">
        2342365
        <dl v-for="dl in info" :key="dl.id">
          <dt>{{dl.dt}} : </dt>
          <dd>{{dl.dd}}</dd>
        </dl>
      </div>
    </div>
  </section>
</template>
<script>
  import { EventBus } from "@/main";
  export default {
    name: "TemplateSearchpannel",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      pannelType: {
        type: Array | Object,
        default: false
      },
      widthsize: {
        type: Number,
        default: 120
      }
    },
    data() {
      return {
        searchNavi : "전사",
      };
    },
    computed: {
    },
    components: {
    },
    watch: {},
    methods: {
    },
    created() {
      EventBus.$on("searchNavi", data => {
        this.form.data = data;
        this.searchNavi = data.name || data.dept.name +" / "+ data.username;
      })
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
  .template-property-pannel {
    display:flex;
    margin-top: 65px;
    padding: 15px 15px;
    border: 1px solid color(border);
    h1{
      padding:0 15px;
    }
    .property-info-wrap{
      background: url() no-repeat 20px center;
    }
    .pannel.small{
      position:absolute;
      left:0;
      top:-30px;
      font-size:12px;
    }
    .property-detail{
      border-left: 1px solid color(border);
    }
  }
</style>
