<template>
  <div data-search-pannel="property">
    <p data-range>
      <span v-if="globalRangeCode.name">{{globalRangeCode.name}}</span>
      <span v-else>
        {{globalRangeCode.dept.name}} / {{globalRangeCode.username}}
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
      <dl class="property-detail-contents" v-for="(dl,k) in fields" :key="dl.id">
        <dt>{{dl}}</dt>
        <dd>{{infoData[k]}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  export default {
    name: "TemplatePropertypannel",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        fields: {
          nodeid: "센서 ID",
          os: "운영체재",
          username: "사용자명",
          userip: "IP 주소",
          userdept: "부서명",
          computer: "컴퓨터명",
        },
        infoData: [],
        urlNum : "",
        responseData : []
      };
    },
    computed: {
      ...mapGetters({
        globalRangeCode: "globalRangeCode",
        propertyDetail : "propertyDetailPc"
      })
    },
    components: {},
    watch: {
      propertyDetailCode(p){
        if(p){
          this.receiveSearch();
          return p;
        }
      },
      responseData(d){
        if(d){
          console.log(d);
          return this.infoData = d;
        }
      }
    },
    methods: {
      receiveSearch(){
        const url = `/api/admin/node/info/${this.urlNum}`;
        console.log(url);
        this.$http.get(url).then( response => {
          this.responseData = response.data;
        });
      }
    },
    created() {
      this.urlNum = this.propertyDetail.nodeid;
      this.receiveSearch();
    },
    beforeMounted() {},
    mounted() {
    },
    beforeUpdate() {},
    updated() {},
    activated() {},
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
    margin-top:20px;
    padding: 15px 15px;
    background:0 none;
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
      padding: 0 35px 0 15px;
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
      flex:1;
      display: flex;
      flex-wrap: wrap;
      height:110px;
      padding: 10px 30px;
      overflow-y:auto;
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
          flex:1;
          margin-left: 0;
        }
      }
    }
    .property-detail {
      border-left: 1px solid color(border);
    }
  }
</style>
