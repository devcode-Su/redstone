<template>
  <nav class="aside-navigation">
    <ul>
      <li class="nav-list icon-btn tooltip-wrap-nav" v-for="(category,i) in nav" :key="category.i" :class="{on : i === selectNum}" @click="categorySelect(i)">
        <span class="icon-wrap icon-btn-nav">
          <i class="material-icons" aria-hidden="true">{{category.icon}}</i>
          <span class="tooltip">{{category.title}}</span>
        </span>
        <ul class="nav-page">
          <li class="page-list" v-for="(page,i) in category.page" :key="page.i">
            <router-link :to="'/Redstone/'+page.path">
              {{page.title}}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
import locationCheckMixin from "../mixins/location.check.mixin";
export default {
  name: "RedNavigation",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      nav: [],
      selectNum: ""
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    categorySelect(select) {
      if (this.selectNum !== select) {
        this.selectNum = select;
      }
      this.$emit("selectedBoolean", this.locationCheck());
    }
  },
  beforeCreate() {},
  created() {
    const apiUrl = "/static/data/navigation.json";
    this.$http.get(apiUrl).then(result => {
      this.nav = result.data;
    });
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    let pageUrl = location.href;
    let i = this.nav.length;
    // let regEx = /([A-z]+)/g;
    // let resultTxt = pageUrl.match(regEx);
    // let t = resultTxt.match(this.nav)
    // let filtertext = String(resultTxt[3]);
    // console.log(pageUrl, i, resultTxt , filtertext);
    while (i--) {
      let u = pageUrl.match(this.nav[i].name);
      if (u !== null) this.selectNum = i;
    }
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  mixins: [locationCheckMixin]
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";

.aside-navigation {
  width: 45px;
  min-width: 45px;
  position:relative;
  z-index:2;
  background-color: color(default);
  ul {
    margin: 0;
    padding: 0;
  }
  .nav-list {
    height: 50px;
    position: relative;
  }
  .nav-page {
    width: 0;
    position: absolute;
    top: 5px;
    left: 50px;
    z-index: 5;
    opacity: 0;
    overflow: hidden;
    @include transition(width, 0.3s);
  }
  .page-list {
    display: block;
    margin: 0 0 5px 15px;
    padding: 0;
    background-color: rgba(26, 34, 47, 0.6);
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    a {
      display: block;
      width: 100%;
      height: 32px;
      min-height: 32px;
      line-height: 32px;
      padding: 0;
      font-size: 14px;
      text-align: center;
      color: color(white);
    }
    &.on,
    &:hover {
      background-color: rgba(26, 34, 47, 0.9);
    }
  }

  @at-root {
    .nav-list {
      > span {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: color(default);
        @include transition(all, 0.15s);
      }

      &:hover {
        > span {
          top: -7px;
          right: -7px;
          bottom: -7px;
          z-index: 1;
          border: 1px solid #1a222f;
          box-shadow: 2px 3px rgba(26, 34, 47, 0.4);
        }
        ul {
          width: 150px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
