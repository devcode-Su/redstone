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
    </h1>
    <div class="property-detail">
      <dl class="property-detail-contents">
        <dt>{{fields[api]}}</dt>
        <dd>{{name}}</dd>
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
    props : {
      type: Object,
      default: function () {
        return {message: 'do not'}
      }
    }
  },
  data() {
    return {
      fields: {
        os : "운영체재",
        browser : "브라우저",
        software : "소프트웨어",
        processor : "CPU",
        memory : "Memory",
        diskdrive : "HDD",
        display : "Display",
        bios : "BIOS"
      },
      api : "",
      dept_code: 1,
      nodeid : "",
      version:"",
      name : "",
    };
  },
  computed: {
    ...mapGetters({
      globalRangeCode: "globalRangeCode",
    })
  },
  components: {},
  watch: {
    globalRangeCode(g) {
      if (g) {
        this.dept_code = g.dept_code;
        this.nodeid = g.nodeid;
      }
    },
    props(p){
      if(p){
        this.name = p.name;
        this.version = p.version;
        this.api = p.api;
      }
    },
  },
  methods: {
    resetRange() {
      this.$bus.$emit("update");
      this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
        dept_code: 1,
        name: "전사"
      });
    },
    defaultSet(){
      this.dept_code = this.globalRangeCode.dept_code;
      this.nodeid = this.globalRangeCode.nodeid;
    }
  },
  created() {
    this.defaultSet();
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {

  },
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
  .icon-noti {
    width: 60px;
    height: 60px;
    padding: 15px;
    margin-right: 10px;
    color: color(button);
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
    padding: 10px 30px;
    &-contents {
      display: flex;
      align-items: center;
      margin: 5px 0;
      font-size:14px;
      dt {
        font-weight: bold;
        width: 120px;
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
