<template>
  <section class="template-table-wrap">
    <header v-if="header">
      <span>전체</span>
      <div class="btn-wrap">
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="order" placeholder="정렬" size="small">
          <el-option
            v-for="item in propData.orderOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="morebtn = !morebtn" size="small">
            보기
            <i class="fa fa-angle-down"  :class="{ rotate : morebtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
            <el-checkbox v-for="(check,i) in propData.field" :label="i" :key="check" :ref="'checked'">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
  <div class="template-table dynamic-row">
    <div class="table-head-wrap">
      <table>
        <thead>
        <tr>
          <th v-for="(th, i) in propData.field" :key="th.id" :class="['col'+i,{ 'col-end' : propData.field.length-1 === i }]" :ref="'checkedTh'">{{th}}</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="table-body-wrap">
      <table>
        <tbody>
          <tr v-for="row in propData.data" @click="moveRow" :ref="'checkedRow'">
            <td v-for="(col, key, idx) in row" :class="['col'+idx,{ 'col-end' : propData.field.length-1 === idx }]">
              {{col}}
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
    name: "Templatetablerouter",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      header:{
        type:Boolean,
        default:true
      },
      propData:{
        type: Array | Object
      }
    },
    data() {
      return {
        more : null,
        order:"",
        morebtn: false,
      };
    },
    computed: {
      tableData(){
        return this.getValueEx(this.propData.data, this.propData.rowKey)
      }
    },
    components: {},
    watch: {},
    methods: {
      viewCheck(){
        if(this.$refs.checkedRow !== undefined){
          for(var j = 0; j < this.$refs.checkedRow.length; j++){
            for(var i=0; i < this.propData.field.length-1; i ++){
              this.$refs.checkedTh[i].hidden = this.$refs.checked[i].isChecked;
              this.$refs.checkedRow[j].children[i].hidden = this.$refs.checked[i].isChecked;
            }
          }
        }else{
          this.view = [];
        }
      },
      moveRow(){
        console.log("moverow")
      }
    },
    beforeCreate() {},
    created() {
      //console.log(this.propData)
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
      //console.log(this.propData)
    },
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
