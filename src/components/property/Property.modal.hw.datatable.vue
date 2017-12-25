<template>
  <section data-table-wrap>
    <header data-table="header">
      <h1 data-caption>
        하드웨어 정보
      </h1>
    </header>
    <div data-table="table">
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <template>
            <tr data-tbody="row" v-if="tableData['processor'].length > 1" v-for="(row, i) in tableData['processor']" :key="row.id">
              <th>CPU {{i+1}}</th>
              <td>{{row.name}} x{{row.cores}}코어</td>
            </tr>
            <tr data-tbody="row" v-else>
              <th>CPU</th>
              <td>{{row.name}} x{{row.cores}}코어</td>
            </tr>
          </template>
          <template>
            <tr data-tbody="row" v-if="tableData['memory'].length > 1" v-for="(row, i) in tableData['memory']" :key="row.id">
              <th>Memory {{i+1}}</th>
              <td>{{row.manufacturer}}  {{row.partnumber}} ({{row.serialnumber}}) {{(row.size/(1024 * 1024 * 1024)).toFixed(2)}}GB</td>
            </tr>
            <tr data-tbody="row" v-else>
              <th>Memory</th>
              <td>{{row.manufacturer}}  {{row.partnumber}} ({{row.serialnumber}}) {{(row.size/(1024 * 1024 * 1024)).toFixed(2)}}GB</td>
            </tr>
          </template>
          <template>
            <tr data-tbody="row" v-if="tableData['diskdrive'].length > 1" v-for="(row, i) in tableData['diskdrive']" :key="row.id">
              <th>HDD {{i+1}}</th>
              <td>[{{row.interfacetype}}]  {{row.name}},  {{(row.size/(1024 * 1024 * 1024)).toFixed(2)}}GB  ({{row.mediatype}})</td>
            </tr>
            <tr data-tbody="row" v-else>
              <th>HDD</th>
              <td>[{{row.interfacetype}}]  {{row.name}},  {{(row.size/(1024 * 1024 * 1024)).toFixed(2)}}GB  ({{row.mediatype}})</td>
            </tr>
          </template>
          <template>
            <tr data-tbody="row" v-if="tableData['video'].length > 1" v-for="(row, i) in tableData['video']" :key="row.id">
              <th>Display {{i+1}}</th>
              <td>{{row.name}}</td>
            </tr>
            <tr data-tbody="row" v-else>
              <th>Display</th>
              <td>{{row.name}}</td>
            </tr>
          </template>
          <template>
            <tr data-tbody="row" v-if="tableData['bios'].length > 1" v-for="(row, i) in tableData['bios']" :key="row.id">
              <th>Bios {{i+1}}</th>
              <td>제조사: {{row.manufacturer}},  버전: {{row.biosversion}},  릴리즈: {{row.releasedate}}</td>
            </tr>
            <tr data-tbody="row" v-else>
              <th>Bios</th>
              <td>제조사: {{row.manufacturer}},  버전: {{row.biosversion}},  릴리즈: {{row.releasedate}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  export default {
    name: "PropertyDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        responseData : [],
        tableData: [],
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length
      },
      ...mapGetters({ propertyDetailCode: "propertyDetailPc" })
    },
    components: {
    },
    watch: {
      propertyDetailCode(p){
        if(p){
          this.receiveSearch();
          return p;
        }
      },
      responseData(d){
        if(d){
          console.log(d);
          return this.tableData = d;
        }
      }
    },
    methods: {
      receiveSearch(){
        const url = `/api/admin/hardware/list/${this.propertyDetailCode.nodeid}`;
        this.$http.get(url).then( response => {
          this.responseData = response.data;
        });
      }
    },
    beforeCreate() {
    },
    created() {
      this.receiveSearch();
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
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-table-wrap]{
    margin-top:15px;
  }
  [data-table="table"]{
    min-width:700px;
  }
  [data-table="header"]{
    justify-content: flex-start;
  }
  [data-caption]{
    margin-bottom: 0;
    font-size:18px;
  }
  [data-tbody="tbody"]{
    height:146px !important;
    min-height:146px !important;;
    border-top:1px solid color(border) !important;
    th{
      width:150px;
      height:28px;
      line-height:28px;
    }
  }
  [data-none-data="screen"]{
    height:198px !important;
  }
</style>
