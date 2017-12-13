<template>

  <article data-layout="Route-article">
    <h1 data-page-title>
      네트워크 검색
    </h1>
    <div data-search-pannel>
      <el-form ref="form" :model="form" :label-width="'120px'" :label-position="'left'">
        <fieldset>
          <div class="form-align-box">
            <div class="form-item-wrap">
              <datetime @dateTime="setDatetime"></datetime>
              <type-radio-box :listList="radioInfo.list" :label="radioInfo.labels" @change="setFilter"></type-radio-box>
              <el-form-item label="검색 조건" size="small">
                <el-input type="text" v-model="form.q" placeholder="IP or Domain"></el-input>
                <el-button class="detail-search" size="smll" @click="showDetail = !showDetail">상세검색
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <div class="btn-wrap">
                  <el-button size="small" type="primary" @click="onSubmit">검색</el-button>
                </div>
              </el-form-item>
            </div>
            <div class="detail" v-if="showDetail">
              <el-form-item label="PC IP 주소" prop="LocalIP" size="small">
                <el-input type="text" v-model="form.LocalIP" placeholder="ANY"></el-input>
              </el-form-item>
              <el-form-item label="PC 포트" prop="LocalPort" size="small">
                <el-input type="number" v-model="form.LocalPort" placeholder="ANY"></el-input>
              </el-form-item>
              <el-form-item label="방향" prop="Direction" size="small">
                <el-select v-model="form.Direction">
                  <el-option label="ANY" value=""></el-option>
                  <el-option label="IN" value="IN"></el-option>
                  <el-option label="OUT" value="OUT"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="원격 IP 주소" prop="RemoteIP" size="small">
                <el-input type="text" v-model="form.RemoteIP" placeholder="ANY"></el-input>
              </el-form-item>
              <el-form-item label="원격 포트" prop="RemotePort" size="small">
                <el-input type="number" v-model="form.RemotePort" placeholder="ANY"></el-input>
              </el-form-item>
              <el-form-item label="프로토콜" prop="Protocol" size="small">
                <el-select v-model="form.Protocol">
                  <el-option label="ANY" value=""></el-option>
                  <el-option label="TCP" value="TCP"></el-option>
                  <el-option label="UDP" value="UDP"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="btn-wrap" size="small">
                <el-button @click="showDetail = false">닫기</el-button>
              </el-form-item>
            </div>
          </div>
        </fieldset>
      </el-form>
    </div>
    <search-network-data-table :definition="definition"></search-network-data-table>
  </article>
</template>
<script>
  import TypeRadioBox from '../form/Type.radiobox.vue';
  import Datetime from '../form/Datetime.vue';
  import SearchNetworkDataTable from './Search.network.datatable.vue';

  export default {
    name: "Searchnetwork",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        showDetail: false,
        radioInfo: {
          list: [
            [
              {label: '전체', value: ''},
              {label: '내부', value: 'Internal'},
              {label: '외부', value: 'External'},
              {label: '주요서버', value: 'Major'},
            ],
            [
              {label: '전체', value: ''},
              {label: '내부', value: 'Internal'},
              {label: '외부', value: 'External'},
            ],
          ],
          labels: [
            {label: '목적지', width: '80', name: 'RemoteFilter'},
            {label: '출발지', width: '80', name: 'LocalFilter'},
          ],
        },
        form: {
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
          field: [
            "",
            "센서 ID",
            "사용자명",
            "부서명",
            "PC 명",
            "방향",
            "PC IP 주소",
            "PC Port",
            "원격 IP 주소",
            "원격 Port",
            "프로토콜",
            "검출 시간",
          ],
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
    computed: {},
    components: {
      "type-radio-box": TypeRadioBox,
      "datetime": Datetime,
      'search-network-data-table': SearchNetworkDataTable,
    },
    watch: {},
    methods: {
      setFilter(d) {
        for (let key in d) {
          if (d.hasOwnProperty(key)) {
            this.form[key] = d[key];
          }
        }
      },
      setDatetime(d) {
        this.form.startDate = d.start ? d.start : this.form.startDate;
        this.form.endDate = d.end ? d.end : this.form.endDate;
      },
      onSubmit() {
        if (this.form.startDate === "" || this.form.endDate === "") {
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
          this.$bus.$emit('network-search-data', sendData);
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
    actvated() {
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

  .btn-date-wrap,
  .detail-search {
    margin-left: 5px;
  }
</style>
