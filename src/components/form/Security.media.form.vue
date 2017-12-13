<template>
  <div data-search-pannel>
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
    <form @submit.prevent="send">
      <fieldset>
        <datetime @dateTime="dateSet"></datetime>
        <media-checked @change="change"></media-checked>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="submit">
          검색
        </el-button>
      </div>
    </form>
  </div>
</template>
<script>
  import Constant from "@/constant";
  import {mapGetters} from "vuex";
  import Datetime from "./Datetime";
  import MediaChecked from "./Media.checked";

  export default {
    name: "SecurityMediaform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        form: {
          dept_code: 1,
          nodeid: "",
          startDate: null,
          endDate: null,
          REMOVABLE: null,
          EXTERNAL: null,
          CDROM: null,
        },
      };
    },
    computed: {
      ...mapGetters({globalRangeCode: "globalRangeCode"})
    },
    components: {
      "datetime": Datetime,
      "media-checked": MediaChecked,
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          console.log(g);
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      },
    },
    methods: {
      resetRange() {
        this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
          dept_code: 1,
          name: "전사",
        });
      },
      dateSet(dateTime) {
        //console.log(dateTime);
        this.form.startDate = dateTime.start ? dateTime.start : this.form.startDate;
        this.form.endDate = dateTime.end ? dateTime.end : this.form.endDate;
      },
      change(check) {
        this.form.REMOVABLE = check.removable;
        this.form.EXTERNAL = check.external;
        this.form.CDROM = check.cdRom;
      },
      send() {
        //console.log(this.form);
        if (!this.form.startDate || !this.form.endDate) {
          this.$notify.error({
                               title: 'Error',
                               message: '조사기간을 설정하세요.',
                             });
        }
        else if (!this.form.REMOVABLE && !this.form.EXTERNAL && !this.form.CDROM) {
          this.$notify.error({
                               title: 'Error',
                               message: '검색 항목을 선택해주세요.',
                             });
        } else {
          this.$emit("form", this.form);
        }
      },
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
