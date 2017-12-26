<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      네트워크 검색
    </h1>
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
            <div data-form-tag="multi-line" class="two-way">
              <div data-tag-multi>
                <label data-form-label>출발지</label>
                <el-radio-group v-model="form.LocalFilter">
                  <el-radio v-for="item in radioInfo.end" :name="item.name" :key="item.value" :label="item.value">
                    {{item.label}}
                  </el-radio>
                </el-radio-group>
              </div>
              <div data-tag-multi>
                <label data-form-label>목적지</label>
                <el-radio-group v-model="form.RemoteFilter">
                  <el-radio v-for="item in radioInfo.start" :name="item.name" :key="item.value" :label="item.value">
                    {{item.label}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div data-form-item>
            <label>검색 조건</label>
            <div data-form-tag="replace">
              <el-input type="text" v-model="form.q" placeholder="IP or Domain" size="small">
              </el-input>
              <el-button size="small" @click.stop="showDetail = !showDetail">
                상세 검색
              </el-button>
            </div>
          </div>
          <div data-detail-input v-if="showDetail">
            <div data-form-item>
              <label>PC IP 주소</label>
              <div data-form-tag="replace">
                <el-input type="text" v-model="form.LocalIP" placeholder="ANY" size="small">
                </el-input>
              </div>
            </div>
            <div data-form-item>
              <label>PC 포트</label>
              <div data-form-tag="replace">
                <el-input type="text" v-model="form.LocalPort" placeholder="ANY" size="small">
                </el-input>
              </div>
            </div>
            <div data-form-item>
              <label>방향</label>
              <div data-form-tag="replace">
                <el-select v-model="form.Direction" size="small">
                  <el-option label="ANY" value=""></el-option>
                  <el-option label="IN" value="IN"></el-option>
                  <el-option label="OUT" value="OUT"></el-option>
                </el-select>
              </div>
            </div>
            <div data-form-item>
              <label>원격 IP 주소</label>
              <div data-form-tag="replace">
                <el-input type="text" v-model="form.RemoteIP" placeholder="ANY" size="small">
                </el-input>
              </div>
            </div>
            <div data-form-item>
              <label>원격 포트</label>
              <div data-form-tag="replace">
                <el-input type="text" v-model="form.RemotePort" placeholder="ANY" size="small">
                </el-input>
              </div>
            </div>
            <div data-form-item>
              <label>프로토콜</label>
              <div data-form-tag="replace">
                <el-select v-model="form.Protocol" size="small">
                  <el-option label="ANY" value=""></el-option>
                  <el-option label="TCP" value="TCP"></el-option>
                  <el-option label="UDP" value="UDP"></el-option>
                </el-select>
              </div>
            </div>
            <div style="text-align:right;">
              <el-button type="primary" plain size="small" @click.stop="showDetail = false">
                닫기
              </el-button>
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
    <search-network-data-table :definition="definition"></search-network-data-table>
  </article>
</template>
<script>
  import { mapGetters } from "vuex";
  import GlobalRange from "../form/Global.range";
  import MixinsSetDatetime from "../mixins/setDatetime.mixin"
  import SearchNetworkDataTable from './Search.network.datatable.vue';
  //import SearchNetworkDataTable from '../test/Test.component';

  export default {
    name: "Searchnetwork",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        showDetail: false,
        dateLabel: ["1시간", "일일", "주간", "월간"],
        selected: [],
        radioInfo: {
          end: [
            {label: '전체', value: ''},
            {label: '내부', value: 'Internal'},
            {label: '외부', value: 'External'},
            {label: '주요서버', value: 'Major'},
          ],
          start : [
            {label: '전체', value: ''},
            {label: '내부', value: 'Internal'},
            {label: '외부', value: 'External'},
          ]
        },
        form: {
          page:1,
          length:50,
          dept_code:1,
          nodeid:"",
          startDate: '',
          endDate: '',
          Domain: '',
          LocalIP: '',
          LocalPort: '',
          RemoteIP: '',
          RemotePort: '',
          Direction: '',
          LocalFilter: '',
          RemoteFilter: '',
          Protocol: '',
          q: '',
        },
        definition: {
          fields: {
            nodeid: "센서 ID",
            username:"사용자명",
            userdept:"부서명",
            userpc:"PC 명",
            Direction:"방향",
            LocalIp:"PC IP 주소",
            LocalPort:"PC Port",
            RemoteIp:"원격 IP 주소",
            RemotePort:"원격 Port",
            Protocol:"프로토콜",
            EventTime:"검출 시간",
          },
          order: [
            {value: 'time', label: '시각'},
            {value: 'RemoteIP', label: '원격 IP'},
            {value: 'RemotePort', label: '원격 Port'},
            {value: 'Direction', label: '방향'},
          ],
          url: '/api/admin/search/network',
        },
      };
    },
    computed: {
      ...mapGetters({
        dashboardData : "dashboardData",
        globalRangeCode: "globalRangeCode",
      })
    },
    components: {
      "global-range" : GlobalRange,
      'search-network-data-table': SearchNetworkDataTable,
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          //console.log(g);
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      },
    },
    methods: {
      // setFilter(d) {
      //   for (let key in d) {
      //     if (d.hasOwnProperty(key)) {
      //       this.form[key] = d[key];
      //     }
      //   }
      // },
      // setDatetime(d) {
      //   //console.log(d)
      //   this.form.startDate = d.start;
      //   this.form.endDate = d.end;
      // },
      onSubmit() {
        console.log(this.form);
        if (this.form.startDate === null || this.form.startDate === "" || this.form.endDate === null || this.form.endDate === "") {
          this.$notify.error({
            title: "Error",
            message: "검색 조건을 입력하세요.",
          });
        } else {
          let sendData = {};
          for (let key in this.form) {
            if (this.form.hasOwnProperty(key)) {
              sendData[key] = this.form[key];
            }
          }
          console.log(sendData)
          this.$bus.$emit('network-search-data', sendData);
        }
      },
      dataSet(){
        if(this.dashboardData.data !== undefined){
          const data = this.dashboardData.data;
          //console.log(data)
          let d = new Date(this.timeToUTC(data.time));
          d.setMinutes(d.getMinutes() - 30);
          this.startDate = d;
          this.form.startDate = d;
          d = new Date(this.timeToUTC(data.time));
          d.setMinutes(d.getMinutes() + 30);
          this.endDate = d;
          this.form.endDate = d;
          this.form.LocalIP = data.ip;

          this.onSubmit();
        }
      }
    },
    beforeCreate() {
    },
    created() {
      this.form.dept_code = this.globalRangeCode.dept_code;
      this.form.nodeid = this.globalRangeCode.nodeid;
    },
    beforeMounted() {
    },
    mounted() {
      this.dataSet();
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

  .btn-date-wrap,
  .detail-search {
    margin-left: 5px;
  }
</style>
