<template>
  <article data-layout="Route-article">
    <h1 class="page-title">
      프로세스 검색
    </h1>
    <div class="template-search-pannel template-container">
      <el-form ref="form" :model="form" :label-width="'180px'" :label-position="'left'">
        <fieldset>
          <div class="form-align-box">
            <div class="form-item-wrap">
              <el-form-item label="조사기간 설정" size="small">
                <el-date-picker v-model="startDate" type="datetime">
                </el-date-picker>
                <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
                <el-date-picker v-model="endDate" type="datetime">
                </el-date-picker>
                <div class="btn-date-wrap">
                  <el-button v-for="(settime,i) in datebtn" :key="settime.i" @click="setDatetime(i)">
                    {{settime}}
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="검색 항목" size="small">
                <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">
                  전체
                </el-checkbox>
                <el-checkbox-group v-model="form.checkType" @change="handleCheckedEngineChange">
                  <el-checkbox v-for="(search,k ,i) in checklist" :label="k" :key="k" :ref="'check'">{{search}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="검색 조건" size="small">
                <el-input type="text" v-model="form.q">
                </el-input>
                <el-checkbox class="agreement" v-model="form.partial_match">
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
    <processdatatable v-if="process" :propData="process" :definition="definition"></processdatatable>
  </article>
</template>
<script>

  import Processdatatable from "./Search.process.datatable.vue";
  import MixinsSetDatetime from "../mixins/setDatetime.mixin"

  export default {
    name: "Searchprocess",
    extends: {},
    props: {
      psd: {
        type: Object | Array
      }
    },

    data() {
      return {
        datebtn: ["1시간", "일일", "주간", "월간"],
        searchNavi: "전사",
        isIndeterminate: false,
        checklistAll: [
          "FILE", "IP", "RSC", "process", "network", "files", "registry"
        ],
        checklist: {
          FILE: "TI진단 이벤트",
          IP: "악성 URL/IP 접근 이벤트",
          RSC: "RSC 엔진 진단 이벤트",
          process: "프로세스",
          network: "네트워크",
          files: "파일",
          registry: "레지스트리"
        },
        form: {
          checkType: [
            "FILE", "IP", "RSC", "process", "network", "files", "registry"
          ],
          checkAll: true,
          q: "",
          partial_match: false
        },
        startDate: null,
        endDate: null,
        process: {
          field: [
            "프로세스 시작 시간",
            "프로세스 이름",
            "이름",
            "부서",
            "센서 ID",
            "검색된 이벤트 수",
            "위협 정보",
            ""
          ],
          data: [],
          search: [],
          url: ""
        },
        definition: {
          field: [
            "프로세스 시작 시각",
            "프로세스 이름",
            "이름",
            "부서",
            "센서 ID",
            "검색된 이벤트 수",
            "위협 정보",
            ""
          ],
          url: "/api/admin/search/event",
          order: [
            {label: '프로세스 시작 시각', value: 'time', default: true},
            {label: '프로세스 이름', value: 'process_name'},
          ]
        },
      };
    },
    computed: {
      recieveData() {
        return this.$store.state.processSearchData
      }
    },
    components: {
      Processdatatable
    },
    watch: {},
    methods: {
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
      onSubmit(form) {
        const formData = this.$refs[form].model;

        if (this.startDate === "" || this.endDate === "") {
          this.$notify.error({
            title: "Error",
            message: "검색 조건을 입력하세요."
          });
        } else {
          const data = {
            startDate: this.startDate ? this.startDate : null,
            endDate: this.endDate ? this.endDate : null,
            dept_code: formData && formData.data ? formData.data.dept_code || "" : null,
            node_id: formData && formData.data ? formData.data.node_id || "" : null,
            order: "time",
            direction: 1,
            q: formData.q,
            all: this.form.checkAll,
            partial_match: formData.partial_match ? formData.partial_match : null,
            ti_event: this.$refs.check[0].isChecked,
            url_ip_event: this.$refs.check[1].isChecked,
            engine_event: this.$refs.check[2].isChecked,
            process_event: this.$refs.check[3].isChecked,
            network_event: this.$refs.check[4].isChecked,
            file_event: this.$refs.check[5].isChecked,
            registry_event: this.$refs.check[6].isChecked
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
      }
    },
    created() {
//      this.$bus.$on("process-search-data", this.receiveSubmit.bind(this));
//      this.$bus.$on('process-page-length-change', (item) => {
//        if (item.page !== this.page || item.length !== this.length) {
//          this.page = item.page;
//          this.length = item.length;
//          this.onSubmit('form');
//        }
//      });
      if (this.$route.query && this.$route.query.psd) {
        let data = this.$route.query.psd;
        const defaultData = new Date(data.EventTime);
        const start = new Date(defaultData.getTime() - 60 * 30 * 1000);
        const end = new Date(defaultData.getTime() + 60 * 30 * 1000);

        this.startDate = start;
        this.endDate = end;
        this.form.checkType = [data.Type];
      }
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    mixins: [
      MixinsSetDatetime
    ]
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

  .btn-date-wrap {
    margin-left: 5px;
  }
</style>
