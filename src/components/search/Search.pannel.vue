<template>
  <div class="template-search-pannel template-container">
    <el-form ref="form" :model="form" :label-width="'180px'" :label-position="'left'">
      <fieldset>
        <legend class="pannel small">{{searchNavi}} 에서 검색 </legend>
        <div class="form-align-box">
          <div class="form-item-wrap">
            <el-form-item label="조사기간 설정" size="small">
              <el-date-picker v-model="form.startDate" type="datetime">
              </el-date-picker>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-date-picker v-model="form.endDate" type="datetime">
              </el-date-picker>
              <div class="btn-date-wrap">
                <el-button v-for="(settime,i) in datebtn" :key="settime.i" @click="setDatetime(i)">
                  {{settime}}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="analysis-check" label="검색 항목" size="small">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                전체
              </el-checkbox>
              <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
                <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">{{search}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="검색 조건" size="small">
              <el-input type="text" v-model="form.text">
              </el-input>
              <el-checkbox class="agreement" v-model="form.agreement">
                부분 일치
              </el-checkbox>
            </el-form-item>
          </div>
          <div class="btn-wrap">
            <el-button size="small" type="primary" @click="onSubmit('form')">검색</el-button>
          </div>
        </div>
      </fieldset>
    </el-form>
  </div>
</template>
<script>
  import _ from "lodash";

  export default {
    name: "Searchanalysis",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: Array | Object
      }
    },
    data() {
      return {
        activeName: "first",
        checkAll: true,
        searchNavi: "전사",
        isIndeterminate: false,
        requestData: {
          page: 1,
          length: 50,
          order: 'time',
        }
      };
    },
    computed: {
      orderedItems() {
        return _.orderBy(this.filteredMebers, this.orderField, this.direction);
      },
      filteredMebers() {
        return this.members.filter(member => {
          return member.username.match(this.filterText);
        });
      },
    },
    components: {},
    watch: {},
    methods: {
      handleCheckAllChange(val) {
        this.form.checkType = val ? this.form.checkType : [];
        this.isIndeterminate = false;
      },
      handleCheckedEngineChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.form.checkType.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.form.checkType.length;
      },
      reOrder(select, index) {
        if (this.orderField === select) {
          let check = (this.reverse = !this.reverse);
          this.direction = check ? "asc" : "desc";
        } else {
          this.selected = index;
          this.orderField = select;
          this.direction = "asc";
        }
      },
    },
    beforeCreate() {
    },
    created() {
      this.$bus.$on("search-id", this.receiveSubmit)
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
      this.$bus.$off("search-id")
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";

  .el-checkbox-group {
    margin-left: 0;
    > label {
      margin-left: 0;
    }
  }
</style>
