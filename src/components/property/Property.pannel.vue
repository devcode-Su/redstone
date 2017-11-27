<template>
  <section class="template-property-pannel template-container template-pannel-box">
    <h1 class="">
      <span class="notipc nonetext" v-if="text">
        <span class="icon-noti">
          <i class="fa fa-desktop fa-lg"></i>
        </span>
      </span>
      <span class="notipc" v-else>
        <span class="icon-noti">
          <i class="fa fa-desktop fa-lg"></i>
        </span>
       <span>PC 정보</span>
      </span>
    </h1>
    <span class="pannel small">{{searchNavi}}에서 검색 </span>
    <div class="property-info-wrap">
      <div class="property-detail">
        <dl class="property-detail-contents" v-for="dl in info" :key="dl.id">
          <dt>{{dl.dt}}</dt>
          <dd>{{dl.dd}}</dd>
        </dl>
      </div>
    </div>
    <!--<el-button class="pc-detail" @click.self="detailMore">-->
      <!--<i class="fa fa-list"></i> PC 자산 상세보기-->
    <!--</el-button>-->
  </section>
</template>
<script>
//import { EventBus } from "@/main";
export default {
  name: "TemplatePropertypannel",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
    text : {
      type: Boolean,
      default : true
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
  methods: {
    detailMore(){
      this.$emite("pcDetail", true)
    }
  },
  created() {
    this.$bus.$on("search-id", data => {
      this.searchNavi = data.name || data.dept.name + " / " + data.username;
    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off("searcg-id")
  },
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
    display:flex;
    justify-content: center;
    align-items:center;
    margin-bottom:0;
    padding: 0 15px;
    span{
      display:flex;
      align-items:center;
      font-size:20px;
    }
  }
  .notipc{
    width:170px;
    padding:0 10px;
    color:color(button);
    &.nonetext{
      width:90px;
    }
  }
  .icon-noti{
    width: 60px;
    height: 60px;
    padding:15px;
    margin-right:10px;
    border:4px solid color(button);;
    border-radius:50%;
    .fa{
      transform:translate(-3px, 3px)
    }
  }
  .property-detail {
    display:flex;
    flex-wrap:wrap;
    padding: 10px 30px;
    &-contents{
      display:flex;
      align-items:center;
      width:440px;
      margin:5px 0;
      dl{
        flex:1;
        margin:10px 0;
      }
      dt{
        font-weight:bold;
        width:100px;
        &:before{
          content:"";
          display:inline-block;
          width:5px;
          height:5px;
          margin-right:10px;
          vertical-align:2px;
          background-color:color(default);
          border-radius:50%;
        }
      }
      dd{
        margin-left:0;
      }
    }
  }
  .el-button.pc-detail{
    position:absolute;
    right:20px;
    bottom:20px;
    height:40px;
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
