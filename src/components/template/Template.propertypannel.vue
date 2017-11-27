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
//import { EventBus } from "@/main";
export default {
  name: "TemplatePropertypannel",
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
      searchNavi: "전사",
      info: [
        {
          dt: "센서 ID",
          dd: "22"
        },
        {
          dt: "컴퓨터명",
          dd: "USERPC"
        },
        {
          dt: "IP",
          dd: "192.168.100.14"
        },
        {
          dt: "로그인 계정",
          dd: "김수홍대표"
        },
        {
          dt: "부서",
          dd: "전사"
        },
        {
          dt: "OS",
          dd: "Microsoft Windows 10 Home 64비트"
        }
      ]
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {
//    EventBus.$on("searchNavi", data => {
//      //console.log(data)
//      this.searchNavi = data.name || data.dept.name + " / " + data.username;
//    });
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
  display: flex;
  margin-top: 65px;
  padding: 15px 15px;
  border: 1px solid color(border);
  h1 {
    padding: 0 15px;
  }
  .property-info-wrap {
    background: url() no-repeat 20px center;
  }
  .pannel.small {
    position: absolute;
    left: 0;
    top: -30px;
    font-size: 12px;
  }
  .property-detail {
    border-left: 1px solid color(border);
  }
}
</style>
