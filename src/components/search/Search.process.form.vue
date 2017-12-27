<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div data-form-item>
          <label data-form-label="required">조사기간 설정</label>
          <div data-form-tag="date">
            <div class="input-date">
              <el-date-picker v-model="form.startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select Start" size="small">
              </el-date-picker>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-date-picker v-model="form.endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select End" size="small">
              </el-date-picker>
            </div>
            <div>
              <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setFormDateTime(i)" size="small">
                {{settime}}
              </el-button>
            </div>
          </div>
        </div>
        <div data-form-item="multi-line">
          <label data-form-label="required" class="check">검색 항목</label>
          <div data-form-tag="multi-line">
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">
              전체
            </el-checkbox>
            <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
              <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">
                {{search}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div data-form-item>
          <label>검색 조건</label>
          <div data-form-tag="replace">
            <el-input type="text" v-model="form.q" placeholder="" size="small">
            </el-input>
            <el-checkbox v-model="form.partial_match">
              부분 일치
            </el-checkbox>
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
  import MixinsSetDatetime from "../mixins/setDatetime.mixin"

  export default {
    name:    "ProcessForm",
    extends: {},
    props:   {
      psd: {
        type: Object | Array,
      },
    },

    data() {
      return {
        dateLabel: ["1시간", "일일", "주간", "월간"],
        isIndeterminate: false,
        checklistAll:    [
          "FILE", "IP", "RSC", "process", "network", "files", "registry"
        ],
        checklist:       {
          FILE:     "TI진단 이벤트",
          IP:       "악성 URL/IP 접근 이벤트",
          RSC:      "RSC 엔진 진단 이벤트",
          process:  "프로세스",
          network:  "네트워크",
          files:    "파일",
          registry: "레지스트리",
        },
        form: {
          dept_code: 1,
          nodeid: "",
          startDate: null,
          endDate: null,
          checkAll : true,
          checkType:     [
            "FILE", "IP", "RSC", "process", "network", "files", "registry"
          ],
          q: null,
          partial_match: true,
        },
        queryList: [
          'Sha256Hash', 'Md5Hash', 'FileName', 'Domain', 'RemoteIp', 'VolumeGuid',
        ],
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
      handleCheckAllChange(val) {
        //console.log(val);
        this.form.checkType = val ? this.checklistAll : [];
        this.isIndeterminate = false;
      },
      handleCheckedEngineChange(value) {
        let checkedCount = value.length;
        this.form.checkAll = checkedCount === this.checklistAll.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checklistAll.length;
      },
      onSubmit() {
        //console.log(this.form);
        //console.log("submit????")
        if(this.form.startDate == null || this.form.endDate == null ){
          this.$notify.error({
            title:   "Error",
            message: "조사기간을 입력하세요.",
          });
        } else {
          //console.log("search event rr");
          //console.log(this.form);
          const formData = {
            page : 1,
            length : 50,
            startDate:      this.form.startDate ? this.form.startDate : null,
            endDate:        this.form.endDate ? this.form.endDate : null,
            dept_code:      this.form.dept_code ? this.form.dept_code : null,
            nodeid:        this.form.nodeid ? this.form.nodeid : null,
            order:          "time",
            direction:      1,
            q:              this.form.q,
            all:            this.form.checkAll,
            partial_match:  this.form.partial_match ? this.form.partial_match : null,
            ti_event:       this.$refs.check[0].isChecked,
            url_ip_event:   this.$refs.check[1].isChecked,
            engine_event:   this.$refs.check[2].isChecked,
            process_event:  this.$refs.check[3].isChecked,
            network_event:  this.$refs.check[4].isChecked,
            file_event:     this.$refs.check[5].isChecked,
            registry_event: this.$refs.check[6].isChecked,
            ProcessGuid:    this.form.ProcessGuid ? this.form.ProcessGuid : null,
          };
          console.log(formData);
          this.$emit("form-data", formData);
        }
      }
    },
    created() {
      this.$bus.$on("update", this.onSubmit);
    },
    beforeMounted() {
    },
    mounted() {
      if (this.$route.query && Object.keys(this.$route.query).length > 0) {
        let query = this.$route.query;
        if (query.EventTime || query.InsertTime) {
          let date = query.EventTime || query.InsertTime;
          //console.log(date);
          let d = new Date(this.timeToUTC(date));
          d.setMinutes(d.getMinutes() - 30);
          this.form.startDate = d;
          d = new Date(query.EventTime || query.InsertTime);
          d.setMinutes(d.getMinutes() + 30);
          this.form.endDate = d;
        }
        for (let i in this.queryList) {
          if (query.hasOwnProperty(this.queryList[i])) {
            this.form.q = query[this.queryList[i]];
            break;
          }
        }

        if (query.Type) {
          this.form.checkAll = false;
          this.isIndeterminate = true;
          this.form.checkType = [query.Type];
        }

        if (query.ProcessGuid) {
          this.form.ProcessGuid = query.ProcessGuid;
        }

        if(query.nodeid){
          this.form.nodeid = query.nodeid;
        }
      }
    },
    beforeUpdate() {
    },
    updated() {
      //console.log("ddd")
      //console.log(this.checkType);
      //console.log(this.form)
      //console.log(this.$refs.check[1].isChecked)//
      if (this.$route.query && Object.keys(this.$route.query).length > 0) {
        let query = this.$route.query;
        this.onSubmit();
        if (query.ProcessGuid) {
          this.form.ProcessGuid = null;
        }
      }
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off("update")
    },
    destroyed() {
    },
    mixins:     [
      MixinsSetDatetime,
    ],
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

</style>
