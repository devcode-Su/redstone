<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      파일 검색
    </h1>
    <file-searchform></file-searchform>
    <searchfiledatatable :propData="search"></searchfiledatatable>
  </article>
</template>
<script>
import FileSearchform from "../form/File.search.form";
import Searchfiledatatable from "./Search.file.datatable.vue";

function _plunk(item){
  if (item.hasOwnProperty('info') && Array.isArray(item.info)) {
    item.info = item.info.reduce((p, c) => {
      p[c.name] = c.value;
      return p;
    }, {});
  }
  else {
    for (let k in item) {
      if (item.hasOwnProperty(k)) {
        if (typeof item[k] === 'object') {
          _plunk(item[k]);
        }
      }
    }
  }
  return item;
}
function plunk(options){
  options = options.map(_plunk);
  return options;
}
export default {
  name: "Searchfile",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        datetime: true,
        text: true,
        placeholder: "text input...",
        agreement: true
      },
      search: {
        field: [
          "",
          "센서 ID",
          "사용자명",
          "부서명",
          "PC 명",
          "IP",
          "파일명",
          "해시값",
          "경로명",
          "검출시간"
        ],
        data: [],
        search: [],
        url: "",
        rowKey:[
          "nodeid", "node.info.username"
        ]
      }
    };
  },
  computed: {},
  components: {
    FileSearchform,
    Searchfiledatatable
  },
  watch: {},
  methods: {
    receiveData(form) {
      const url = "/api/admin/search/file";
        const data = {
          page: 1,
          length: 50,
          startDate: form.startTime ? form.startTime.getTime() : "",
          endDate: form.endTime ? form.endTime.getTime() : "",
          dept_code: form.dept_code ,
          node_id: form.node_id,
          order: "time",
          direction: 1
        };
        this.$http.get(url, {
          params : data
        }).then(result => {
          console.log(result.data.data);
          this.search.data = plunk(result.data.data)
        });
        this.search.search = data;
        this.search.url = url;
      }

  },
  beforeCreate() {},
  created() {

  },
  beforeMounted() {},
  mounted() {},
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
