<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      프로세스 검색
    </h1>
    <div data-search-pannel>
      <global-range></global-range>
      <form @submit.prevent="onSubmit">
        <fieldset>
          <div data-form-item>
            <label data-form-label="required">조사기간 설정</label>
            <div data-form-tag>
              <el-date-picker v-model="startDate" type="datetime" placeholder="Select Start date and time" size="small">
              </el-date-picker>
              <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
              <el-date-picker v-model="endDate" type="datetime" placeholder="Select End date and time" size="small">
              </el-date-picker>
              <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setDatetime(i)" size="small">
                {{settime}}
              </el-button>
            </div>
          </div>
          <div data-form-item>
            <div data-form-tag="check">
            <label class="check">검색 항목</label>
              <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">
                전체
              </el-checkbox>
              <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
                <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">{{search}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <replace-input @replace="inputText"></replace-input>
        </fieldset>
        <div data-search-submit>
          <el-button type="primary" plain size="small" native-type="onSubmit">
            검색
          </el-button>
        </div>
      </form>
    </div>
    <processdatatable v-if="definition" :definition="definition"></processdatatable>
  </article>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import GlobalRange from "../form/Global.range";
  import ReplaceInput from "../form/Replace.input";
  import Processdatatable from "./Search.process.datatable.vue";
  import MixinsSetDatetime from "../mixins/setDatetime.mixin"

  export default {
    name:    "Searchprocess",
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
          "FILE", "IP", "RSC", "process", "network", "files", "registry",
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
        startDate: null,
        endDate: null,
        form: {
          dept_code: 1,
          nodeid: "",
          checkAll : true,
          checkType:     [
            "FILE", "IP", "RSC", "process", "network", "files", "registry",
          ],
          q:"",
          partial_match: "",
        },
        definition:      {
          field: [
            "프로세스 시작 시각",
            "프로세스 이름",
            "이름",
            "부서",
            "센서 ID",
            "검색된 이벤트 수",
            "위협 정보"
          ],
          url:   "/api/admin/search/event",
          order: [
            {label: '프로세스 시작 시각', value: 'time', default: true},
            {label: '프로세스 이름', value: 'process_name'},
          ],
        },
        queryList:       [
          'Sha256Hash', 'Md5Hash', 'FileName', 'Domain', 'RemoteIp', 'VolumeGuid',
        ],
      };
    },
    computed:   {
      recieveData() {
        return this.$store.state.processSearchData
      },
      ...mapGetters({ globalRangeCode: "globalRangeCode" })
    },
    components: {
      "global-range" : GlobalRange,
      "replace-input": ReplaceInput,
      "processdatatable": Processdatatable,
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
        console.log(val);
        this.form.checkType = val ? this.checklistAll : [];
        this.isIndeterminate = false;
      },
      handleCheckedEngineChange(value) {
        let checkedCount = value.length;
        this.form.checkAll = checkedCount === this.checklistAll.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checklistAll.length;
      },
      inputText(t){
        this.form.q = t.q;
        this.form.partial_match = t.partial_match;
      },
      onSubmit() {
        console.log(this.form);
        if(this.form.startDate == null || this.form.endDate == null ){
          this.$notify.error({
            title:   "Error",
            message: "조사기간을 입력하세요.",
          });
        } else {
          const data = {
            startDate:      this.startDate ? this.startDate : null,
            endDate:        this.endDate ? this.endDate : null,
            dept_code:      this.form.dept_code ? this.form.dept_code : null,
            node_id:        this.form.nodeid ? this.form.nodeid : null,
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
          this.$bus.$emit('process-search-data', data);
        }
      },
      getData(url, data) {
        return this.$http.get(url, {params: data})
          .then(result => {
            this.process.data = result.data;
          });
      },
      receiveSubmit(data) {
        console.log('receiveSubmit');
      },
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
          console.log(date);
          let d = new Date(this.timeToUTC(date));
          d.setMinutes(d.getMinutes() - 30);
          this.startDate = d;
          d = new Date(query.EventTime || query.InsertTime);
          d.setMinutes(d.getMinutes() + 30);
          this.endDate = d;
        }
        for (let i in this.queryList) {
          if (query.hasOwnProperty(this.queryList[i])) {
            this.form.q = query[this.queryList[i]];
            break;
          }
        }
        if (query.Type) {
          this.form.checkType = [query.Type];
        }

        if (query.ProcessGuid) {
          this.form.ProcessGuid = query.ProcessGuid;
        }

        this.onSubmit();

        if (query.ProcessGuid) {
          this.form.ProcessGuid = null;
        }
      }
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
    mixins:     [
      MixinsSetDatetime,
    ],
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

  button{
    margin-left: 5px;
  }
  .check {
    align-self: flex-start;
  }

  [ data-form-tag="check"] {
    align-items: flex-start;
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      .el-checkbox {
        width: 25%;
        margin: 0;
        padding: 0;
        &:nth-child(3) {
          width: 50%;
        }
      }
    }
  }
</style>
