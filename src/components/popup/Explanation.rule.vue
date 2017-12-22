<template>
  <section data-window>
    <h1>
      진단 룰 정보
    </h1>
    <div v-if="checkData" data-none>
      표시할 정보 내용이 없습니다.
    </div>
    <div v-else data-popup-content>
      <div data-table="table">
        <table>
          <tbody>
          <tr data-row>
            <th>진단명</th>
            <td>{{responseRules.name || "-"}} [{{responseRules.name_ko}}]</td>
          </tr>
          <tr data-row>
            <th>설명</th>
            <td>{{responseRules.description || "-"}}</td>
          </tr>
          <tr>
            <th>진단기준</th>
            <td>{{responseRules.reason || "-"}}</td>
          </tr>
          <tr>
            <th>오진</th>
            <td>{{responseRules.false_positives || "-"}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>

  export default {
    name: "Datetime",
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        ruleID : "",
        responseRules:[]
      };
    },
    computed: {
    },
    components: {},
    watch: {
      ruleID(s) {
        if (s) {
          //console.log("alive");
          this.getRules();
        }
      },
      responseRules(r){
        if(r){
          console.log(r);
          return r
        }
      }
    },
    methods: {
      getRules(){
        const url = "/api/admin/info/rsc/rules/" + this.ruleID;
        this.$http.get(url).then(response => {
          //console.log(response);
          this.responseRules = response.data;
        })
      }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
      if (this.$route.query) {
        //console.log(this.$route.query);
        this.ruleID = this.$route.query.id;
      }
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
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-window] {
    > div {
      height: 350px;
    }
  }
</style>
