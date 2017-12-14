<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      센서 정보
    </h1>
    <proserty-sensorform @form="receive"></proserty-sensorform>
    <sensor-datatable :form-data="formData" :local-data="local" @modal="showModal = true"></sensor-datatable>
    <property-modal v-if="showModal" @close="showModal = false"></property-modal>
  </article>
</template>
<script>
  import ProsertySensorform from "../form/Property.sensor.form";
  import SensorDatatable from "./Property.sensor.datatable";
  import PropertyModal from "./Property.modal";
export default {
  name: "Propertysensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal : false,
      formData:{},
      local:{
        name:"",
        fields:{
          nodeid : "센서 ID",
          username : "사용자명",
          userdept : "부서명",
          userpc : "PC 명",
          userip : "IP",
          version : "버전",
          connected_time : "마지막 접속 시간"
        },
        orderOptions : {
          version : "버전",
          connected_time : "마지막 접속 시간"
        }
      }
    };
  },
  computed: {},
  components: {
    "proserty-sensorform":ProsertySensorform,
    "sensor-datatable" :SensorDatatable,
    "property-modal":PropertyModal
  },
  watch: {},
  methods: {
    receive(form){
      console.log(form);
      return this.formData = {
        url : "/api/admin/info/version",
        form : form,
        order : "connected_time"
      }
    },
    modalAction(b){
      console.log("modal?")
      console.log(b);
      this.showModal = b
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
</style>
