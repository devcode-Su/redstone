<template>
  <section class="dashboard-thumb">
    <h1>
      <!--{{title}}--> 타이틀
    </h1>
    <div class="template-table-wrap">
      <div class="template-table">
        <table>
          <thead>
          <tr>
            <th>123</th>
            <th>123</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>345</td>
            <td>345</td>
          </tr>
          <tr>
            <td>345</td>
            <td>345</td>
          </tr>
          <tr>
            <td>345</td>
            <td>345</td>
          </tr>
          <tr>
            <td>345</td>
            <td>345</td>
          </tr>
          <tr>
            <td>345</td>
            <td>345</td>
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
  import SortButton from "../Dashboard.thumb.period.btn";
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
        datacollection: {}
      };
    },
    components: {
      SortButton
    },
    methods: {
      sortData(sortNum) {
        console.log(sortNum)
        //this.fillData(sortNum);
      },
//      fillData(n) {
//        const insertData = this.thumbData;
//        if (n === undefined) n = 0;
//        this.datacollection = {
//          fields: insertData.fields,
//          columns: insertData.columns[n]
//        };
//      }
    },
    create() {
      const url = "/dashboard/?method=get&resource=badfile";
      this.$http.get(url).then( result => {
        console.log(result)
      })
    },
    mounted() {
    },
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
