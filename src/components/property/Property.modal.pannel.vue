<template>
  <div data-search-pannel="property">
    <p data-range>
      <span v-if="globalRangeCode.name">{{globalRangeCode.name}}</span>
      <span v-else>
        {{globalRangeCode.dept.name}} / {{globalRangeCode.username}}
        <button data-icon @click="resetRange">
          <i class="fa fa-times-circle"></i>
        </button>
      </span>
      에서 검색
    </p>
    <h1>
      <span class="icon-noti">
          <i class="fa fa-desktop fa-lg"></i>
        </span>
      <span>PC 정보</span>
    </h1>
    <div class="property-detail">
      <dl class="property-detail-contents" v-for="dl in info" :key="dl.id">
        <dt>{{dl.dt}}</dt>
        <dd>{{dl.dd}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
  import Constant from "@/constant";
  import { mapGetters } from "vuex";
  export default {
    name: "TemplatePropertypannel",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
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
      resetRange() {
        this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
          dept_code: 1,
          name: "전사"
        });
      },
    },
    created() {
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    actvated() {},
    deactivated() {},
    beforeDestroy() {
    },
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-search-pannel="property"] {
    display: flex;
    margin-top: 65px;
    padding: 15px 15px;
    background:0 none;
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
      padding: 0 15px;
      span {
        display: flex;
        align-items: center;
        font-size: 20px;
      }
    }
    .notipc {
      width: 170px;
      padding: 0 10px;
      color: color(button);
      &.nonetext {
        width: 90px;
      }
    }
    .icon-noti {
      width: 60px;
      height: 60px;
      padding: 15px;
      margin-right: 10px;
      border: 4px solid color(button);
      border-radius: 50%;
      .fa {
        transform: translate(-3px, 3px);
      }
    }
    .property-detail {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 30px;
      &-contents {
        display: flex;
        align-items: center;
        width: 440px;
        margin: 5px 0;
        dl {
          flex: 1;
          margin: 10px 0;
        }
        dt {
          font-weight: bold;
          width: 100px;
          &:before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 5px;
            margin-right: 10px;
            vertical-align: 2px;
            background-color: color(default);
            border-radius: 50%;
          }
        }
        dd {
          margin-left: 0;
        }
      }
    }
    .property-detail {
      border-left: 1px solid color(border);
    }
  }
</style>
