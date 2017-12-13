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
            value :"Memory",
            count:"사용 PC 대수"
          }
        }
      },
      propertyHDD: {
        formData: {},
        local : {
          fields: {
            value :"HDD",
            count:"사용 PC 대수"
          }
        }
      },
      propertyDisplay: {
        formData: {},
        local : {
          fields: {
            value :"Display",
            version : "버전",
            count:"사용 PC 대수"
          }
        }
      },
      propertyBios: {
        formData: {},
        local : {
          fields: {
            value :"Bios",
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
      console.log(this.activeName)
      if (this.activeName === "first") {
        this.mixData(this.propertyCPU, "processor");
      } else if (this.activeName === "second") {
        this.mixData(this.propertyMemory, "memory");
      } else if (this.activeName === "third") {
        this.mixData(this.propertyHDD, "diskdrive");
      } else if (this.activeName === "third") {
        this.mixData(this.propertyDisplay, "display");
      } else if (this.activeName === "third") {
        this.mixData(this.propertyBios, "bios");
      }
    },
    mixData(select, apiUrl) {
      return select.formData = {
        url : "/api/admin/node/summary/hardware/" + apiUrl + "/",
        order : "value"
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
