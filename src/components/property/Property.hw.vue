<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      HW 정보
    </h1>
    <el-tabs v-model="activeName" @tab-click="tabs">
      <el-tab-pane label="CPU" name="first">
        <property-datatable :form-data="propertyCPU.formData" :local-data="propertyCPU.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="Memory" name="second">
        <property-datatable :form-data="propertyMemory.formData" :local-data="propertyMemory.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="HDD" name="third">
        <property-datatable :form-data="propertyHDD.formData" :local-data="propertyHDD.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="Display" name="four">
        <property-datatable :form-data="propertyDisplay.formData" :local-data="propertyDisplay.local"></property-datatable>
      </el-tab-pane>
      <el-tab-pane label="Bios" name="five">
        <property-datatable :form-data="propertyBios.formData" :local-data="propertyBios.local"></property-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import PropertyDatatable from "./Property.datatable";

export default {
  name: "Propertyhw",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      activeName: "first",
      propertyCPU: {
        formData: {},
        local : {
          fields: {
            value :"CPU 종류",
            count:"사용 PC 대수"
          }
        }
      },
      propertyMemory: {
        formData: {},
        local : {
          fields: {
            manufacturer : "제조사",
            partnumber : "모델명",
            size: "용량",
            count:"사용 PC 대수"
          }
        }
      },
      propertyHDD: {
        formData: {},
        local : {
          fields: {
            name :"모델명",
            size : "용량",
            count:"사용 PC 대수"
          }
        }
      },
      propertyDisplay: {
        formData: {},
        local : {
          fields: {
            value :"Display",
            count:"사용 PC 대수"
          }
        }
      },
      propertyBios: {
        formData: {},
        local : {
          fields: {
            manufacturer :"제조사",
            biosversion : "버전",
            count:"사용 PC 대수"
          }
        }
      }
    };
  },
  computed: {},
  components: {
    "property-datatable" : PropertyDatatable,
  },
  watch: {},
  methods: {
    receive(){
      console.log(this.activeName);
      if (this.activeName === "first") {
        this.mixData(this.propertyCPU, "processor", "value");
      } else if (this.activeName === "second") {
        this.mixData(this.propertyMemory, "memory", "manufacturer");
      } else if (this.activeName === "third") {
        this.mixData(this.propertyHDD, "diskdrive", "name");
      } else if (this.activeName === "four") {
        this.mixData(this.propertyDisplay, "display", "value");
      } else if (this.activeName === "five") {
        this.mixData(this.propertyBios, "bios", "manufacturer");
      }
    },
    mixData(select, apiUrl, order) {
      return select.formData = {
        url : "/api/admin/node/summary/hardware/" + apiUrl + "/",
        order : order
      }
    },
    tabs(){
      this.receive();
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {
    this.receive()
  },
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
