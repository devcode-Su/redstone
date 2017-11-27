<template>
  <section class="dashboard-thumb">
    <h1>
      {{datacollection.title}}
    </h1>
    <templatebaranimation></templatebaranimation>
    <div class="template-table-wrap none-btn">
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
            <td class="col1">{{row.time }}</td>
            <td>{{row.ip}}</td>
            <td class="col-end">{{row.name}}</td>
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
  import Templatebaranimation from "../../template/Template.bar.animation.vue"
  export default {
    name: "Thumbtableimport",
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
        fields:[
          "시간", "IP", "탐지명"
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
        return this.datacollection.data ? this.datacollection.data : false
      }
    },
    components: {
      SortButton,
      Templatebaranimation
    },
    methods: {
      sortData(sortNum) {
        this.num = sortNum;
      },
    },
    created() {
      const url = "/dashboard/?method=get&resource=majorip";
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
    width:50% !important;
  }
  .col-end{
    text-align: center;
  }
</style>
