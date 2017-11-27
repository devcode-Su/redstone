<template>
  <section class="template-table-wrap file-data-table">
    <header v-if="header">
      <span>전체</span>
      <div class="btn-wrap">
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <el-select v-model="order" placeholder="정렬" size="small">
          <el-option v-for="item in propData.orderOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="view-check">
          <el-button @click="morebtn = !morebtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : morebtn }"></i>
          </el-button>
          <el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
            <el-checkbox v-for="(check,i) in propData.field" :label="i" :key="check.i" :ref="'checked'" v-if="i !== 0">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div class="template-table dynamic-row">
      <div class="table-head-wrap">
        <table>
          <thead>
          <tr>
            <th v-for="(th, i) in propData.field" :key="th.id" :class="['col'+i,{ 'col-end' : propData.field.length-1 === i }]" :ref="'checkedTh'"><span>{{th}}</span></th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table>
          <tbody>
          <tr v-for="(row,i) in propData.data" :key="i.id" @click="moveRow" :ref="'checkedRow'">
            <td class="col0">
              <i class="fa fa-power-off"></i>
              <!--{{row.connected}}-->
            </td>
            <td class="col1">
              <span>
                {{row.nodeid}}
              </span>
            </td>
            <td class="col2">
              <span>
                {{row.node.info.username}}
              </span>
            </td>
            <td class="col3">
              <span>
                {{row.node.dept.name}}
              </span>
            </td>
            <td class="col4">
              <span>
                {{row.node.info.computer}}
              </span>
            </td>
            <td class="col5">
              <span>
                {{row.node.info.ip}}
              </span>
            </td>
            <td class="col6">
              <span>
                {{row.FileName}}
              </span>
            </td>
            <td class="col7">
              <span>
                {{row.Md5Hash}}
              </span>
            </td>
            <td class="col8">
              <span>
                {{row.FilePath}}
              </span>
            </td>
            <td class="col9">
              <span>
                {{row.InsertTime}}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <templatepaginations :propData="pagis"></templatepaginations>
  </section>
</template>
<script>
  import Templatepaginations from "../template/Template.paginations.vue"
  export default {
    name: "Searchfiledatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      header: {
        type: Boolean,
        default: true
      },
      propData: {
        type: Array | Object
      }
    },
    data() {
      return {
        more: null,
        order: "",
        morebtn: false,
        view : [],
        pagis:{
          total : "",
          per_page : "",
          current_page: "",
          next_page_url : null,
          prev_page_url : null
        }
      };
    },
    computed: {
      tableData() {
        return this.getValueEx(this.propData.data, this.propData.rowKey);
      }
    },
    components: {
      Templatepaginations
    },
    watch: {},
    methods: {
      viewCheck() {
        if (this.$refs.checkedRow !== undefined) {
          for (var j = 0; j < this.$refs.checkedRow.length; j++) {
            for (var i = 0; i < this.propData.field.length - 1; i++) {
              this.$refs.checkedTh[i+1].hidden = this.$refs.checked[i].isChecked;
              this.$refs.checkedRow[j].children[i+1].hidden = this.$refs.checked[
                i
                ].isChecked;
            }
          }
        } else {
          this.view = [];
        }
      },
      moveRow() {
        console.log("moverow");
      }
    },
    beforeCreate() {},
    created() {
      console.log(this.propData)
    },
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
      console.log(this.propData)
    },
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .file-data-table{
    .table-body-wrap{
      max-height:600px;
    }
    th,td{
      padding:0 10px;
    }
    .col0{
      width:15px;
      min-width:15px;
      padding:0 7px;
      span{
        width:16px;
      }
    }
    .col1{
      min-width:20px;
      width:20px;
    }
    td.col1{
      width:62px;
      min-width:62px;
      padding-left : 20px;
    }
    .col2,
    .col3,
    .col4,
    .col5{
      width:120px;
      min-width:120px;
    }
    .col2 span,
    .col3 span,
    .col4 span,
    .col5 span{
      width:100px;
      min-width:100px;
    }
    .col6,
    .col6 span {
      width: 130px;
    }
    .col7,
    .col7 span{
      width:200px;
      min-width:200px;
    }
    .col8,
    .col8 span{
      width:420px;
    }
  }

</style>
