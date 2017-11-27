<template>
  <section class="dashboard-thumb">
    <h1>
      {{datacollection.title}}
    </h1>
    <sort-button :categorize="categorize" @btnSortClick="sortData"></sort-button>
    <div class="template-table-wrap">
      <ul class="background-line">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="template-table">
        <table>
          <thead>
          <tr>
            <th v-for="(th, i) in fields" :key="th.id" :class="{col1 : i === 0 }">{{th}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in dataReceive" :key="row.id">
            <td class="col1">{{row.name }}</td>
            <td>{{row.score}}</td>
            <td>{{row.count}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="icon-btn icon-wrap more-link">
      More <i class="fa fa-external-link fa-lg" aria-hidden="true"></i>
    </button>
    <button class="icon-wrap icon-btn thumb-remove">
      <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
    </button>
  </section>
</template>
<script>
  import SortButton from "../Dashboard.thumb.btn.vue";
  export default {
    name: "",
    extends: {},
    props: {
      title: {
        type: String
      },
      thumbData: {
        type: Array | Object
      }
    },
    data() {
      return {
        leng: 3,
        categorize: ["일일", "주간", "월간"],
        fields:[
          "악성파일명", "위험도", "개수"
        ],
        datacollection: {},
        num : 0
      };
    },
    computed:{
      changeNum(){
        return this.num
      },
      dataReceive(){
        return this.datacollection.data ? this.datacollection.data[this.num] : false
      }
    },
    components: {
      SortButton
    },
    methods: {
      sortData(sortNum) {
        this.num = sortNum;
      },
    },
    created() {
      const url = "/dashboard/?method=get&resource=badfile";
      this.$http.get(url).then( result => {
        this.datacollection = result.data
      });
    },
    updated(){
    },
    mounted() {
    },
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .col1{
    width:70% !important;
    text-align:left;
  }
  td {
    text-align: center;
  }
</style>
