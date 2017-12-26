<template>
  <div data-search-pannel>
    <global-range></global-range>
    <form @submit.prevent="send">
      <fieldset>
        <!--<datetime @dateTime="dateSet"></datetime>-->
        <div data-form-item>
          <label data-form-label="required">조사기간 설정</label>
          <div data-form-tag>
            <el-date-picker v-model="startDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select Start" size="small"
                            @change="valueChanged('start', $event)" @input="valueChanged('start', $event)">
            </el-date-picker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <el-date-picker v-model="endDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select End" size="small"
                            @change="valueChanged('end', $event)" @input="valueChanged('end', $event)">
            </el-date-picker>
            <el-button v-for="(settime,i) in dateLabel" :key="settime.i" @click="setDateTime(i)" size="small">
              {{settime}}
            </el-button>
          </div>
        </div>
        <div data-form-item>
          <label data-form-label="required">검색 항목</label>
          <div data-form-tag>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="checkAll">전체</el-checkbox>
            <el-checkbox v-model="form.REMOVABLE" :true-label="'on'" @change="checkBox">이동식 디스크</el-checkbox>
            <el-checkbox v-model="form.EXTERNAL" :true-label="'on'" @change="checkBox">외장 디스크</el-checkbox>
            <el-checkbox v-model="form.CDROM" :true-label="'on'" @change="checkBox">CD-ROM</el-checkbox>
          </div>
        </div>
      </fieldset>
      <div data-search-submit>
        <el-button type="primary" plain size="small" native-type="submit">
          검색
        </el-button>
      </div>
    </form>
  </div>
</template>
<script>
  //import Constant from "@/constant";
  import { mapGetters } from "vuex";
  import GlobalRange from "../form/Global.range";
  import Datetime from "../form/Datetime";
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";
  export default {
    name: "SecurityMediaform",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData : {
        type : Array | Object,
        default(){
          return { message : "not"}
        }
      }
    },
    data() {
      return {
        dateLabel: ["1시간", "일일", "주간", "월간"],
        startDate: null,
        endDate: null,
        checkedAll: true,
        isIndeterminate: false,
        form: {
          dept_code: 1,
          nodeid: "",
          startDate: null,
          endDate: null,
          REMOVABLE: "on",
          EXTERNAL: "on",
          CDROM: "on",
        },
      };
    },
    computed: {
      ...mapGetters({
        globalRangeCode: "globalRangeCode",
        dashboardData : "dashboardData"
      })
    },
    components: {
      "global-range" : GlobalRange,
      "datetime": Datetime
    },
    watch: {
      globalRangeCode(g) {
        if (g) {
          //console.log(g);
          this.form.dept_code = g.dept_code;
          this.form.nodeid = g.nodeid;
        }
      },
      dashboardData(g){
        if(g.row === undefined){
          //console.log("언디파인드")
        }
      },
      propData(f){
        if(f){
          console.log(f);
          this.setDateTime(Number(f.num));
          if(f.row){
            this.checkedAll = false;
            this.checkAll(false);
            this.form.nodeid = f.row.nodeid;
            if(f.row.name === "USB"){
              this.form.REMOVABLE = "on";
            }else if(f.row.name === "DISK"){
              this.form.EXTERNAL = "on";
            }else if(f.row.name === "CDROM"){
              this.form.CDROM = "on";
            }
          }

          this.send();
        }
      }
    },
    methods: {
      valueChanged(obj, value) {
        //console.log('valueChanged', obj, value);
        let data = {};
        data[obj] = value;
        this.form.startDate = this.startDate;
        this.form.endDate = this.endDate;
      },
      setDateTime(i) {
        this.setDatetime(i);
        this.form.startDate = this.startDate;
        this.form.endDate = this.endDate;
      },
      checkAll(val) {
        if (val) {
          this.form.REMOVABLE = 'on';
          this.form.EXTERNAL = 'on';
          this.form.CDROM = 'on';
        } else {
          this.form.REMOVABLE = '';
          this.form.EXTERNAL = '';
          this.form.CDROM = '';
        }
        this.isIndeterminate = false;
      },
      checkBox() {
        if (this.form.REMOVABLE && this.form.EXTERNAL && this.form.CDROM) {
          this.checkedAll = true;
          this.isIndeterminate = false;
        }
        else if (this.form.REMOVABLE || this.form.EXTERNAL || this.form.CDROM) {
          this.checkedAll = false;
          this.isIndeterminate = true;
        }
        else {
          this.checkedAll = false;
          this.isIndeterminate = false;
        }
      },
      dateSet(dateTime) {
        //console.log(dateTime);
        this.form.startDate = dateTime.start ? dateTime.start : this.form.startDate;
        this.form.endDate = dateTime.end ? dateTime.end : this.form.endDate;
      },
      send() {
        console.log(this.form);
        if (!this.form.startDate || !this.form.endDate) {
          this.$notify.error({
                               title: 'Error',
                               message: '조사기간을 설정하세요.',
                             });
        }
        else if (!this.form.REMOVABLE && !this.form.EXTERNAL && !this.form.CDROM) {
          this.$notify.error({
                               title: 'Error',
                               message: '검색 항목을 선택해주세요.',
                             });
        } else {
          this.$emit("form", this.form);
        }
      },
      dataSet(){
        this.form.dept_code = this.globalRangeCode.dept_code;
        this.form.nodeid = this.globalRangeCode.nodeid;
        // if(this.dashboardData.media !== undefined){
        //   const data = this.dashboardData.media;
        //   let d = new Date(this.timeToUTC(data.time));
        //   d.setMinutes(d.getMinutes() - 30);
        //   this.startDate = d;
        //   this.form.startDate = d;
        //   d = new Date(this.timeToUTC(data.time));
        //   d.setMinutes(d.getMinutes() + 30);
        //   this.endDate = d;
        //   this.form.endDate = d;
        //   this.checkedAll = false;
        //   this.checkAll(false);
        //   if(data.name === "USB"){
        //     this.form.REMOVABLE = "on";
        //   }
        //
        //   this.send();
        // }
      }
    },
    beforeCreate() {
    },
    created() {
      this.dataSet();
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
    },
    mixins: [MixinsSetDatetime],
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  button{
    margin-left:5px;
  }
</style>
