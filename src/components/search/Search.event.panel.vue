<template>
  <div class="template-search-pannel template-container">
    <el-form @submit.prevent.native="find" ref="form" :label-width="'180px'" :label-position="'left'">
      <fieldset>
        <div class="form-align-box">
          <div class="form-item-wrap">
            <el-form-item label="검색 항목" size="small">
              <el-radio-group v-model="form.selectedRadio" @change="radioSelected">
                <el-radio v-for="(item, k) in radioList" :label="k" :key="k">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item size="small">
              <template v-if="form.selectedRadio === 'EventAll'">
                <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">
                  전체
                </el-checkbox>
                <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
                  <el-checkbox v-for="(search, k) in checklist" :label="k" :key="k" :ref="'check'">
                    {{search.name}} ({{search.count}})
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="검색 조건" size="small">
              <el-input type="text" v-model="text">
              </el-input>
              <el-button size="small" @click="find($event, 0)">▲</el-button>
              <el-button size="small" @click="find($event, 1)">▼</el-button>
            </el-form-item>
          </div>
          <div class="btn-wrap">
            <el-button size="small" type="primary" @click="find">검색</el-button>
          </div>
        </div>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
  import MixinsSearchAreaClose from "@/components/mixins/setDatetime.mixin";

  export default {
    name: "SearchEventPanel",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: String
      }
    },
    data() {
      return {
        radioList: {
          EventImportant: '중요 이벤트',
          EventAll: '모든 이벤트'
        },
        activeName: "first",
        datebtn: ["1시간", "일일", "주간", "월간"],
        isIndeterminate: false,
        checklistAll: [
          "FILE", "IP", "RSC", "process", "network", "files", "registry"
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
          checkAll: true,
          checkType: [
            "FILE", "IP", "RSC", "process", "network", "files", "registry"
          ],
          selectedRadio: 'EventImportant',
        },
        text: "",
      };
    },
    computed: {},
    components: {
      // ElRadio,
      // ElRadioGroup
    },
    watch: {
      propData: function (n, o) {
        console.log(n, o);
      }
    },
    methods: {
      radioSelected($event) {
        this.text = '';
        this.$bus.$emit('EventFilter', this.form);
      },
      find(e, direction = 1) {
        this.$bus.$emit('SearchString', {q: this.text, direction: direction});
        return false;
      },
      handleCheckAllChange(val) {
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
    },
    beforeCreate() {
    },
    created() {
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
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off('EventCount');
    },
    destroyed() {
    },
    mixins: [
      MixinsSetDatetime,
      MixinsSearchAreaClose
    ]
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
