<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      관리자 설정
    </h1>
    <div data-table="table">
      <span data-table="total">전체 : {{adminList.length}}명</span>
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th v-for="(th,k) in dataFields" :key="k" :class="'col-'+k">{{th}}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody">
        <table>
          <tbody>
          <tr data-tbody="row" v-for="row in adminList" :key="row.id" @dblclick="modify(row)">
            <td v-for="(td,k) in dataFields" :key="k" :class="'col-'+k">{{row[k]}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div data-tooltip-wrap="setup">
      <button data-icon type="text" @click="setAdmin">
        <i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
        <span data-tooltip="setup">관리자 추가</span>
      </button>
    </div>
    <templatemodal v-if="modal" :target="false" :compSelect="'systemadminadd'" :title="title"></templatemodal>
  </article>
</template>
<script>
  import Constant from "@/constant";
  import { mapGetters } from "vuex";
import Templatemodal from "../template/Template.modal";

export default {
  name: "Systemadmin",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      showModal: false,
      receiveData : [],
      title : "",
      //adminList : [],
      dataFields : {
        id : "아이디",
        name : "이름",
        host : "Host",
        description : "설명",
        last_login_time : "마지막 접속시각"
      }
    };
  },
  computed: {
    ...mapGetters({
      adminList : "setupAdmin",
      modal : "setupModal"
    })
  },
  components: {
    "templatemodal":Templatemodal
  },
  watch: {
    adminList(a){
      if(a){
        return a;
      }
    }
  },
  methods: {
    getList(){
      this.$store.dispatch(Constant.SETUP_ADMIN);
    },
    setAdmin(){
      this.title = "관리자 등록";
      this.$store.commit(Constant.SETUP_MODAL, true);
    },
    modify(row){
      this.title = "관리자 수정";
      this.$store.commit(Constant.SETUP_MODAL, true);
      this.$store.commit(Constant.SETUP_FORMTYPE, false);
      this.$store.commit(Constant.PICK_ADMIN, row.id);
    }
  },
  beforeCreate() {},
  created() {
    this.getList();
  },
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  actvated() {},
  deactivated() {},
  beforeDestroy() {
  },
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";
[data-icon] {
  width: 24px;
  height: 24px;
}
  [data-table="table"]{
    margin-top:40px;
  }
  [data-tbody="tbody"]{
    height:100vh;
    max-height:700px;
    border-bottom:1px solid color(border)
  }
  .col-id{
    width:150px;
  }
  .col-name{
    width:200px;
  }
  .col-host{
    width:400px;
  }
  .col-last_login_time{
    width:170px;
  }
</style>
