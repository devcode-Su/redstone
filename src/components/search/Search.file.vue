<template>
  <article>
    <h1 class="page-title">
      파일 검색
    </h1>
    <template-searchpannel :pannelType="pannelset"></template-searchpannel>
    <el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%">
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
      <el-table-column prop="nodeid" label="Date">
      </el-table-column>
    </el-table>
  </article>
</template>
<script>
import TemplateSearchpannel from "../template/Template.searchpannel";
// function _plunk(item) {
//    if (item.hasOwnProperty('info') && Array.isArray(item.info)) {
//      item.info = item.info.reduce((p, c) => {
//        p[c.name] = c.value();
//        return p;
//      }, {});
//    }
//    else {
//      for ( let k in item ) {
//        if ( item.hasOwnProperty(k) ) {
//          if ( typeof item[k] === 'object' ) {
//            _plunk(item[k]);
//          }
//        }
//      }
//    }
//    return item;
//  }
//  function plunk(data) {
//    data = data.map(_plunk);
//    return data;
//  }

export default {
  name: "Searchfile",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      pannelset: {
        dateset: true,
        text : true,
        placeholder:"text input...",
        agreement:true
      },
      paging: {
        total: 2,
        per_page: "50",
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        from: 1,
        to: 2
      },
      tableData: [
        {
          nodeid: 1,
          FilePath: "C:\\Windows\\system32\\DllHost.exe",
          FileAttributes: "A",
          CreateDate: "2009-07-14 08:59:17",
          ModifiedDate: "2009-07-14 10:39:06",
          FileSize: 9728,
          Sha256Hash:
            "61b8955ce0a2aa9d0719920b30216717b349b6fbe11c697c31cfa84f859cc1ae",
          Md5Hash: "a8edb86fc2a4d6d1285e4c70384ac35a",
          SimpleHash: "",
          Status: "exist",
          IsSystem: 1,
          IsDetected: 0,
          FileName: "DllHost.exe",
          DriveType: "FIXED",
          InsertTime: "2017-11-02 13:44:47",
          FirstCreatorProcessInfo: "",
          FirstCreatorProcessGuid: "",
          InflowSeq: "",
          connected: 1,
          node: {
            nodeid: 1,
            dept_code: 2,
            dept: {
              dept_code: 2,
              name: "WORKGROUP"
            },
            info: [
              {
                nodeid: 1,
                name: "computer",
                value: "MP"
              },
              {
                nodeid: 1,
                name: "ip",
                value: "192.168.101.155"
              },
              {
                nodeid: 1,
                name: "username",
                value: "MP"
              }
            ]
          }
        },
        {
          nodeid: 1,
          FilePath: "C:\\Users\\bbung224\\Downloads\\makeimgohdr.exe",
          FileAttributes: "A",
          CreateDate: "2017-11-02 13:44:15",
          ModifiedDate: "2017-11-01 21:03:08",
          FileSize: 2108928,
          Sha256Hash:
            "0285e15c57d1ba89d589b75c36ea15d0b97eb16d95433672642125551d8c1ef9",
          Md5Hash: "e6cdc6457db80c15e1e7142ed423c7bf",
          SimpleHash:
            "ca1bbc4b2ba5db41a11a96f4f1657f96a593385c04889e6515d5a359279c16e6",
          Status: "exist",
          IsSystem: 0,
          IsDetected: 0,
          FileName: "makeimgohdr.exe",
          DriveType: "FIXED",
          InsertTime: "2017-11-02 13:44:21",
          FirstCreatorProcessInfo: "",
          FirstCreatorProcessGuid: "",
          InflowSeq: "",
          connected: 1,
          node: {
            nodeid: 1,
            dept_code: 2,
            dept: {
              dept_code: 2,
              name: "WORKGROUP"
            },
            info: [
              {
                nodeid: 1,
                name: "computer",
                value: "MP"
              },
              {
                nodeid: 1,
                name: "ip",
                value: "192.168.101.155"
              },
              {
                nodeid: 1,
                name: "username",
                value: "MP"
              }
            ]
          }
        }
      ]
      //tableData: []
    };
  },
  computed: {},
  components: {
    TemplateSearchpannel
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {
    //    const apiURL = "/api/admin/systemInfo";
    //    this.$http
    //      .get(apiURL)
    //      .then(result => {
    //        //console.log(result.data);
    //        //console.log(this)
    //        plunk(result.data.data)
    //      }).catch(() => {
    //        console.log("nothing")
    //    })
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
