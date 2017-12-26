<template>
  <div data-table="table">
    <div data-thead="thead">
      <table>
        <thead>
        <tr>
          <th v-for="(th, k) in fields" :key="k" :class="'col-'+k">{{th}}</th>
        </tr>
        </thead>
      </table>
    </div>
    <div data-tbody="tbody">
      <table>
        <tbody>
        <tr v-if="stateReorder">
          <td data-none-data>검색된 데이터가 없습니다.</td>
        </tr>
        <tr v-else data-tbody="row" v-for="row in propData" @click="sendData(row)">
          <td v-for="(td, k) in fields" :key="td.id" :class="'col-'+k">
            {{row[k]}}
            <span v-if="k === 'PathInfo1' && row.PathInfo2 !== ''">({{row.PathInfo2}})</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <spinner v-if="getLoad"></spinner>
  </div>
</template>
<script>
  import Constant from "@/constant";
  import Spinner from "@/components/template/Spinner";
  export default {
    name: "InsertDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      fields: {
        type: Object,
        default() {
          return { message: "wait receive data" };
        }
      },
      propData: {
        type: Object | Array,
        default() {
          return { message: "wait receive data" };
        }
      }
    },
    data() {
      return {
        fieldKeys: [],
        rowData: [],
        rowCheck: false
      };
    },
    computed: {
      stateReorder(){
        return !this.propData.length;
      }
    },
    components: {
      "spinner":Spinner
    },
    watch: {
      propData(data) {
        if (data) {
          return data;
        }
      }
    },
    methods: {
      sendData(row) {
        console.log(row)
        this.$store.dispatch(Constant.GLOBAL_RANGEUSER, {
          nodeid: row.nodeid,
          username: row.username,
          dept : {
            name : row.userdept
          }
        });
        this.$router.push({path: "Search-process", query: row});
      }
    },
    beforeCreate() {},
    created() {},
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {
    },
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
