<template>
  <div data-search-pannel>
    <!--<global-range></global-range>-->
    <form @submit.prevent="find">
      <fieldset>
        <div data-form-item="multi-line">
          <label data-form-label="required" class="check">검색 조건</label>
          <div data-form-tag="multi-line" class="form-mix">
            <div>
              <el-radio-group v-model="form.selectedRadio" @change="radioSelected">
                <el-radio v-for="(item, k) in radioList" :label="k" :key="k">{{item}}</el-radio>
              </el-radio-group>
            </div>
            <div v-if="form.selectedRadio === 'EventAll'">
              <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">
                전체
              </el-checkbox>
              <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
                <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">
                  {{search.name}} ({{search.count}})
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div data-form-item>
          <label>검색 항목</label>
          <div data-form-tag="button">
            <el-input type="text" v-model="text" size="small"></el-input>
            <div class="up-down">
              <el-button size="small" @click="find($event, 0)">▲</el-button>
              <el-button size="small" @click="find($event, 1)">▼</el-button>
            </div>
          </div>
        </div>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="onSubmit">
          검색
        </el-button>
      </div>
    </form>
  </div>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import GlobalRange from "../form/Global.range";
  import MixinsSetDatetime from "../mixins/setDatetime.mixin";

  export default {
    name:    "EventForm",
    extends: {},
    props:   {
      psd: {
        type: Object | Array,
      },
    },

    data() {
      return {
        radioList: {
          EventImportant: '중요 이벤트',
          EventAll: '모든 이벤트'
        },
        isIndeterminate: false,
        checklistAll:     [
          "FILE", "IP", "RSC", "process", "network", "files", "registry",
        ],
        checklist: {
          FILE: {name: "TI진단 이벤트", count: 0},
          IP: {name: "악성 URL/IP 접근 이벤트", count: 0},
          RSC: {name: "RSC 엔진 진단 이벤트", count: 0},
          process: {name: "프로세스", count: 0},
          network: {name: "네트워크", count: 0},
          files: {name: "파일", count: 0},
          registry: {name: "레지스트리", count: 0},
        },
        form: {
          selectedRadio: 'EventImportant',
          checkAll: true,
          checkType: [
            "FILE", "IP", "RSC", "process", "network", "files", "registry"
          ]
        },
        text: "",
      };
    },
    computed:   {
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          //console.log(g);
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      }
    },
    methods:    {
      radioSelected($event) {
        this.text = '';
        this.$bus.$emit('EventFilter', this.form);
      },
      handleCheckAllChange(val) {
        console.log(val);
        this.form.checkType = val ? this.checklistAll : [];
        this.isIndeterminate = false;
        this.text = '';
        this.$bus.$emit('EventFilter', this.form);
      },
      handleCheckedEngineChange(value) {
        let checkedCount = value.length;
        this.form.checkAll = checkedCount === this.checklistAll.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checklistAll.length;
        this.text = '';
        this.$bus.$emit('EventFilter', this.form);
      },
      find(e, direction = 1) {
        this.$bus.$emit('SearchString', {q: this.text, direction: direction});
        return false;
      },
    },
    created() {
      //this.$bus.$on("update", this.onSubmit);
      this.$bus.$on('EventCount', (data) => {
        console.log('EventCount', data);
      });
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      //console.log(this.checkType);
      console.log(this.form)
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      //this.$bus.$off("update")
    },
    destroyed() {
    },
    mixins:     [
      MixinsSetDatetime
    ],
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
  [data-search-pannel]{
    margin-top:15px;
  }
</style>
