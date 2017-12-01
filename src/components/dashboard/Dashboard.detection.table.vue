<template>
  <section class="template-table-wrap dashboard-detection-table">
    <div class="template-table dynamic-row">
      <h2>{{data.title}}</h2>
      <div class="table-head-wrap">
        <table>
          <thead>
          <tr>
            <th v-for="(th, i) in field" :key="th.id" :class="['col'+i,{ 'col-end' : field.length-1 === i }]" :ref="'checkedTh'"><span>{{th}}</span></th>
,          </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
          <tr v-for="(row,i) in rowData" :key="i.id" @click="moveRow(i)">
            <td v-for="(col, k, idx) in row" :key="k"  :class="['col'+idx,{ 'col-end' : field.length-1 === idx }]">
              <span>{{col}}</span>
              <span v-if="idx === 'danger'" :class="[{'normal' : col >= 0 && col <= 50 },{'alpha' : col > 50 && col <= 70 },{'bravo' : col > 70 && col <= 80 },{'charile' : col > 80 && col <= 90 },{'delta' : col > 90 && col <= 100 }]">
                <i class="fa fa-excalmation-triangle fa-lg"></i>
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'Dashboardlogtable',
    extends:{},
    props:{ //알파벳 순으로 정렬할 것.
      //        propData: {
//          type: Array | Object
//        }
    },
    data(){
      return{
        showModal : false,
        field : [],
        rowData:[],
        data : [],
        rowKey:[
          "EventTime", "Type", "username", "userdept", "userip", "Score"
        ]
      }
    },
    computed:{},
    components:{},
    watch:{},
    methods:{
      moveRow() {
        console.log("moverow");
      },
      dataReceive(){
        const url = "/dashboard/?method=get&resource=detect";
        this.$http.get(url).then(result => {
          console.log(result);
          this.field = result.data.data.fields;
          this.rowData = this.getValueEx(result.data.data.columns, this.rowKey);
          this.data = result.data
        })
      }
    },
    beforeCreate(){},
    created(){
      this.dataReceive();
    },
    beforeMounted(){},
    mounted(){},
    beforeUpdate(){},
    updated(){},
    actvated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){}
  }
</script>
<style lang='scss' scoped>
  @import '~styles/variables';
.template-table-wrap{
  box-shadow: 0px 2px 5px rgba(25, 25, 25, 0.27);
  h2{
    padding:10px;
    margin-bottom:0;
  }
  &.dashboard-table{
    .col0{
      width:200px;
    }
    .col1{
      width:150px;
    }
    .col2{
      width:150px;
    }
    .col3{

    }
  }
}
</style>
